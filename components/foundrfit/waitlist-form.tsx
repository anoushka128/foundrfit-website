"use client";

import { FormEvent, useEffect, useState } from "react";

const STORAGE_KEY = "foundrfit-waitlist";

type WaitlistEntry = {
  name: string;
  email: string;
  role: string;
};

export function WaitlistForm() {
  const [form, setForm] = useState<WaitlistEntry>({
    name: "",
    email: "",
    role: "Founder"
  });
  const [submitted, setSubmitted] = useState<WaitlistEntry | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const savedEntries = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as WaitlistEntry[];
      const lastEntry = savedEntries.at(-1);

      if (lastEntry) {
        setSubmitted(lastEntry);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const nextEntry = {
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role
    };

    if (!nextEntry.name || !nextEntry.email) {
      setError("Please enter your name and email.");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEntry.email);

    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    if (typeof window !== "undefined") {
      const savedEntries = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as WaitlistEntry[];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...savedEntries, nextEntry]));
    }

    setSubmitted(nextEntry);
    setForm({
      name: "",
      email: "",
      role: "Founder"
    });
  }

  return (
    <div className="rounded-[1.75rem] bg-white p-6 text-slate-900 shadow-xl shadow-blue-950/10">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Join the Waitlist</p>
      <h3 className="mt-3 text-2xl font-semibold">Get early access to FoundrFit</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Share a few details to join the early list. This front-end demo stores submissions locally
        in your browser so the flow stays functional without a backend.
      </p>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Name
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            placeholder="Your name"
            value={form.name}
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Email
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            placeholder="you@example.com"
            type="email"
            value={form.email}
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Role
          <select
            className="rounded-2xl border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
            value={form.role}
          >
            <option>Founder</option>
            <option>Technical Co-Founder</option>
            <option>Business Co-Founder</option>
            <option>Operator</option>
            <option>Investor</option>
          </select>
        </label>

        {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}

        <button
          className="rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-700"
          type="submit"
        >
          Join FoundrFit
        </button>
      </form>

      {submitted ? (
        <div className="mt-6 rounded-3xl border border-green-200 bg-green-50 p-4">
          <p className="text-sm font-semibold text-green-700">You&apos;re on the list.</p>
          <p className="mt-2 text-sm leading-6 text-green-800">
            Saved for {submitted.name} ({submitted.email}) as {submitted.role}.
          </p>
        </div>
      ) : null}
    </div>
  );
}
