"use client";

import { useState, useRef } from "react";

const SERVICE_AREAS = [
  "Business Consulting",
  "Business Process Services",
  "Managed IT Services",
  "Artificial Intelligence",
  "Data Analytics",
  "Cloud & Hybrid IT",
  "Other",
];

export default function ResumeForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    area: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
  const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!ALLOWED_TYPES.includes(selected.type)) {
      setErrorMsg("Please upload a PDF or Word document (.pdf, .doc, .docx).");
      setFile(null);
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setErrorMsg("File size must be under 5 MB.");
      setFile(null);
      return;
    }

    setErrorMsg("");
    setFile(selected);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setErrorMsg("Please attach your resume.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const body = new FormData();
      body.append("name", form.name);
      body.append("email", form.email);
      body.append("phone", form.phone);
      body.append("linkedin", form.linkedin);
      body.append("area", form.area);
      body.append("message", form.message);
      body.append("resume", file);

      const res = await fetch("/api/careers/apply", { method: "POST", body });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", linkedin: "", area: "", message: "" });
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Application Received!</h3>
        <p className="text-primary-200 max-w-md mx-auto">
          Thank you for your interest in JTLD Consulting. Our talent team will review your
          resume and reach out if there&apos;s a match.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="resume-name" className="block text-sm font-medium text-primary-200 mb-1.5">
            Full Name <span className="text-accent-400">*</span>
          </label>
          <input
            id="resume-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
            placeholder="Jane Smith"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="resume-email" className="block text-sm font-medium text-primary-200 mb-1.5">
            Email <span className="text-accent-400">*</span>
          </label>
          <input
            id="resume-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
            placeholder="jane@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="resume-phone" className="block text-sm font-medium text-primary-200 mb-1.5">
            Phone
          </label>
          <input
            id="resume-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
            placeholder="(416) 555-1234"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label htmlFor="resume-linkedin" className="block text-sm font-medium text-primary-200 mb-1.5">
            LinkedIn Profile
          </label>
          <input
            id="resume-linkedin"
            type="url"
            value={form.linkedin}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
            placeholder="https://linkedin.com/in/janesmith"
          />
        </div>

        {/* Area of Interest */}
        <div className="sm:col-span-2">
          <label htmlFor="resume-area" className="block text-sm font-medium text-primary-200 mb-1.5">
            Area of Interest <span className="text-accent-400">*</span>
          </label>
          <select
            id="resume-area"
            required
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
          >
            <option value="" className="text-gray-900">Select a practice area</option>
            {SERVICE_AREAS.map((area) => (
              <option key={area} value={area} className="text-gray-900">
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* Resume Upload */}
        <div className="sm:col-span-2">
          <label htmlFor="resume-file" className="block text-sm font-medium text-primary-200 mb-1.5">
            Resume <span className="text-accent-400">*</span>
          </label>
          <div className="relative">
            <input
              ref={fileRef}
              id="resume-file"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-dashed border-white/30 text-left hover:bg-white/15 transition-colors flex items-center gap-3"
            >
              <svg className="w-5 h-5 text-primary-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <span className={file ? "text-white" : "text-primary-300"}>
                {file ? file.name : "Upload PDF or Word document (max 5 MB)"}
              </span>
            </button>
          </div>
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="resume-message" className="block text-sm font-medium text-primary-200 mb-1.5">
            Cover Note <span className="text-primary-400">(optional)</span>
          </label>
          <textarea
            id="resume-message"
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent resize-none"
            placeholder="Tell us a bit about yourself and what you're looking for..."
          />
        </div>
      </div>

      {/* Error */}
      {errorMsg && (
        <p className="mt-4 text-sm text-red-300 bg-red-900/30 border border-red-700/50 rounded-lg px-4 py-2">
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-900 bg-white rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </button>
      </div>
    </form>
  );
}
