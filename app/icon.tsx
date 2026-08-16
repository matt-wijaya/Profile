import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0d0c",
          color: "#e0782d",
          borderRadius: 18,
          border: "2px solid rgba(224,120,45,0.55)",
          fontFamily: "sans-serif",
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: "-0.08em",
        }}
      >
        MW
      </div>
    ),
    size,
  );
}
