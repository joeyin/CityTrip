import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "CityTrip",
  description: "CityTrip helps you navigate your city effortlessly, whether you're biking or exploring on foot. We make city exploration easier and more enjoyable by helping you find the nearest bike stations and water fountains.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray">
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
