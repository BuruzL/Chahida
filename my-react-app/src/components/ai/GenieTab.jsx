import { Sparkles } from "lucide-react";
import "./genie.css";

export default function GenieTab({ onClick }) {
  return (
 
    <button
    onClick={onClick}
    className="genie-root fixed bottom-5 right-5 z-[9999] genie-tab
  
                 flex items-center gap-2 px-6 py-3
                 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                 text-white"
    >
      <Sparkles size={18}/>
      Campus Genie
    </button>
  );
}
