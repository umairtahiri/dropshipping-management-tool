export default async function healthCheck(_, res) {
  try {
    res.status(200).json({ status: "ok" });
  } catch (e: any) {
    res.status(400).json(e?.raw);
  }
}
