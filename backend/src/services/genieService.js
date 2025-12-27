import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const askGenie = async (question, context) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: "You are Campus Genie AI for Chahida University." },
      { role: "user", content: `Campus Database:\n${JSON.stringify(context)}\n\nQuestion: ${question}` }
    ]
  });
  return completion.choices[0].message.content;
};
