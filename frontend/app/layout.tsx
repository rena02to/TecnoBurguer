import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Management system developed for a restaurant with the aim of serving both customers and employees, facilitating registration, placing orders and internal management of the store.",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}