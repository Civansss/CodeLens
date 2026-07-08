const ai = require("../ai/gemini");
const Chat = require("../models/Chat");
const Conversation = require("../models/Conversation");

const summarizeNote = async (req, res) => {
  try {
    const { content } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an expert programming mentor.

Summarize these programming notes.

Rules:
- Use Markdown.
- Start with a heading.
- Use 4-6 bullet points.
- Highlight important terms in **bold**.
- If code is mentioned, explain it briefly.
- Keep it concise and useful for revision.

Notes:

${content}
`,
    });

    res.json({
      success: true,
      summary: response.text,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const explainCode = async (req, res) => {
  try {
    const { code } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are a senior DSA instructor.

Explain the following code using Markdown.

Structure your answer like this:

# Overview
Explain what the code does.

# Logic
Explain step by step.

# Time Complexity
Mention and explain the time complexity.

# Space Complexity
Mention and explain the space complexity.

# Key Takeaways
- Point 1
- Point 2
- Point 3

Code:

${code}
`,
    });

    res.json({
      success: true,
      explanation: response.text,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const improveNote = async (req, res) => {
  try {
    const { content } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an expert programming mentor.

Improve these programming notes.

Requirements:
- Correct grammar.
- Keep technical accuracy.
- Make them easy to revise.
- Use Markdown.
- Use headings and bullet points where appropriate.
- Highlight important keywords in **bold**.

Notes:

${content}
`,
    });

    res.json({
      success: true,
      improved: response.text,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const chatAI = async (req, res) => {
  try {
    const { question } = req.body;
    await Chat.create({
  user: req.user.id,
  role: "user",
  text: question,
});

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are a senior software engineer and programming mentor.

Answer the user's question using Markdown.

Rules:
- Use headings.
- Use bullet points whenever possible.
- Use Markdown.
- Whenever you write code, always wrap it in fenced Markdown code blocks and specify the language.

Question:

${question}
`,
    });
    await Chat.create({
  user: req.user.id,
  role: "assistant",
  text: response.text,
});

    res.json({
      success: true,
      answer: response.text,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({
      user: req.user.id,
    }).sort({ createdAt: 1 });

    res.json({
      success: true,
      chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  summarizeNote,
  explainCode,
  improveNote,
  chatAI,
  getChatHistory,
};