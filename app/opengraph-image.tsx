import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

export const alt = "Al-Makkawi Hajj & Umrah Travel, ATOL-protected pilgrimages from Birmingham";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: brand.fieldDeep,
          color: brand.onField,
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: brand.accentSoft }}>Al-Makkawi Travel</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.05 }}>Hajj and Umrah</div>
          <div style={{ fontSize: 84, lineHeight: 1.05, color: brand.accentSoft }}>from Birmingham</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 28, color: brand.onField2 }}>
          <div>ATOL-protected Hajj and Umrah from Birmingham, UK</div>
          <div>0121 753 0378</div>
        </div>
      </div>
    ),
    size,
  );
}
