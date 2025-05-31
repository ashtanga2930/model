const express = require("express");
const path = require("path");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

app.post("/ask-ai", async (req, res) => {
  const { question } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: question },
      ],
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
