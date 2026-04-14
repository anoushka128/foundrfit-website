"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useApp } from "@/components/providers/app-provider";

export function SignupForm() {
  const router = useRouter();
  const { signUp, mode } = useApp();
  const [name, setName] = useState("Ava");
  const [email, setEmail] = useState("ava@example.com");
  const [password, setPassword] = useState("demo-demo");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const result = await signUp(email, password, name);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setMessage(result.message ?? "Account created.");
    router.push("/");
  }

  return (
    <Card className="w-full">
      <p className="text-sm text-ink/55">Start your tracking</p>
      <h1 className="mt-1 text-3xl font-semibold text-ink">Create your account</h1>
      <form className="mt-6 space-y-3" onSubmit={onSubmit}>
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {mode === "demo" ? (
          <p className="text-xs leading-5 text-ink/50">
            In demo mode, signup creates a local account experience without needing Supabase keys.
          </p>
        ) : null}
        {error ? <p className="text-sm text-[#9f4135]">{error}</p> : null}
        {message ? <p className="text-sm text-moss">{message}</p> : null}
        <Button className="w-full" disabled={loading}>
          {loading ? "Creating..." : "Sign up"}
        </Button>
      </form>
      <p className="mt-4 text-sm text-ink/55">
        Already have an account?{" "}
        <Link href="/" className="font-medium text-ink">
          Return to home
        </Link>
      </p>
    </Card>
  );
}
