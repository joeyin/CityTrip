import React from "react";
import { unstable_setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

import FAQs from "./faqs";
import Form from "./form";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function Support({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <div className="flex flex-col xl:flex-row h-full">
      <div className="flex flex-1 pt-16 bg-secondary">
        <FAQs />
      </div>
      <div className="flex flex-1 pt-16">
        <Form />
      </div>
    </div>
  );
}
