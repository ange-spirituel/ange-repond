import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1Ra68CDzL6H0ml8PhdxeRvkd",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://ange-repond-ze62.vercel.app/success",
      cancel_url: "https://ange-repond-ze62.vercel.app/cancel",
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
