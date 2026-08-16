"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useTemporal } from "./temporal-archive";

const CANVAS_WIDTH = 360;
const CANVAS_HEIGHT = 480;
const PORTRAIT_SRC = "/hero/portrait.webp";

type RevealPhase = "idle" | "scanning" | "complete";

function hashCell(index: number) {
  const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function drawScreenBackground(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#140a05";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const glow = ctx.createRadialGradient(
    CANVAS_WIDTH * 0.5,
    CANVAS_HEIGHT * 0.4,
    18,
    CANVAS_WIDTH * 0.5,
    CANVAS_HEIGHT * 0.48,
    CANVAS_WIDTH * 0.72,
  );
  glow.addColorStop(0, "rgba(255, 127, 24, 0.12)");
  glow.addColorStop(0.58, "rgba(255, 127, 24, 0.035)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0.36)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawPortrait(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  sourceCanvas: HTMLCanvasElement,
  progress: number,
  phase: RevealPhase,
) {
  drawScreenBackground(ctx);

  const sourceCtx = sourceCanvas.getContext("2d", { willReadFrequently: true });
  if (!sourceCtx) return;

  sourceCanvas.width = CANVAS_WIDTH;
  sourceCanvas.height = CANVAS_HEIGHT;

  const imageAspect = image.naturalWidth / image.naturalHeight;
  const canvasAspect = CANVAS_WIDTH / CANVAS_HEIGHT;
  const drawWidth = imageAspect > canvasAspect ? CANVAS_WIDTH : CANVAS_HEIGHT * imageAspect;
  const drawHeight = imageAspect > canvasAspect ? CANVAS_WIDTH / imageAspect : CANVAS_HEIGHT;
  const dx = (CANVAS_WIDTH - drawWidth) / 2;
  const dy = (CANVAS_HEIGHT - drawHeight) / 2;

  sourceCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  sourceCtx.drawImage(image, dx, dy, drawWidth, drawHeight);
  const data = sourceCtx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT).data;

  const stageSteps = [24, 18, 13, 10, 7, 4];
  const stage = Math.min(stageSteps.length - 1, Math.floor(progress * stageSteps.length));
  const step = stageSteps[stage];
  const cols = Math.ceil(CANVAS_WIDTH / step);
  const radiusScale = 0.5 + progress * 0.5;

  ctx.save();
  ctx.shadowColor = "rgba(255, 127, 24, 0.25)";
  ctx.shadowBlur = phase === "complete" ? 4 : 8;

  for (let y = 0; y < CANVAS_HEIGHT; y += step) {
    for (let x = 0; x < CANVAS_WIDTH; x += step) {
      const col = Math.floor(x / step);
      const row = Math.floor(y / step);
      const index = row * cols + col;
      const sampleX = Math.min(CANVAS_WIDTH - 1, x + Math.floor(step / 2));
      const sampleY = Math.min(CANVAS_HEIGHT - 1, y + Math.floor(step / 2));
      const offset = (sampleY * CANVAS_WIDTH + sampleX) * 4;
      const red = data[offset];
      const green = data[offset + 1];
      const blue = data[offset + 2];
      const alpha = data[offset + 3] / 255;
      const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
      const noise = hashCell(index);
      const visible = alpha > 0.1 && luminance > 0.12 && noise < progress * 1.08;

      if (!visible) {
        if (noise < 0.08 + progress * 0.12) {
          ctx.fillStyle = `rgba(255, 127, 24, ${0.08 + noise * 0.4})`;
          ctx.fillRect(x, y, step * 0.75, step * 0.75);
        }
        continue;
      }

      const dot = Math.max(1.2, step * radiusScale * Math.min(1, luminance + 0.08));
      const warm = Math.round(86 + luminance * 72);
      ctx.fillStyle = `rgba(255, ${warm}, 24, ${0.52 + luminance * 0.46})`;

      if (progress < 0.82) {
        ctx.fillRect(x, y, dot, dot);
      } else {
        ctx.beginPath();
        ctx.arc(x + step / 2, y + step / 2, dot / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  ctx.restore();

  if (progress > 0.86) {
    const finalAlpha = Math.min(1, (progress - 0.86) / 0.14);
    ctx.save();
    ctx.globalAlpha = finalAlpha;
    ctx.filter = "sepia(0.22) saturate(0.86) contrast(1.04) brightness(0.96)";
    ctx.drawImage(image, dx, dy, drawWidth, drawHeight);
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = "source-atop";
    ctx.globalAlpha = 0.06 * finalAlpha;
    ctx.fillStyle = "#ff7f18";
    ctx.fillRect(dx, dy, drawWidth, drawHeight);
    ctx.restore();
  }

  ctx.save();
  ctx.globalAlpha = phase === "complete" ? 0.055 : 0.13;
  ctx.fillStyle = "#ff7f18";
  for (let y = 0; y < CANVAS_HEIGHT; y += 4) {
    ctx.fillRect(0, y, CANVAS_WIDTH, 1);
  }
  ctx.restore();

  if (phase === "scanning") {
    ctx.save();
    ctx.globalAlpha = 0.48;
    ctx.fillStyle = "#ff7f18";
    ctx.fillRect(0, (progress * CANVAS_HEIGHT * 1.4) % CANVAS_HEIGHT, CANVAS_WIDTH, 2);
    ctx.restore();
  }
}

export function HeroVisual() {
  const { reducedMotion, recoverFragment, pushMessage } = useTemporal();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const sourceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const statusTimerRef = useRef<number | null>(null);
  const [phase, setPhase] = useState<RevealPhase>("idle");
  const [progress, setProgress] = useState(0.16);
  const [systemStatus, setSystemStatus] = useState("IDENTITY RECONSTRUCTION");

  const render = useCallback((nextProgress: number, nextPhase: RevealPhase) => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    const sourceCanvas = sourceCanvasRef.current;
    if (!canvas || !image || !sourceCanvas || !image.complete) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    drawPortrait(ctx, image, sourceCanvas, nextProgress, nextPhase);
  }, []);

  useEffect(() => {
    sourceCanvasRef.current = document.createElement("canvas");
    const image = new Image();
    image.src = PORTRAIT_SRC;
    image.onload = () => {
      imageRef.current = image;
      const initialProgress = reducedMotion ? 1 : 0.16;
      setPhase(reducedMotion ? "complete" : "idle");
      setProgress(initialProgress);
      setSystemStatus(reducedMotion ? "ARCHIVE ACCESS GRANTED" : "IDENTITY RECONSTRUCTION");
      render(initialProgress, reducedMotion ? "complete" : "idle");
    };
    imageRef.current = image;

    return () => {
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
      if (statusTimerRef.current) window.clearTimeout(statusTimerRef.current);
    };
  }, [reducedMotion, render]);

  useEffect(() => {
    render(progress, phase);
  }, [phase, progress, render]);

  const activateReveal = useCallback(() => {
    if (animationRef.current) window.cancelAnimationFrame(animationRef.current);

    if (statusTimerRef.current) window.clearTimeout(statusTimerRef.current);

    if (reducedMotion) {
      setPhase("complete");
      setProgress(1);
      setSystemStatus("ARCHIVE ACCESS GRANTED");
      render(1, "complete");
      recoverFragment(1);
      pushMessage("ARCHIVE ACCESS GRANTED");
      return;
    }

    setPhase("scanning");
    setProgress(0.16);
    setSystemStatus("IDENTITY RECONSTRUCTION");
    pushMessage("SCANNING IDENTITY", 2200);
    statusTimerRef.current = window.setTimeout(() => setSystemStatus("SCANNING IDENTITY"), 220);
    const started = performance.now();
    const duration = 2200;

    const tick = (time: number) => {
      const raw = Math.min(1, (time - started) / duration);
      const eased = 1 - Math.pow(1 - raw, 2.2);
      const nextProgress = 0.16 + eased * 0.84;
      setProgress(nextProgress);
      render(nextProgress, raw >= 1 ? "complete" : "scanning");

      if (raw < 1) {
        animationRef.current = window.requestAnimationFrame(tick);
      } else {
        setPhase("complete");
        setProgress(1);
        setSystemStatus("IDENTITY CONFIRMED");
        recoverFragment(1);
        statusTimerRef.current = window.setTimeout(() => {
          setSystemStatus("ARCHIVE ACCESS GRANTED");
          pushMessage("ARCHIVE ACCESS GRANTED", 1800);
        }, 480);
      }
    };

    animationRef.current = window.requestAnimationFrame(tick);
  }, [pushMessage, recoverFragment, reducedMotion, render]);

  return (
    <div className="gameboy-device mx-auto w-full max-w-[28rem]" aria-label="Portrait reconstruction device">
      <div className="device-label-row">
        <span>TEMPORAL ARCHIVE</span>
        <span>{phase === "complete" ? "ACCESS" : "PORTRAIT"}</span>
      </div>
      <div className="device-screen">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="block aspect-[360/480] w-full"
          aria-label="Pixelated full-ratio portrait reconstruction"
          role="img"
        />
      </div>
      <div className="device-control-row">
        <button
          type="button"
          className="device-main-button"
          aria-label="Activate portrait reconstruction"
          onClick={activateReveal}
          data-cursor-label="ACTIVATE"
        />
        <div className="device-status">
          <span>{systemStatus}</span>
          <strong>{Math.round(progress * 100).toString().padStart(3, "0")}%</strong>
        </div>
      </div>
    </div>
  );
}
