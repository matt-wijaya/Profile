import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "radial-gradient(circle at top, rgba(224,120,45,0.14), transparent 320px), #0c0b08",
          color: "#f3efe7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            opacity: 0.84,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span>Matthew Wijaya</span>
          <span style={{ color: "#e0782d" }}>Design x Build</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "760px" }}>
          <div
            style={{
              display: "flex",
              border: "1px solid rgba(243,239,231,0.16)",
              padding: "10px 16px",
              borderRadius: 999,
              fontSize: 22,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Portfolio Preview
          </div>
          <div style={{ fontSize: 82, lineHeight: 1, fontWeight: 700 }}>
            I design digital products and build them too.
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: "#d7d2c8" }}>
            UI/UX design, product thinking, visual systems, and software development from Indonesia.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.08em",
            color: "#a6a097",
          }}
        >
          <span>Universitas Indonesia - 2024-present</span>
          <span>portfolio build: stable</span>
        </div>
      </div>
    ),
    size,
  );
}
