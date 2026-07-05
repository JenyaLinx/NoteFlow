import { ReactNode } from "react";

export default function NotesLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}