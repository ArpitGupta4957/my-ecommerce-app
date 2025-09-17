"use client";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [jwt, setJwt] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", products: "", totalAmount: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setJwt(token);
    if (token) fetchOrders(token);
  }, []);

  const fetchOrders = async (token: string) => {
    setError("");
    try {
      const res = await fetch("/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      setOrders(await res.json());
    } catch (err) {
      setError("Failed to fetch orders");
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
      const productsArr = form.products.split(",").map((p) => {
        const [productId, quantity, rate] = p.split("-").map((v) => v.trim());
        return { productId: Number(productId), quantity: Number(quantity), rate: Number(rate) };
      });
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          customer: { name: form.name, phone: form.phone },
          products: productsArr,
          totalAmount: Number(form.totalAmount),
        }),
      });
      if (!res.ok) throw new Error("Failed to create order");
      setForm({ name: "", phone: "", products: "", totalAmount: "" });
      fetchOrders(jwt);
    } catch (err) {
      setError("Failed to create order");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <Nav />
      <h2 style={{ fontSize: 28, marginBottom: 16, textAlign: 'center' }}>📦 Orders</h2>
      <form onSubmit={handleSubmit} style={{
        background: '#f9f9f9',
        borderRadius: 12,
        padding: 24,
        marginBottom: 32,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input name="name" placeholder="Customer Name" value={form.name} onChange={handleChange} required style={{ flex: 2, minWidth: 120, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          <input name="phone" placeholder="Customer Phone" value={form.phone} onChange={handleChange} required style={{ flex: 2, minWidth: 120, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <input name="products" placeholder="Products (e.g. 1-2-100,2-1-50)" value={form.products} onChange={handleChange} required style={{ flex: 3, minWidth: 180, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          <input name="totalAmount" placeholder="Total Amount" value={form.totalAmount} onChange={handleChange} required type="number" style={{ flex: 1, minWidth: 80, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        <button type="submit" style={{ marginTop: 16, width: '100%', padding: 12, borderRadius: 6, background: '#222', color: '#fff', fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>Add Order</button>
      </form>
      {error && <div style={{ color: "#b00020", marginBottom: 16, textAlign: 'center' }}>{error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        {orders.map((o) => (
          <div key={o.id} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: 18, textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Order #{o.id}</div>
            <div style={{ color: '#444', fontSize: 15, marginBottom: 4 }}>Customer: <b>{o.customer?.name}</b> ({o.customer?.phone})</div>
            <div style={{ fontWeight: 500, color: '#1a8917', marginBottom: 8 }}>Total: ${o.totalAmount}</div>
            <div style={{ fontSize: 14, color: '#555', marginBottom: 6 }}>Products:</div>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {o.products?.map((p: any, idx: number) => (
                <li key={idx} style={{ marginBottom: 2 }}>Product ID: {p.productId}, Qty: {p.quantity}, Rate: ${p.rate}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
