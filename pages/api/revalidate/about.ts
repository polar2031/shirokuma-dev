export default async function handler(req: any, res: any) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    console.warn("Invalid revalidation token");
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    console.info(`Revalidate /about`);
    await res.unstable_revalidate(`/about`);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
