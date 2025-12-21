"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axiosInstance";
import Image from "next/image";

interface Product {
  _id?: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  async function fetchProducts() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dish`);
    setProducts(res.data.products);
    console.log(res.data.products);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleSubmit() {
    if (editingId) {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/dish/${editingId}`,
        form
      );
    } else {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dish`, form);
    }
    setForm({ name: "", price: "", description: "", image: "" });
    setEditingId(null);
    setShowModal(false);
    fetchProducts();
  }

  async function handleDelete(id: string) {
    if (confirm("Delete this product?")) {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/dish/${id}`);
      fetchProducts();
    }
  }

  function handleEdit(product: Product) {
    setForm(product);
    setEditingId(product._id!);
    setShowModal(true);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-3">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                </td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.description}</td>
                <td className="p-3">₹{p.price}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id!)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>

            <input
              placeholder="Product Name"
              className="w-full border p-2 rounded mb-3"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Category"
              className="w-full border p-2 rounded mb-3"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              placeholder="Price"
              type="number"
              className="w-full border p-2 rounded mb-3"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <input
              placeholder="Image URL"
              className="w-full border p-2 rounded mb-4"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
