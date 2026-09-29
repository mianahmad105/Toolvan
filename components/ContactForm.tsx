"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/tools";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${message}\n\n— ${name}${email ? ` (${email})` : ""}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject || "Website enquiry")}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <form onSubmit={submit} className="card p-6 sm:p-8">
      <h2 className="text-xl font-extrabold">Send us a Message</h2>
      <p className="text-sm text-muted mt-1.5">Fill out the form below and we&apos;ll get back to you as soon as possible. All fields are required to ensure we can provide you with the best assistance.</p>

      <div className="grid gap-5 sm:grid-cols-2 mt-6">
        <label className="block">
          <span className="label">Full Name <span className="text-rose-500">*</span></span>
          <input required className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" />
        </label>
        <label className="block">
          <span className="label">Email Address <span className="text-rose-500">*</span></span>
          <input required type="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" />
        </label>
      </div>

      <label className="block mt-5">
        <span className="label">Subject <span className="text-rose-500">*</span></span>
        <input required className="field" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What is this regarding?" />
      </label>

      <label className="block mt-5">
        <span className="label">Message <span className="text-rose-500">*</span></span>
        <textarea required rows={5} className="field" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Please provide details about your inquiry..." />
      </label>
      <p className="text-xs text-muted mt-1.5">Please include as much detail as possible to help us assist you better.</p>

      <button type="submit" className="w-full mt-6 inline-flex items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white shadow-md" style={{ background: "linear-gradient(90deg,#16a34a,#a3e635)" }}>
        <Send size={17} /> Send Message
      </button>
      <p className="text-xs text-muted mt-3">
        By submitting this form, you agree to our <a href="/privacy" className="underline hover:text-ink">Privacy Policy</a>. We&apos;ll only use your information to respond to your inquiry.
      </p>
    </form>
  );
}
