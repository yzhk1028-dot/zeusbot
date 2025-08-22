const fs = require("fs");
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function summarizeLog() {
  const logData = fs.readFileSync("log.txt", "utf-8");

  const prompt = `
以下はLINE Botの1日分の会話ログです。
このログから、やりとりの概要・感情の変化・重要なポイントを要約してください。
具体的で丁寧な言葉でお願いします。

【ログ】
${logData}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const summary = response.choices[0].message.content;
  console.log("📋 GPTの要約結果：\n", summary);
  return summary;
}

// 👇 これが超重要！呼び出せるようにするための一文
module.exports = summarizeLog;
