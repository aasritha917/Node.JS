const cron = require("node-cron");
const Redis = require("ioredis");
const PDFKit = require("pdfkit");
const nodemailer = require("nodemailer");
const User = require("../models/user");
const redis = new Redis();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

cron.schedule("*/5 * * * *", async () => {
  const stream = redis.scanStream({ match: "bulk:status:*" });
  for await (const keys of stream) {
    for (const key of keys) {
      const s = await redis.hgetall(key);
      const user = await User.findById(s.userId);
      const doc = new PDFKit();
      const buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", async () => {
        const mail = {
          to: user.email,
          subject: "Bulk Insert Report",
          text: "See attached",
          attachments: [{ filename: "report.pdf", content: Buffer.concat(buffers) }]
        };
        await transporter.sendMail(mail);
        await redis.del(key);
      });
      doc.text(`UserId: ${s.userId}`);
      doc.text(`Count: ${s.count}`);
      doc.text(`Time: ${s.processedAt}`);
      doc.end();
    }
  }
});
