import { routing } from "@/i18n/routing";

import Home from "./home/page";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default Home;