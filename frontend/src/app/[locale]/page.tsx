import React from "react";
import GoogleMap from "@components/GoogleMap";
import { unstable_setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <GoogleMap
      mapContainerClassName="w-full h-full relative"
      zoom={12}
      center={{
        lat: 43.7292717,
        lng: -79.6082231,
      }}
      options={{
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false,
        mapId: "ef34fc3265e9becb",
      }}
    >
      <h1>hello</h1>
    </GoogleMap>
  );
}
