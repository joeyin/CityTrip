"use client";

import React from "react";
import { useDisclosure } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { IconHome, IconSupport } from "@icons";
import Navbar from "@/components/Header/Navbar";
import AccountModal from "@/components/User/Account";

export default function Template({ children }: { children: React.ReactNode }) {
  const t = useTranslations();
  const disclosure = useDisclosure();

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
    <div className="h-screen">
      <AccountModal disclosure={disclosure} />
      <Navbar menuItems={menuItems} />
      <main className="h-full">{children}</main>
    </div>
  );
}
