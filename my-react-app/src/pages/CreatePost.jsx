import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPost, getDB } from "../lib/db";
import { META } from "../data/seed";
import { useAuth } from "../context/AuthContext";

const STATUS = ["Open","In progress","Resolved"];
const URGENCY = ["Low","Medium","High"];
//Can y See??
export default function CreatePost(){
  const nav = useNavigate();
  const { user, isAuthed } = useAuth();
  const db = useMemo(() => getDB(), []);
  const halls = META.HALLS;

  const [tag, setTag] = useState("Emergency Blood");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [hall, setHall] = useState(user?.hall || halls[0]);
  const [spot, setSpot] = useState("Canteen");
  const [room, setRoom] = useState("");
  const [status, setStatus] = useState("Open");
  const [urgency, setUrgency] = useState("High");

  // meta
  const [bloodNeed, setBloodNeed] = useState("B+");
  const [courseCode, setCourseCode] = useState("CSE110");
  const [itemName, setItemName] = useState("Wallet");
  const [medicineName, setMedicineName] = useState("Napa 500mg");
  const [price, setPrice] = useState(1200);

  const author = user || db.users[0];

  const buildMeta = () => {
    if(tag==="Emergency Blood") return { bloodGroupNeeded: bloodNeed, units: 2, hospital: "Campus Medical Center", contactPreference: "In-app chat" };
    if(tag==="Academic") return { courseCode, type: "Need notes", deadline: Date.now() + 1000*60*60*24*3 };
    if(tag==="Lost & Found") return { type: "Lost", itemName, proofHint: "Describe one unique detail to claim." };
    if(tag==="Medicine") return { medicineName, quantity: "1 strip", note:"No medical advice—help sourcing only." };
    if(tag==="Buy & Sell") return { type: "Selling", itemName, price: Number(price), negotiable: true };
    if(tag==="Appliance") return { type: "Need to borrow", itemName, duration: "Tonight", deposit:"Negotiable" };
    if(tag==="Find a Buddy") return { type: "Study buddy", interests:["DSA","Web dev"], comfort:"Chat first" };
    return {};
  };

  const submit = () => {
    if(!title.trim() || !body.trim()){
      alert("Please fill Title and Description.");
      return;
    }
    const post = addPost({
      tag,
      title: title.trim(),
      body: body.trim(),
      status,
      urgency,
      authorId: author.id,
      authorName: author.name,
      location: { hall, spot, room: room.trim() },
      meta: buildMeta(),
    });
    nav(`/post/${post.id}`);
  };

  return (
    <div className="grid">
      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontWeight: 900, fontSize: 18, letterSpacing:"-0.02em" }}>Create a post</div>
        <div className="muted small" style={{ marginTop: 6 }}>
          Need something urgently? Create a post and let your campus community help out.
        </div>

        {!isAuthed && (
          <div className="soft" style={{ padding: 12, marginTop: 10 }}>
            You’re not logged in. Post will use a mock author.
          </div>
        )}

        <div className="hr" />

        <div className="vstack">
          <label className="small muted">Category</label>
          <select className="input" value={tag} onChange={(e)=>setTag(e.target.value)}>
            {META.TAGS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <label className="small muted">Title</label>
          <input className="input" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Write a clear title…" />

          <label className="small muted">Description</label>
          <textarea className="input" rows={5} value={body} onChange={(e)=>setBody(e.target.value)} placeholder="Add context, deadline, location, what you need…" />

          <div className="hstack" style={{ gap: 12, flexWrap:"wrap" }}>
            <div style={{ flex:1, minWidth: 220 }}>
              <label className="small muted">Hall</label>
              <select className="input" value={hall} onChange={(e)=>setHall(e.target.value)}>
                {halls.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div style={{ flex:1, minWidth: 220 }}>
              <label className="small muted">Spot</label>
              <input className="input" value={spot} onChange={(e)=>setSpot(e.target.value)} placeholder="Canteen / Library / Gate…" />
            </div>
            <div style={{ width: 160 }}>
              <label className="small muted">Room (optional)</label>
              <input className="input" value={room} onChange={(e)=>setRoom(e.target.value)} placeholder="e.g. 312" />
            </div>
          </div>

          <div className="hstack" style={{ gap: 12, flexWrap:"wrap" }}>
            <div style={{ flex:1, minWidth: 200 }}>
              <label className="small muted">Status</label>
              <select className="input" value={status} onChange={(e)=>setStatus(e.target.value)}>
                {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ flex:1, minWidth: 200 }}>
              <label className="small muted">Urgency</label>
              <select className="input" value={urgency} onChange={(e)=>setUrgency(e.target.value)}>
                {URGENCY.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <div className="soft" style={{ padding: 12 }}>
            <div style={{ fontWeight: 900 }}>Category-specific fields</div>
            <div className="muted small" style={{ marginTop: 4 }}>
              (structured data for different post types).
            </div>

            <div className="hr" />

            {tag==="Emergency Blood" && (
              <div className="hstack" style={{ gap: 12, flexWrap:"wrap" }}>
                <div style={{ width: 220 }}>
                  <label className="small muted">Blood group needed</label>
                  <input className="input" value={bloodNeed} onChange={(e)=>setBloodNeed(e.target.value)} placeholder="e.g. B+" />
                </div>
                <div className="muted small" style={{ alignSelf:"flex-end" }}>
                  Tip: search supports “B+”, “O-”, etc.
                </div>
              </div>
            )}

            {tag==="Academic" && (
              <div className="hstack" style={{ gap: 12, flexWrap:"wrap" }}>
                <div style={{ width: 220 }}>
                  <label className="small muted">Course code</label>
                  <input className="input" value={courseCode} onChange={(e)=>setCourseCode(e.target.value)} placeholder="e.g. CSE110" />
                </div>
              </div>
            )}

            {(tag==="Lost & Found" || tag==="Appliance" || tag==="Buy & Sell") && (
              <div className="hstack" style={{ gap: 12, flexWrap:"wrap" }}>
                <div style={{ width: 240 }}>
                  <label className="small muted">Item name</label>
                  <input className="input" value={itemName} onChange={(e)=>setItemName(e.target.value)} placeholder="e.g. Wallet / Iron / Monitor" />
                </div>
                {tag==="Buy & Sell" && (
                  <div style={{ width: 180 }}>
                    <label className="small muted">Price</label>
                    <input className="input" type="number" value={price} onChange={(e)=>setPrice(e.target.value)} />
                  </div>
                )}
              </div>
            )}

            {tag==="Medicine" && (
              <div className="hstack" style={{ gap: 12, flexWrap:"wrap" }}>
                <div style={{ width: 260 }}>
                  <label className="small muted">Medicine name</label>
                  <input className="input" value={medicineName} onChange={(e)=>setMedicineName(e.target.value)} placeholder="e.g. Napa 500mg" />
                </div>
              </div>
            )}
          </div>

          <div className="hstack" style={{ justifyContent:"flex-end" }}>
            <button className="btn" onClick={()=>nav(-1)} style={{ fontWeight: 900 }}>Cancel</button>
            <button className="btn btnPrimary" onClick={submit} style={{ fontWeight: 900 }}>Publish</button>
          </div>
        </div>
      </div>

      <div className="vstack">
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}><b>Tips:</b></div>
          <div className="hr" />
          <div className="vstack">
            <div className="soft" style={{ padding: 12 }}>
              <b>Search examples:</b>
              <div className="muted small" style={{ marginTop: 6 }}>Try: “B+”, “CSE110”, “wallet”, “Nazrul”, “iron”, “selling”, “tutor”</div>
            </div>
            <div className="soft" style={{ padding: 12 }}>
              <b>Workflow:</b>
              <div className="muted small" style={{ marginTop: 6 }}>Open → In progress → Resolved (in Post Details)</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>Quick links</div>
          <div className="hr" />
          <div className="vstack">
            <button className="btn" style={{ fontWeight: 900 }} onClick={()=>nav("/")}>Back to feed</button>
            <button className="btn" style={{ fontWeight: 900 }} onClick={()=>nav("/directory")}>Directory</button>
          </div>
        </div>
      </div>
    </div>
  );
}
