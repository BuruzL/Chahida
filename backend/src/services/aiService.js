import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function askCampusAI(question, context) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are Campus Genie AI.

Campus Data:
${context}

Answer only from this data.

Student: ${question}
`;

    const result = await model.generateContent(prompt);
    const text = result?.response?.text();

    if (!text) throw new Error("No Gemini text");

    return text;
  } catch (err) {
    console.error("Gemini failed:", err.message);
    return "🤖 I'm warming up my brain! Please try again in a moment.";
  }
}
