router.post("/bulk", auth, async (req, res) => {
  const key = `bulk:${req.user.uid}`;
  await redis.rpush(key, JSON.stringify(req.body.books));
  res.json({msg:"Bulk queued, to be processed"});
});
