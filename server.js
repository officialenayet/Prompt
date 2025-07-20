const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.static('public'));

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

app.get('/generate', async (req, res) => {
  const gender = req.query.gender || 'boy';
  const count = parseInt(req.query.count) || 20;
  const prompt = `
তুমি একজন নাম বিশেষজ্ঞ। আমাকে ${count}টি ${gender === 'boy' ? 'ছেলে' : 'মেয়ে'} শিশুর নাম দাও,
যার প্রতিটি ইসলামিক বা আধুনিক হতে পারে এবং অর্থসহ হবে।

ফরম্যাট:
নাম: আফান - অর্থ: সৎ, নির্ভীক ও চিন্তাশীল ব্যক্তি
`;
  try {
    const { data } = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });
    res.json({ result: data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "API call failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
