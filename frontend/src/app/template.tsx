"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";

import IconHome from "@icons/home";
import IconBike from "@icons/bike";
import IconWaterFountain from "@icons/water-fountain";
import IconSupport from "@icons/support";
import Logo from "@images/logo";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Home",
      icon: <IconHome />,
      href: "/",
    },
    {
      name: "Bike Stations",
      icon: <IconBike />,
      href: "/bike-stations",
    },
    {
      name: "Water Fountains",
      icon: <IconWaterFountain />,
      href: "/water-fountains",
    },
    {
      name: "Support",
      icon: <IconSupport />,
      href: "/support",
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        shouldHideOnScroll
        maxWidth="full"
        className="bg-white shadow-md h-16"
      >
        <NavbarContent>
          <NavbarMenuToggle className="sm:hidden" />
          <NavbarBrand>
            <Logo />
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
              className="border-1 h-8 font-roboto text-sm font-bold"
              color="primary"
              radius="none"
              variant="ghost"
            >
              SIGN IN/UP
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

      <main className="flex-1">{children}</main>
    </div>
  );
}
