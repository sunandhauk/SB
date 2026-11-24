"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function IntroSplash() {
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const leaveTimer = window.setTimeout(() => setLeaving(true), 650);
    const removeTimer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = previousOverflow;
    }, 1000);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`intro-splash${leaving ? " is-leaving" : ""}`} aria-hidden="true">
      <Image
        src="/images/stackbros-geometric-wordmark-outlined.png"
        alt=""
        width={2067}
        height={214}
        unoptimized
        priority
        className="intro-splash__logo"
      />
    </div>
  );
}
