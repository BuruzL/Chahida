import { useState } from "react";
import GenieTab from "./GenieTab";
import GeniePanel from "./GeniePanel";

export default function CampusGenie() {
  const [open,setOpen] = useState(false);
  return (
    <>
      <GenieTab onClick={()=>setOpen(true)} />
      {open && <GeniePanel onClose={()=>setOpen(false)} />}
    </>
  );
}
