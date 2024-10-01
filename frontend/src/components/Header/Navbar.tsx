"use client";

import React from "react";
import { usePathname } from "@/i18n/routing";
import {
  Navbar as BaseNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  useDisclosure,
} from "@nextui-org/react";
import { Link } from "@components";
import Logo from "@images/logo";
import UserButton from "@components/Header/UserButton";

export interface NavbarProps {
  menuItems: {
    name: string;
    icon: React.JSX.Element;
    href: string;
  }[];
}

export default function Navbar({ menuItems }: NavbarProps) {
  const pathname = usePathname();
  const disclosure = useDisclosure();

  return (
    <BaseNavbar
      maxWidth="full"
      className="bg-[#ffffffc4] shadow-md h-16 fixed"
      classNames={{
        wrapper: "pr-0",
        item: "h-full flex items-center px-0",
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <Link href="">
            <Logo />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden md:flex">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              title={item.name}
              color={`/${item.href}` === pathname ? "primary" : "foreground"}
              href={item.href}
              className="gap-3 w-full h-full px-5"
            >
              {item.icon} {item.name}
            </Link>
          </NavbarItem>
        ))}
        <UserButton {...disclosure} />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              title={item.name}
              color={`/${item.href}` === pathname ? "primary" : "foreground"}
              className="w-full gap-5 py-2"
              href={item.href}
              size="lg"
            >
              {item.icon} {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </BaseNavbar>
  );
}
