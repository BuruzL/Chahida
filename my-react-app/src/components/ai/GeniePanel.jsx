import { X, Send, Bot } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./genie.css";

export default function GeniePanel({ onClose }) {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([
    { role:"assistant", text:"✨ Hi! I’m your Campus Genie 🧞 What can I magically find for you?" }
  ]);
  const endRef = useRef(null);

  useEffect(()=> endRef.current?.scrollIntoView({behavior:"smooth"}),[chat]);

  const send = () => {
    if(!msg.trim()) return;
    setChat(c=>[...c,{role:"user",text:msg},{role:"assistant",text:"✨ Genie thinking..."}]);
    setMsg("");
  };

  return (
    <div className="genie-root fixed bottom-24 right-5 w-[380px] h-[520px] z-[9999] genie-panel overflow-hidden">

      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4
                      flex justify-between items-center text-white font-bold">
        <span className="flex items-center gap-2"><Bot size={18}/> Campus Genie</span>
        <button onClick={onClose}><X/></button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chat.map((m,i)=>(
          <div key={i} className={m.role==="user"?"text-right":""}>
            <span className={`inline-block px-3 py-2 max-w-[80%]
              ${m.role==="user" ? "genie-bubble-user" : "genie-bubble-ai"}`}>
              {m.text}
            </span>
          </div>
        ))}
        <div ref={endRef}/>
      </div>

      <div className="p-4 flex gap-2">
        <input
          value={msg}
          onChange={e=>setMsg(e.target.value)}
          placeholder="Ask Genie..."
          className="flex-1 genie-input px-4 py-2"
        />
        <button onClick={send} className="genie-send text-white p-3 rounded-full">
          <Send size={16}/>
        </button>
      </div>
    </div>
  );
}
