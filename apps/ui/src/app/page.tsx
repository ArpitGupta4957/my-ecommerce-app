import Nav from "./components/Nav";

export default function Home() {
  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", textAlign: "center" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Welcome to MyEcommerceApp 🛒</h1>
      <p style={{ fontSize: 18, marginBottom: 24 }}>
        Manage products, create orders, and explore your microservices-powered e-commerce platform.
      </p>
      <Nav />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32 }}>
        <a href="/login" style={{ padding: 16, background: "#f5f5f5", borderRadius: 8, textDecoration: "none", color: "#222", fontWeight: 500 }}>
          🔑 Login
        </a>
        <a href="/products" style={{ padding: 16, background: "#e3fcec", borderRadius: 8, textDecoration: "none", color: "#222", fontWeight: 500 }}>
          📦 View Products
        </a>
        <a href="/orders" style={{ padding: 16, background: "#e3e8fc", borderRadius: 8, textDecoration: "none", color: "#222", fontWeight: 500 }}>
          🛒 View Orders
        </a>
      </div>
      <div style={{ marginTop: 40, color: "#888" }}>
        <small>Powered by NestJS, Next.js, PostgreSQL, and Docker Compose</small>
      </div>
    </div>
  );
}