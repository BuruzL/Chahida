import React, { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { addComment, bumpView, getDB, updatePost } from "../lib/db";
import { api } from "../lib/api";
import TagPill from "../components/TagPill";
import { formatTime } from "../lib/utils";
import { useAuth } from "../context/AuthContext";
import EmptyState from "../components/EmptyState";

export default function PostDetails(){
  const { id } = useParams();
  const { user } = useAuth();
  const [tick, setTick] = useState(0);
  const [text, setText] = useState("");

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const localDB = useMemo(() => getDB(), [tick]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.get("/api/posts");
        const found = (data || []).find(p => String(p._id) === id || String(p.id) === id);
        if(found){
          if(!mounted) return;
          setPost(found);
          setComments([]); // backend comments not implemented yet
        } else {
          // fallback to local DB
          const lp = localDB.posts.find(p => p.id === id);
          if(lp){
            setPost(lp);
            setComments(localDB.comments[id] || []);
          }
        }
      } catch (err) {
        // on error, fallback to local DB
        const lp = localDB.posts.find(p => p.id === id);
        if(lp){
          setPost(lp);
          setComments(localDB.comments[id] || []);
        }
      }
    })();

    return () => { mounted = false };
    // eslint-disable-next-line
  }, [id, tick]);

  if(!post) return <EmptyState title="Post not found" hint="Go back to the feed and open another post." />;

  const setStatus = (status) => {
    // update both local DB and (optimistically) the backend
    updatePost(id, { status });
    (async () => {
      try {
        await api.post(`/api/posts`, { status, _id: post._id, id });
      } catch (e) {
        // ignore backend failure for now
      }
    })();
    setTick(x=>x+1);
  };

  const submit = () => {
    if(!text.trim()) return;
    addComment(id, {
      by: user?.name || "Guest",
      role: user?.levelTerm || "Visitor",
      body: text.trim()
    });
    setText("");
    setTick(x=>x+1);
  };

  return (
    <div className="grid">
      <div className="vstack">
        <div className="card" style={{ padding: 16 }}>
          <div className="hstack" style={{ justifyContent:"space-between" }}>
            <TagPill tag={post.tag} />
            <span className="badge" style={{ fontWeight: 900 }}>
              {post.status} • {post.urgency}
            </span>
          </div>

          <h2 style={{ margin:"12px 0 0", letterSpacing:"-0.02em" }}>{post.title}</h2>
          <div className="muted small" style={{ marginTop: 6, lineHeight: 1.6 }}>{post.body}</div>

          <div className="hr" />

          <div className="hstack muted small" style={{ justifyContent:"space-between", flexWrap:"wrap" }}>
            <span>By <b>{post.authorName}</b> • {formatTime(post.createdAt)}</span>
            <span>{post.location?.hall} • {post.location?.spot}{post.location?.room ? ` • Room ${post.location.room}`:""}</span>
          </div>

          {Object.keys(post.meta || {}).length > 0 && (
            <>
              <div className="hr" />
              <div className="vstack" style={{ gap: 10 }}>
                <div style={{ fontWeight: 900 }}>Details</div>
                <pre className="soft" style={{ margin:0, padding: 12, overflow:"auto", borderRadius: 16, fontSize: 13 }}>
{JSON.stringify(post.meta, null, 2)}
                </pre>
              </div>
            </>
          )}

          <div className="hr" />
          <div className="hstack" style={{ flexWrap:"wrap" }}>
            <button className="btn" style={{ fontWeight: 900 }} onClick={()=>setStatus("Open")}>Open</button>
            <button className="btn" style={{ fontWeight: 900 }} onClick={()=>setStatus("In progress")}>In progress</button>
            <button className="btn btnPrimary" style={{ fontWeight: 900 }} onClick={()=>setStatus("Resolved")}>Mark resolved</button>
            <Link to="/create" className="btn" style={{ fontWeight: 900 }}>Create another</Link>
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div className="hstack" style={{ justifyContent:"space-between" }}>
            <div style={{ fontWeight: 900 }}>Responses</div>
            <span className="badge" style={{ fontWeight: 900 }}>{comments.length}</span>
          </div>

          <div className="hr" />

          <div className="vstack">
            {comments.length === 0 ? (
              <div className="muted small">No replies yet. Be the first to respond.</div>
            ) : (
              comments.slice().reverse().map(c => (
                <div key={c.id} className="soft" style={{ padding: 12 }}>
                  <div className="hstack" style={{ justifyContent:"space-between" }}>
                    <div style={{ fontWeight: 900 }}>{c.by}</div>
                    <span className="badge" style={{ fontWeight: 900 }}>{c.role}</span>
                  </div>
                  <div className="muted small" style={{ marginTop: 6, lineHeight: 1.6 }}>{c.body}</div>
                </div>
              ))
            )}
          </div>

          <div className="hr" />
          <textarea
            className="input"
            rows={3}
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder="Write a helpful response… (e.g., I can donate / I found it / I can sell / I have notes)"
          />
          <div className="hstack" style={{ justifyContent:"flex-end", marginTop: 10 }}>
            <button className="btn btnPrimary" style={{ fontWeight: 900 }} onClick={submit}>Send</button>
          </div>
        </div>
      </div>

      <div className="vstack">
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>Next actions</div>
          <div className="muted small" style={{ marginTop: 6 }}>
            Quick tools to make this hackathon project feel “real”.
          </div>
          <div className="hr" />
          <div className="vstack">
            <Link to="/directory" className="btn" style={{ fontWeight: 900 }}>Find donors / students</Link>
            <Link to={`/category/${encodeURIComponent(post.tag)}`} className="btn" style={{ fontWeight: 900 }}>More like this</Link>
            <Link to="/settings" className="btn" style={{ fontWeight: 900 }}>Settings</Link>
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>Safety</div>
          <div className="muted small" style={{ marginTop: 6 }}>
            Campus-only. Avoid sharing room numbers publicly for sensitive posts.
          </div>
        </div>
      </div>
    </div>
  );
}
