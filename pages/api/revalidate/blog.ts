export default async function handler(req: any, res: any) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    console.warn("Invalid revalidation token");
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    console.log(`/blog/${req.query.canonical}`);
    await res.unstable_revalidate(`/blog/${req.query.canonical}`);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
