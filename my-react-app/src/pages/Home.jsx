import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getDB } from "../lib/db";
import { filterPosts, searchAll } from "../lib/search";
import { META } from "../data/seed";
import PostCard from "../components/PostCard";
import EmptyState from "../components/EmptyState";
import SearchBar from "../components/SearchBar";
import TagPill from "../components/TagPill";

const STATUSES = ["All","Open","In progress","Resolved"];
const URGENCY = ["All","Low","Medium","High"];

export default function Home(){
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("All");
  const [hall, setHall] = useState("All");
  const [status, setStatus] = useState("All");
  const [urgency, setUrgency] = useState("All");

  const db = useMemo(() => getDB(), []);
  const searched = useMemo(() => searchAll({ query: q, posts: db.posts, users: db.users }).posts, [q, db.posts, db.users]);
  const filtered = useMemo(() => filterPosts(searched, { tag, hall, status, urgency }), [searched, tag, hall, status, urgency]);

  const urgent = useMemo(() => {
    return db.posts
      .filter(p => (p.tag==="Emergency Blood" || p.tag==="Medicine") && p.status!=="Resolved")
      .slice(0, 4);
  }, [db.posts]);

  const counts = useMemo(() => {
    const open = db.posts.filter(p=>p.status==="Open").length;
    const donors = db.users.filter(u=>u.donorOptIn).length;
    const trades = db.posts.filter(p=>p.tag==="Buy & Sell").length;
    return { open, donors, trades };
  }, [db.posts, db.users]);

  return (
    <div className="vstack" style={{ gap: 16 }}>
      <div className="card" style={{ padding: 18, borderRadius: 26, boxShadow: "0 20px 60px rgba(11,18,32,0.10)" }}>
        <div className="hstack" style={{ justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <h1 className="title">Campus Hub</h1>
            <p className="subtitle">
              A slick campus-only feed for blood needs, lost items, academic help, marketplace deals, and buddy matching.
            </p>
            <div className="pillRow" style={{ marginTop: 10 }}>
              <span className="badge">Searchable data</span>
              <span className="badge">Smart filtering</span>
              <span className="badge">Hall-based filtering</span>
            </div>
          </div>

          <div className="hstack" style={{ gap: 10 }}>
            <Link to="/create" className="btn btnPrimary" style={{ fontWeight: 900, padding:"11px 16px" }}>
              + Create Post
            </Link>
            <Link to="/directory" className="btn" style={{ fontWeight: 900 }}>
              Donor & Student Directory
            </Link>
          </div>
        </div>

        <div className="kpi" style={{ marginTop: 14 }}>
          <div className="kpiCard">
            <h4>Open posts</h4>
            <p>{counts.open}</p>
          </div>
          <div className="kpiCard">
            <h4>Opted-in donors</h4>
            <p>{counts.donors}</p>
          </div>
          <div className="kpiCard">
            <h4>Marketplace listings</h4>
            <p>{counts.trades}</p>
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="vstack">
          <div className="card" style={{ padding: 14, background: "rgba(236, 208, 236, 0.7)"}}>
            <div className="hstack" style={{ justifyContent:"space-between" }}>
              <div style={{ fontWeight: 900, letterSpacing:"-0.02em" }}>Feed</div>
              <div className="hstack">
                <Link to="/category/Emergency%20Blood" className="btn btnDanger" style={{ fontWeight: 900 }}>
                  Emergency Blood
                </Link>
                <Link to="/category/Medicine" className="btn" style={{ fontWeight: 900 }}>
                  Medicine
                </Link>
              </div>
            </div>

            <div className="hr" />

            <SearchBar value={q} onChange={setQ} />

            <div className="hstack" style={{ marginTop: 10, flexWrap:"wrap" }}>
              <select className="input" style={{ width: 200 }} value={tag} onChange={(e)=>setTag(e.target.value)}>
                <option value="All">All tags</option>
                {META.TAGS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>

              <select className="input" style={{ width: 200 }} value={hall} onChange={(e)=>setHall(e.target.value)}>
                <option value="All">All halls</option>
                {META.HALLS.map(h => <option key={h} value={h}>{h}</option>)}
              </select>

              <select className="input" style={{ width: 170 }} value={status} onChange={(e)=>setStatus(e.target.value)}>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              <select className="input" style={{ width: 170 }} value={urgency} onChange={(e)=>setUrgency(e.target.value)}>
                {URGENCY.map(u => <option key={u} value={u}>{u}</option>)}
              </select>

              <button className="btn" onClick={() => { setQ(""); setTag("All"); setHall("All"); setStatus("All"); setUrgency("All"); }}>
                Reset
              </button>
            </div>
          </div>

          <div className="vstack">
            {filtered.length === 0 ? (
              <EmptyState title="No matching posts" hint="Try searching: A+, wallet, CSE110, Nazrul Hall, iron, tutor…" />
            ) : (
              filtered.slice(0, 30).map(p => <PostCard key={p.id} post={p} />)
            )}
          </div>
        </div>

        <div className="vstack">
          <div className="card" style={{ padding: 14 }}>
            <div style={{ fontWeight: 900 }}>Urgent right now</div>
            <div className="muted small" style={{ marginTop: 6 }}>
              Fast access to blood & medicine posts.
            </div>
            <div className="hr" />
            {urgent.map(p => (
              <Link key={p.id} to={`/post/${p.id}`} className="soft" style={{ padding: 12, display:"block", marginBottom: 10 }}>
                <div className="hstack" style={{ justifyContent:"space-between" }}>
                  <TagPill tag={p.tag} />
                  <span className="badge" style={{ fontWeight: 900 }}>{p.urgency}</span>
                </div>
                <div style={{ marginTop: 8, fontWeight: 900 }}>{p.title}</div>
                <div className="muted small" style={{ marginTop: 4 }}>{p.location?.hall} • {p.location?.spot}</div>
              </Link>
            ))}
          </div>

          <div className="card" style={{ padding: 14 }}>
            <div style={{ fontWeight: 900 }}>Quick navigation</div>
            <div className="muted small" style={{ marginTop: 6 }}>
              Jump to a feature page.
            </div>
            <div className="hr" />
            <div className="vstack">
              {META.TAGS.map(t => (
                <Link key={t} to={`/category/${encodeURIComponent(t)}`} className="btn" style={{ textAlign:"left", fontWeight: 900 }}>
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
