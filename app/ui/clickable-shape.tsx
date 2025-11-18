"use client";

import { usePostHog } from "posthog-js/react";
import styles from "@/app/ui/home.module.css";
import { useRef, useState } from "react";

export function ClickableShape() {
  const posthog = usePostHog();
  const [spinning, setSpinning] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    posthog.capture("clicked_shape", {
      location: "home_page",
    });

    // Restart animation if already spinning
    if (spinning) {
      setSpinning(false);
      // re-add on next frame so the animation restarts cleanly
      requestAnimationFrame(() => setSpinning(true));
      return;
    }

    setSpinning(true);
  };

  const handleAnimationEnd = () => setSpinning(false);

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
      aria-label="Clickable decorative shape"
      className={[
        styles.shapeButton,
        styles.shape,
        spinning ? styles.spin : "",
      ].join(" ")}
    />
  );
}
