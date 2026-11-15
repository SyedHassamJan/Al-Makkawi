"use client";

import { useState } from "react";
import { site } from "@/lib/site";

// No backend needed for the demo: the form composes an email to the office.
// To go live, swap handleSubmit for a Server Action / Resend / Formspree call.
export default function EnquiryForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Enquiry: ${f.get("trip")}, ${f.get("name")}`;
    const body = [
      `Name: ${f.get("name")}`,
      `Phone: ${f.get("phone")}`,
      `Email: ${f.get("email")}`,
      `Interested in: ${f.get("trip")}`,
      `Travellers: ${f.get("travellers")}`,
      `Preferred month: ${f.get("month") || "Flexible"}`,
      "",
      `${f.get("message") || ""}`,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "min-h-12 w-full rounded-xl border border-muted bg-paper px-4 py-3 text-md text-ink placeholder:text-muted outline-2 outline-transparent outline-offset-[-3px] transition-colors focus-visible:outline-focus disabled:cursor-not-allowed disabled:bg-paper-2 disabled:opacity-60";
  const label = "mb-2 block text-sm font-semibold text-ink-2";

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="name" className={label}>Full name</label>
        <input id="name" name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="phone" className={label}>Phone</label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" className={field} />
      </div>
      <div>
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" name="email" type="email" autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="trip" className={label}>I&apos;m interested in</label>
        <select id="trip" name="trip" className={field} defaultValue="Umrah">
          <option>Hajj</option>
          <option>Umrah</option>
          <option>Umrah + Al-Aqsa</option>
          <option>Heritage tour</option>
          <option>Hotels only</option>
        </select>
      </div>
      <div>
        <label htmlFor="travellers" className={label}>Travellers</label>
        <select id="travellers" name="travellers" className={field} defaultValue="2">
          {["1", "2", "3", "4", "5", "6+"].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="month" className={label}>Preferred travel month</label>
        <input id="month" name="month" className={field} placeholder="Ramadan, half-term or flexible" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>Anything we should know?</label>
        <textarea id="message" name="message" rows={3} className={field} placeholder="Hotels, mobility needs, first Umrah" />
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-2">This opens your email app with the details filled in.</p>
        <button type="submit" className="btn-primary">

          {sent ? "Opening your email…" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
