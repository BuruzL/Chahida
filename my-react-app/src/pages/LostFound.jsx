import { useEffect, useState } from "react";
import "../lostfound.css";
import { api } from "../lib/api";

export default function LostAndFound() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    type: "lost",
    title: "",
    location: "",
    description: "",
    image: ""
  });

  const styles = {
    img: {
      width: "100%",
      maxWidth: "260px",
      aspectRatio: 4 / 3,
      objectFit: "cover",
      borderRadius: "12px"
    },
    type: {
      color: "red"
    }
  };

 
  useEffect(() => {
    (async () => {
      try {
        const data = await api.get("/api/lost-found");
        setItems(data || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

 
  const postItem = async () => {
    if (!form.title || !form.location) return;

    // optimistic UI update
    const temp = { ...form, _id: `temp-${Date.now()}` };
    setItems((prev) => [temp, ...prev]);

    try {
      const saved = await api.post("/api/lost-found", form);
      // replace temp with saved
      setItems((prev) => prev.map((p) => (p._id === temp._id ? saved : p)));
    } catch (err) {
      console.error(err);
      // leave optimistic entry but mark or notify in real app
    }

    setForm({
      type: "lost",
      title: "",
      location: "",
      description: "",
      image: "",
    });
  };

  return (
    <div className="lf-page">
      <h1>Lost & Found</h1>

      <div className="lf-form">
        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <input
          placeholder="Item name"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              setForm((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
          }}
        />

        <button onClick={postItem}>Post</button>
      </div>

      <div className="lf-list">
        {items.map((item) => (
          <div key={item._id} className="lf-card">
            {item.image && (
              <img src={item.image} style={styles.img} />
            )}
            <h3 style={styles.type}>
              {item.type.toUpperCase()}: {item.title}
            </h3>
            <p className="loc">
              Location: {item.location}
            </p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}