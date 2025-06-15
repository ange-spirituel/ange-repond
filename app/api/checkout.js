// pages/api/checkout.js

export default async function handler(req, res) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: 'https://ange-repond-ze62.vercel.app/success',
    cancel_url: 'https://ange-repond-ze62.vercel.app/',
  });

  res.status(200).json({ id: session.id });
}
