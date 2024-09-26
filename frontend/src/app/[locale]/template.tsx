"use client";

import React from "react";
import { usePathname } from "@/i18n/routing";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { Link } from "@components";
import { IconHome, IconBike, IconWaterFountain, IconSupport } from "@icons";
import Logo from "@images/logo";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations();

  const menuItems = [
    {
      name: t("header.home"),
      icon: <IconHome />,
      href: "",
    },
    {
      name: t("header.bike-stations"),
      icon: <IconBike />,
      href: "bike-stations",
    },
    {
      name: t("header.water-fountains"),
      icon: <IconWaterFountain />,
      href: "water-fountains",
    },
    {
      name: t("header.support"),
      icon: <IconSupport />,
      href: "support",
    },
  ];

  return (
    <div className="h-screen min-h-[880px]">
      <Navbar maxWidth="full" className="bg-[#ffffffc4] shadow-md h-16 fixed">
        <NavbarContent>
          <NavbarMenuToggle className="sm:hidden" />
          <NavbarBrand>
            <Link href="">
              <Logo />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end" className="hidden md:flex gap-[45px]">
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <Link
                color={item.href === pathname ? "primary" : "foreground"}
                title={item.name}
                href={item.href}
                className="gap-[10px]"
              >
                {item.icon} {item.name}
              </Link>
            </NavbarItem>
          ))}
          <NavbarItem>
            <Button
              className="border-1 px-3 h-8 font-roboto text-sm font-bold"
              color="primary"
              radius="none"
              variant="ghost"
            >
              {t("header.signin/up")}
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={index}>
              <Link
                title={item.name}
                color={item.href === pathname ? "primary" : "foreground"}
                className="w-full"
                href={item.href}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <main className="h-full">{children}</main>
    </div>
  );
}
