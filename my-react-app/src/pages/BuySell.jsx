import { useEffect, useState } from "react";
import "../buysell.css";
import { api } from "../lib/api";

export default function BuySell() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    condition: "New",
    description: "",
    contact: ""
  });

  const styles= {
    img:{
      width: "100%",
      maxWidth: "260px",
      aspectRatio: 4 / 3,
      objectFit: "cover",
      borderRadius: "12px"
    }
  }


  const postItem = () => {
    if (!form.title || !form.price || !form.contact) return;
    const temp = { ...form, _id: `temp-${Date.now()}`, image: form.img };
    setItems((prev) => [temp, ...prev]);
    setForm({ title: "", price: "", condition: "New", description: "", contact: "", img: "" });

    (async () => {
      try {
        const payload = {
          type: "sell",
          title: form.title,
          price: Number(form.price),
          condition: form.condition,
          description: form.description,
          contact: form.contact,
          image: form.img || "",
        };
        const saved = await api.post("/api/posts", payload);
        setItems((prev) => prev.map((p) => (p._id === temp._id ? saved : p)));
      } catch (err) {
        console.error(err);
      }
    })();
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get("/api/posts");
        setItems(data || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="bs-page">
      <h1>Buy & Sell</h1>

      <div className="bs-form">
        <input placeholder="Item title" value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })} />

        <input placeholder="Price" value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })} />

        <select value={form.condition}
          onChange={e => setForm({ ...form, condition: e.target.value })}>
          <option>New</option>
          <option>Used</option>
          <option>Refurbished</option>
        </select>

        <input placeholder="Contact info" value={form.contact}
          onChange={e => setForm({ ...form, contact: e.target.value })} />

        <textarea placeholder="Description" value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })} />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                setForm((prev) => ({ ...prev, img: reader.result }));
              };
              reader.readAsDataURL(file);
            }}
          />
        <button onClick={postItem}>Post Item</button>
      </div>

      <div className="bs-list">
        {items.map(item => (
          <div key={item._id || item.id} className="bs-card">
            {(item.image || item.img) && <img src={item.image || item.img} style={styles.img}/>} 
            <h3>{item.title}</h3>
            <p className="price">BDT{item.price}</p>
            <p className="cond">{item.condition}</p>
            <p>{item.description}</p>
            <p className="contact">Contact: {item.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
