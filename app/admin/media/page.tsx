"use client";

import { useState } from "react";

export default function AdminMediaPage() {
  const [status, setStatus] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const onFile = async (file: File | null) => {
    if (!file) return;
    setStatus("Requesting signature…");
    const signRes = await fetch("/api/cloudinary/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder: "unknown/uploads" }),
    });
    const sign = await signRes.json();
    if (!signRes.ok) {
      setStatus(
        "Cloudinary not configured. Add CLOUDINARY_* keys to .env.local — using local preview only."
      );
      setPreview(URL.createObjectURL(file));
      return;
    }

    setStatus("Uploading…");
    const form = new FormData();
    form.append("file", file);
    form.append("api_key", sign.apiKey);
    form.append("timestamp", String(sign.timestamp));
    form.append("signature", sign.signature);
    form.append("folder", sign.folder);

    const upload = await fetch(
      `https://api.cloudinary.com/v1_1/${sign.cloudName}/auto/upload`,
      { method: "POST", body: form }
    );
    const data = await upload.json();
    if (data.secure_url) {
      setPreview(data.secure_url);
      setStatus("Uploaded: " + data.secure_url);
    } else {
      setStatus("Upload failed");
    }
  };

  return (
    <div>
      <h1 className="font-display text-4xl mb-2">Media</h1>
      <p className="text-charcoal/55 mb-8 text-sm">
        Signed Cloudinary uploads for photos and documents.
      </p>
      <label className="inline-flex cursor-pointer border border-charcoal/20 px-6 py-4 text-[11px] tracking-[0.18em] uppercase hover:bg-charcoal hover:text-sand transition">
        Choose file
        <input
          type="file"
          className="sr-only"
          accept="image/*,video/*,.pdf,.doc,.docx"
          onChange={(e) => onFile(e.target.files?.[0] || null)}
        />
      </label>
      {status && <p className="mt-6 text-sm text-charcoal/65">{status}</p>}
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="Preview" className="mt-8 max-h-80 border border-charcoal/10" />
      )}
    </div>
  );
}
