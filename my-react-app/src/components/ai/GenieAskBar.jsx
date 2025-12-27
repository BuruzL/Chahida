import { Send } from "lucide-react";

export default function GenieAskBar({ onSend }) {
  return (
    <div className="genie-askbar">
      <input placeholder="Ask Campus Genie..." />
      <button className="text-purple-700">
        <Send size={16}/>
      </button>
    </div>
  );
}
