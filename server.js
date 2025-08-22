const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const event = req.body.events?.[0];
  if (event && event.type === "message") {
    const logLine = `${new Date().toISOString()} | ${event.source.userId} | ${event.message.text}\n`;
    fs.appendFileSync("log.txt", logLine);
  }
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Zeusbot is alive!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
