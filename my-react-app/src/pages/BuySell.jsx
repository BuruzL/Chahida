import { useState } from "react";
import "../buysell.css";

export default function BuySell() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    condition: "New",
    description: "",
    contact: ""
  });

  const postItem = () => {
    if (!form.title || !form.price || !form.contact) return;
    setItems([{ ...form, id: Date.now() }, ...items]);
    setForm({ title: "", price: "", condition: "New", description: "", contact: "" });
  };

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

        <button onClick={postItem}>Post Item</button>
      </div>

      <div className="bs-list">
        {items.map(item => (
          <div key={item.id} className="bs-card">
            <h3>{item.title}</h3>
            <p className="price">${item.price}</p>
            <p className="cond">{item.condition}</p>
            <p>{item.description}</p>
            <p className="contact">Contact: {item.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
