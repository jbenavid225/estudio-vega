import { useState } from "react";
import { supabase } from "../api/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) return setErr(error.message);

    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-semibold text-slate-800 mb-4">Login Admin</h1>

        <label className="text-sm text-slate-600">Email</label>
        <input
          className="w-full border rounded-lg px-3 py-2 mt-1 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />

        <label className="text-sm text-slate-600">Password</label>
        <input
          className="w-full border rounded-lg px-3 py-2 mt-1 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />

        {err && <div className="text-sm text-red-600 mb-3">{err}</div>}

        <button
          disabled={loading}
          className="w-full bg-slate-900 text-white rounded-lg py-2 hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
