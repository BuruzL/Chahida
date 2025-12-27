const sessionId = Date.now().toString();

export async function askGenie(message) {
  const res = await fetch("http://localhost:7002/api/ai/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId })
  });
  return (await res.json()).reply;
}
