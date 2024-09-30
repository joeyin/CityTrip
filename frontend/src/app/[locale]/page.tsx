import { routing } from "@/i18n/routing";
import { unstable_setRequestLocale } from "next-intl/server";

import Home from "./home";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const Index = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);

  return <Home />;
};

export default Index;
