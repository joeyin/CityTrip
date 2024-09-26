"use client";

import { useLocale } from "next-intl";
import { Link as BaseLink, LinkProps } from "@nextui-org/react";

const Link = (props: LinkProps) => {
  const locale = useLocale();
  return <BaseLink {...props} href={`/${locale}/${props.href}`} />;
};

export default Link;
