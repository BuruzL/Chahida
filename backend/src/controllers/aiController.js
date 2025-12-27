import LostFound from "../models/LostFound.js";
import Post from "../models/Post.js";
import { askCampusAI } from "../services/aiService.js";

export const askAIController = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "Question is required" });

    // gather recent items from existing models
    const lost = await LostFound.find().sort({ createdAt: -1 }).limit(10).lean();
    const posts = await Post.find().sort({ createdAt: -1 }).limit(10).lean();

    // Create a concise context string to avoid extremely large prompts
    const summarize = (arr) => arr.map((it) => ({ id: it._id, title: it.title || it.type || '', description: it.description || it.price || '' }));

    const context = `
Lost & Found: ${JSON.stringify(summarize(lost))}
Marketplace Posts: ${JSON.stringify(summarize(posts))}
`;

    const reply = await askCampusAI(question, context);
    res.json({ reply });
  } catch (err) {
    console.error('askAIController error:', err);
    res.status(500).json({ error: 'AI request failed' });
  }
};