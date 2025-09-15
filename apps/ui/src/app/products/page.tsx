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
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <Nav />
      <h2>Products</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input name="code" placeholder="Code" value={form.code} onChange={handleChange} required style={{ width: "100%", marginBottom: 8 }} />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={{ width: "100%", marginBottom: 8 }} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} style={{ width: "100%", marginBottom: 8 }} />
        <input name="rate" placeholder="Rate" value={form.rate} onChange={handleChange} required type="number" style={{ width: "100%", marginBottom: 8 }} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} style={{ width: "100%", marginBottom: 8 }} />
        <button type="submit" style={{ width: "100%" }}>Add Product</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: 8 }}>
            <b>{p.name}</b> (Code: {p.code}) - ${p.rate}
            <br />
            {p.description && <span>{p.description} <br /></span>}
            {p.image && <img src={p.image} alt={p.name} style={{ maxWidth: 100 }} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
