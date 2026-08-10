/**
 * Thaigredient `.txby-tag` primitive, ported from the DS `core.css`.
 * The button half now lives in the themed shadcn Button.
 */
const INK = "#111D45";
const SHADOW = "3px 4px 0 rgba(17,29,69,0.9)";
const SHADOW_SM = "2px 3px 0 rgba(17,29,69,0.9)";

const TAG_COLORS: Record<string, { bg: string; fg: string }> = {
  pink: { bg: "#EF4899", fg: "#fff" },
  cyan: { bg: "#02AFDA", fg: "#fff" },
  red: { bg: "#C82227", fg: "#fff" },
  yellow: { bg: "#F9EF3E", fg: INK },
  white: { bg: "#FFFDF7", fg: INK },
};

/** Ticket-shaped tag with punched-out circular notches on either side. */
export function ThaiTag({
  price,
  children,
  color = "yellow",
}: {
  price: string;
  children?: React.ReactNode;
  color?: keyof typeof TAG_COLORS;
}) {
  const c = TAG_COLORS[color] ?? TAG_COLORS.yellow;
  const notch: React.CSSProperties = {
    content: '""',
    position: "absolute",
    width: 12,
    height: 12,
    background: "#FFFDF7",
    border: `2.5px solid ${INK}`,
    borderRadius: "50%",
    top: "50%",
    transform: "translateY(-50%)",
  };
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--t-font-heading)",
        border: `2.5px solid ${INK}`,
        borderRadius: 6,
        padding: "8px 18px",
        boxShadow: SHADOW_SM,
        background: c.bg,
        color: c.fg,
      }}
    >
      <span aria-hidden style={{ ...notch, left: -7 }} />
      <span aria-hidden style={{ ...notch, right: -7 }} />
      <b style={{ fontSize: 20, lineHeight: 1 }}>{price}</b>
      {children ? (
        <span
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            opacity: 0.85,
          }}
        >
          {children}
        </span>
      ) : null}
    </span>
  );
}

export { INK, SHADOW, SHADOW_SM };
