"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { IconHome, IconSupport } from "@icons";
import Navbar from "@/components/Header/Navbar";

export default function Template({ children }: { children: React.ReactNode }) {
  const t = useTranslations();

  const menuItems = [
    {
      name: t("header.home"),
      icon: <IconHome />,
      href: "",
    },
    {
      name: t("header.support"),
      icon: <IconSupport />,
      href: "support",
    },
  ];

  return (
    <div className="h-dvh">
      <Navbar menuItems={menuItems} />
      <main className="h-full">{children}</main>
    </div>
  );
}
