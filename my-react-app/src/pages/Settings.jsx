import React, { useState } from "react";
import { resetDB } from "../lib/db";

export default function Settings(){
  const [done, setDone] = useState(false);

  const wipe = () => {
    if(confirm("Reset all mock data and your created posts?")){
      resetDB();
      localStorage.removeItem("campus_session");
      setDone(true);
    }
  };

  return (
    <div className="card" style={{ padding: 16, maxWidth: 760 }}>
      <div style={{ fontWeight: 900, fontSize: 18 }}>Settings</div>
      <div className="muted small" style={{ marginTop: 6 }}>
      </div>
      <div className="hr" />

      <div className="soft" style={{ padding: 12 }}>
        <div style={{ fontWeight: 900 }}>Reset demo database</div>
        <div className="muted small" style={{ marginTop: 6 }}>
          Clears localStorage and re-seeds 200+ posts + 90 users.
        </div>
        <div className="hstack" style={{ justifyContent:"flex-end", marginTop: 10 }}>
          <button className="btn btnDanger" style={{ fontWeight: 900 }} onClick={wipe}>Reset mock DB</button>
        </div>
      </div>

      {done && (
        <div className="soft" style={{ padding: 12, marginTop: 12 }}>
          ✅ Reset complete. Refresh the page.
        </div>
      )}
    </div>
  );
}