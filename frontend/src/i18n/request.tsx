import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale = "en" }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) notFound(); //eslint-disable-line

  return {
    messages: (await import(`../../locales/${locale}.json`)).default,
  };
});
