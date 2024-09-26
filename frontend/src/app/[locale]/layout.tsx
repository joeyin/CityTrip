import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { unstable_setRequestLocale } from "next-intl/server";
import { Providers } from "./providers";

import "./globals.css";

export const metadata: Metadata = {
  title: process.env.app,
  description:
    "CityTrip helps you navigate your city effortlessly, whether you're biking or exploring on foot. We make city exploration easier and more enjoyable by helping you find the nearest bike stations and water fountains.",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
