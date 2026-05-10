"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [email, setEmail] = useState("");

  async function login() {
    await supabase.auth.signInWithOtp({
      email,
    });
  }

  return (
    <div className="p-10">
      <input
        className="border p-2"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={login}
        className="bg-black text-white px-4 py-2 ml-2"
      >
        Login
      </button>
    </div>
  );
}