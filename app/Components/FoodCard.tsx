import { Food } from '@/interfaces/interface'
import React from 'react'

interface Props{
    food : Food
}

export default function FoodCard({food}:Props) {
  return (
    <div className={`bg-${food.bg}`}>
      <div>

      </div>
      <div>
        <p>{food.title}</p>
        <button>Order Now &rarr;</button>
      </div>
    </div>
  )
}
