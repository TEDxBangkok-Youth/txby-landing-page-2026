"use client";

import { useState } from "react";
import { teams } from "@/lib/site-data";

/**
 * Volunteers roster card: shows the list of teams, and drills into a single
 * team's full name list on click. Mirrors the design's team-detail toggle.
 */
export function VolunteersRoster() {
  const [selected, setSelected] = useState<number | null>(null);
  const detail = selected != null ? teams[selected] : null;

  return (
    <div
      style={{
        background: "#FFFDF7",
        border: "2.5px solid #111D45",
        borderRadius: 14,
        boxShadow: "3px 4px 0 rgba(17,29,69,.9)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {detail ? (
        <>
          <div
            style={{
              padding: "20px 24px 14px",
              borderBottom: "2.5px solid #111D45",
              background: "#F9EF3E",
            }}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              style={{
                background: "none",
                border: 0,
                color: "#233064",
                font: "inherit",
                fontSize: 12,
                padding: "0 0 12px",
                margin: 0,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              ← กลับไปที่รายชื่อทีม
            </button>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                textTransform: "uppercase",
                fontSize: 26,
                color: "#111D45",
              }}
            >
              {detail.name}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: "18px 24px",
              overflowY: "auto",
            }}
          >
            {detail.names.map((n) => (
              <span
                key={n}
                style={{ fontSize: ".9375rem", color: "#233064", lineHeight: 1.5 }}
              >
                {n}
              </span>
            ))}
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              padding: "20px 24px 16px",
              borderBottom: "2.5px solid #111D45",
              background: "#F9EF3E",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                textTransform: "uppercase",
                fontSize: 22,
                color: "#111D45",
              }}
            >
              รายชื่อทีม Volunteers
            </div>
          </div>
          <div style={{ overflowY: "auto" }}>
            {teams.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setSelected(i)}
                className="vol-row"
                style={{
                  width: "100%",
                  background: "none",
                  border: 0,
                  borderBottom: "2px solid #DCDFEA",
                  padding: "15px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  font: "inherit",
                  color: "#111D45",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    fontSize: 15,
                  }}
                >
                  {t.name}
                </span>
                <span style={{ color: "#D6317F", fontWeight: 700 }}>›</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
