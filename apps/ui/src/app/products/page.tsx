"use client";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [jwt, setJwt] = useState<string | null>(null);
  const [form, setForm] = useState({ code: "", name: "", description: "", rate: "", image: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setJwt(token);
    if (token) fetchProducts(token);
  }, []);

  const fetchProducts = async (token: string) => {
    setError("");
    try {
      const res = await fetch("/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      setProducts(await res.json());
    } catch (err) {
      setError("Failed to fetch products");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!jwt) return setError("Login required");
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ ...form, rate: Number(form.rate) }),
      });
      if (!res.ok) throw new Error("Failed to create product");
      setForm({ code: "", name: "", description: "", rate: "", image: "" });
      fetchProducts(jwt);
    } catch (err) {
      setError("Failed to create product");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <Nav />
      <h2 style={{ fontSize: 28, marginBottom: 16, textAlign: 'center' }}>🛍️ Products</h2>
      <form onSubmit={handleSubmit} style={{
        background: '#f9f9f9',
        borderRadius: 12,
        padding: 24,
        marginBottom: 32,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input name="code" placeholder="Code" value={form.code} onChange={handleChange} required style={{ flex: 1, minWidth: 120, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={{ flex: 2, minWidth: 120, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          <input name="rate" placeholder="Rate" value={form.rate} onChange={handleChange} required type="number" style={{ flex: 1, minWidth: 80, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} style={{ flex: 2, minWidth: 120, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} style={{ flex: 2, minWidth: 120, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        <button type="submit" style={{ marginTop: 16, width: '100%', padding: 12, borderRadius: 6, background: '#222', color: '#fff', fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>Add Product</button>
      </form>
      {error && <div style={{ color: "#b00020", marginBottom: 16, textAlign: 'center' }}>{error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
        {products.map((p) => (
          <div key={p.id} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: 18, textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 18 }}>{p.name}</span>
              <span style={{ color: '#888', fontSize: 13 }}>({p.code})</span>
            </div>
            <div style={{ color: '#444', fontSize: 15, marginBottom: 6 }}>{p.description}</div>
            <div style={{ fontWeight: 500, color: '#1a8917', marginBottom: 8 }}>Rate: ${p.rate}</div>
            {p.image && <img src={p.image} alt={p.name} style={{ maxWidth: 120, borderRadius: 6, marginBottom: 8, border: '1px solid #eee' }} />}
          </div>
        ))}
      </div>
    </div>
  );
}
