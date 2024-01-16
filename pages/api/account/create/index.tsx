import { STRIPE_SECRET_KEY } from "@/lib/const";

const stripe = require("stripe")(STRIPE_SECRET_KEY);

export default async function createStripeAccount(req, res) {
  try {
    const response = await stripe.accounts.create({ type: "express" });
    res.status(200).json(response);
  } catch (e: any) {
    res.status(400).json(e?.raw);
  }
}
