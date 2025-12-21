import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_GMAIL,
    pass: process.env.MY_PASSWORD,
  },
});

export default async function sendEmail(
  to: string,
  subject: string,
  text: string
) {
  await transporter.sendMail({
    from: `"Snack Dash" <${process.env.MY_GMAIL}>`,
    to,
    subject,
    text,
  });
}
