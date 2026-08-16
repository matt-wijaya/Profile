"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

import { useTemporal } from "./temporal-archive";

const PIXEL_COUNT = 160;

type PixelStyle = CSSProperties & {
  "--pixel-delay": string;
  "--pixel-brightness": string;
};

function pixelValue(index: number) {
  const value = Math.sin(index * 19.19 + 4.73) * 43758.5453;
  return value - Math.floor(value);
}

export function PixelBoot() {
  const { reducedMotion } = useTemporal();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(
      () => {
        document.body.style.overflow = previousOverflow;
        setVisible(false);
      },
      reducedMotion ? 50 : 1750,
    );

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [reducedMotion]);

  if (!visible) return null;

  return (
    <div className="pixel-boot" role="status" aria-label="Generating portfolio interface">
      <div className="pixel-boot-grid" aria-hidden="true">
        {Array.from({ length: PIXEL_COUNT }, (_, index) => {
          const value = pixelValue(index);
          const style: PixelStyle = {
            "--pixel-delay": `${100 + Math.round(value * 900)}ms`,
            "--pixel-brightness": (0.76 + Math.round(value * 3) * 0.07).toFixed(2),
          };
          return <span key={index} style={style} />;
        })}
      </div>
      <div className="pixel-boot-readout">
        <span>INTERFACE RECONSTRUCTION</span>
        <strong>GENERATING PORTFOLIO</strong>
        <span className="pixel-boot-progress" aria-hidden="true" />
      </div>
    </div>
  );
}
