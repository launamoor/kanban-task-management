import "./globals.css";

export const metadata = {
  title: "Kanban || Task Management || Bart Jozef",
  description:
    "Kanban - Task Management Tool, written in Next.js as a part of Frontend Mentor challenge.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      style={{ display: "block", colorScheme: "light" }}
    >
      <body>{children}</body>
    </html>
  );
}
