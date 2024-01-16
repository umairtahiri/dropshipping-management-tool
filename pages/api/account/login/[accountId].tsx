import { STRIPE_SECRET_KEY } from "@/lib/const";

const stripe = require("stripe")(STRIPE_SECRET_KEY);

export default async function createLoginLinkFromStripe(req, res) {
  try {
    const accountId = req?.query?.accountId;
    const response = await stripe.accounts.createLoginLink(accountId);
    res.status(200).json(response);
  } catch (e: any) {
    res.status(400).json(e?.raw);
  }
}
