import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import "./supportChatbot.css";

export default function SupportChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role:"bot", text:"👋 Hi! I’m Campus Genie. Ask me about lost items, marketplace, buddies, or blood donation." }
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(()=> endRef.current?.scrollIntoView({behavior:"smooth"}),[messages]);

  const send = async () => {
    if(!input.trim()) return;
  
    setMessages(m=>[...m,{role:"user",text:input}]);
    const question = input;
    setInput("");
  
    try {
      const res = await fetch("http://localhost:7002/api/ai/ask",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ question })
      });
  
      const data = await res.json();
  
      setMessages(m=>[
        ...m,
        { role:"bot", text: data.reply || "🤖 I’m getting smarter! Try again shortly." }
      ]);
  
    } catch {
      Messages(m=>[
        ...m,
        { role:"bot", text:"👋 Hi! I’m Campus Genie" }
      ]);
    }
  };
  

  return (
    <>
      {open && (
        <div className="support-panel">
          <div className="support-header">
            <span>💬 Campus Genie</span>
            <X onClick={()=>setOpen(false)} />
          </div>

          <div className="support-body">
            {messages.map((m,i)=>(
              <div key={i} className={`bubble ${m.role}`}>
                {m.text}
              </div>
            ))}
            <div ref={endRef}/>
          </div>

          <div className="support-input">
            <input
              value={input}
              onChange={e=>setInput(e.target.value)}
              placeholder="Message..."
              onKeyDown={e=>e.key==="Enter" && send()}
            />
            <Send onClick={send}/>
          </div>
        </div>
      )}

      <button className="support-float" onClick={()=>setOpen(!open)}>
        <MessageCircle/>
      </button>
    </>
  );
}
