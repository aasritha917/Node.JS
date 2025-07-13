const cron = require("node-cron");
cron.schedule("*/2 * * * *", async () => {
  const stream = redis.scanStream({match:"bulk:*"});
  for await (const keys of stream) {
    for (const key of keys) {
      const uid = key.split(":")[1];
      const arr = await redis.lrange(key, 0, -1);
      const books = arr.flatMap(json => JSON.parse(json));
      await Book.insertMany(books.map(b => ({...b, user:uid})));
      await redis.del(key);
    }
  }
});
