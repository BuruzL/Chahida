import { useState } from "react";
import "../lostfound.css";

export default function LostAndFound() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    type: "Lost",
    name: "",
    location: "",
    description: "",
  });

  const postItem = () => {
    if (!form.name || !form.location) return;
    setItems([{ ...form, id: Date.now() }, ...items]);
    setForm({ type: "Lost", name: "", location: "", description: "" });
  };

  return (
    <div className="lf-page">
      <h1>Lost & Found</h1>

      <div className="lf-form">
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option>Lost</option>
          <option>Found</option>
        </select>

        <input
          placeholder="Item name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button onClick={postItem}>Post</button>
      </div>

      <div className="lf-list">
        {items.map((item) => (
          <div key={item.id} className="lf-card">
            <h3>{item.type}: {item.name}</h3>
            <p className="loc">Location: {item.location}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
