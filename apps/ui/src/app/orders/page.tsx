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
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <Nav />
      <h2>Orders</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input name="name" placeholder="Customer Name" value={form.name} onChange={handleChange} required style={{ width: "100%", marginBottom: 8 }} />
        <input name="phone" placeholder="Customer Phone" value={form.phone} onChange={handleChange} required style={{ width: "100%", marginBottom: 8 }} />
        <input name="products" placeholder="Products (e.g. 1-2-100,2-1-50)" value={form.products} onChange={handleChange} required style={{ width: "100%", marginBottom: 8 }} />
        <input name="totalAmount" placeholder="Total Amount" value={form.totalAmount} onChange={handleChange} required type="number" style={{ width: "100%", marginBottom: 8 }} />
        <button type="submit" style={{ width: "100%" }}>Add Order</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {orders.map((o) => (
          <li key={o.id} style={{ marginBottom: 8 }}>
            <b>Order #{o.id}</b> - {o.customer?.name} ({o.customer?.phone})<br />
            Total: ${o.totalAmount}<br />
            Products:
            <ul>
              {o.products?.map((p: any, idx: number) => (
                <li key={idx}>Product ID: {p.productId}, Qty: {p.quantity}, Rate: ${p.rate}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
