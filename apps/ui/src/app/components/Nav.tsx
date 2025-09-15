"use client";
import Link from "next/link";

export default function Nav() {
  return (
    <nav style={{ display: "flex", gap: 16, justifyContent: "center", margin: "2rem 0" }}>
      <Link href="/login">Login</Link>
      <Link href="/products">Products</Link>
      <Link href="/orders">Orders</Link>
    </nav>
  );
}
