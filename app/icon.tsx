import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
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
          background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 55%, #38bdf8 100%)",
          borderRadius: 8,
          color: "#ffffff",
          fontSize: 20,
          fontWeight: 800,
          fontFamily: "sans-serif",
          letterSpacing: -1,
        }}
      >
        £
      </div>
    ),
    { ...size }
  );
}
