const cron = require("node-cron");
const Redis = require("ioredis");
const Book = require("../models/book");
const redis = new Redis();

cron.schedule("*/2 * * * *", async () => {
  const stream = redis.scanStream({ match: "bulk:*" });
  for await (const keys of stream) {
    for (const key of keys) {
      const userId = key.split(":")[1];
      const arr = JSON.parse(await redis.lpop(key));
      const res = await Book.insertMany(arr.map(b => ({...b, userId})));
      await redis.hmset(`bulk:status:${userId}`, {
        userId, count: res.length, processedAt: new Date().toISOString()
      });
    }
  }
});
