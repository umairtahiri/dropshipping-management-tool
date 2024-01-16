import { STRIPE_SECRET_KEY } from "@/lib/const";

const stripe = require("stripe")(STRIPE_SECRET_KEY);

export default async function createOnboardingLinkFromStripe(req, res) {
  try {
    const accountId = req?.query?.accountId;
    const { refreshUrl, returnUrl, type } = req?.body;
    const response = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type,
    });
    res.status(200).json(response);
  } catch (e: any) {
    res.status(400).json(e?.raw);
  }
}
