export const askGenie = async (context, question) => {
    const systemPrompt = `
  You are Campus Genie, the AI assistant for Chahida University.
  
  LIVE DATABASE:
  ${JSON.stringify(context)}
  
  RULES:
  • Only use this data
  • If not found, say no listings available
  • Be friendly and emoji based
  `;
  
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: systemPrompt + "\nQuestion: " + question }]}]
        })
      }
    );
  
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Genie is thinking...";
  };
  