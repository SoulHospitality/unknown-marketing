"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function ResetCmsButton() {
  const [status, setStatus] = useState("");

  const reset = async () => {
    if (!confirm("Reset ALL CMS content to seed defaults?")) return;
    setStatus("Resetting…");
    const res = await fetch("/api/admin/content", {
      method: "DELETE",
      credentials: "include",
    });
    setStatus(res.ok ? "Reset complete. Refresh the site." : "Reset failed.");
  };

  return (
    <div>
      <motion.button
        type="button"
        onClick={reset}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="border border-sand/25 bg-transparent px-4 py-2.5 text-[11px] tracking-[0.15em] uppercase text-sand transition hover:border-nude hover:text-nude"
      >
        Reset CMS to seed
      </motion.button>
      {status && <p className="mt-3 text-xs text-sand/45">{status}</p>}
    </div>
  );
}
