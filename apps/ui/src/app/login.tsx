"use client";
import { useState } from "react";
import Nav from "./components/Nav";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const jwt = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.username, password: form.password }),
      });
      if (!res.ok) throw new Error("Login failed");
      const data = (await res.json()) as { access_token: string };
      localStorage.setItem("jwt", data.access_token);
      window.location.reload();
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <Nav />
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />
        <button type="submit" style={{ width: "100%" }}>Login</button>
      </form>
      {jwt && (
        <button
          onClick={() => { localStorage.removeItem("jwt"); window.location.reload(); }}
          style={{ width: "100%", background: "#eee", color: "#333" }}
        >
          Logout
        </button>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
