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
  SelectItem,
} from "@nextui-org/react";
import { Link, Select } from "@components";
import Logo from "@images/logo";
import InstantFilter from "./InstantFilter";
import { useApp } from "@/providers/AppProvider";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";

const UserButton = dynamic(() => import("./UserButton"), {
  ssr: false,
});

export interface NavbarProps {
  menuItems: {
    name: string;
    icon: React.JSX.Element;
    href: string;
  }[];
}

interface LocalProps {
  key: string;
  name: string;
  label: string;
}

export default function Navbar({ menuItems }: NavbarProps) {
  const pathname = usePathname();
  const locale = useLocale();

  const { queryParameters, setQueryParameters } = useApp();

  const locales: LocalProps[] = [
    {
      key: "en",
      name: "Canada",
      label: "🇨🇦",
    },
    {
      key: "zh-tw",
      name: "Taiwan",
      label: "🇹🇼",
    },
  ];

  return (
    <BaseNavbar
      maxWidth="full"
      className="bg-[#ffffffc4] shadow-md fixed"
      classNames={{
        wrapper: "pr-0",
        item: "h-full flex items-center px-0",
      }}
    >
      <NavbarContent justify="start" className="gap-6">
        <NavbarMenuToggle className="md:hidden" />
        <NavbarBrand className="flex-grow-0">
          <Link href="">
            <Logo />
          </Link>
        </NavbarBrand>

        <Select
          aria-label="Locales"
          defaultSelectedKeys={[locale]}
          className="w-[65px] hidden md:block"
          variant="faded"
          classNames={{
            label: "group-data-[filled=true]:-translate-y-5",
            trigger: "border-1 h-8 min-h-8 rounded-md",
            listbox: "p-0",
            base: "w-[65px] min-w-[65px] ",
            innerWrapper: "w-fit ",
            selectorIcon: "w-[15px] h-[15px]",
          }}
          listboxProps={{
            itemClasses: {
              base: [
                "rounded-none",
                "text-default-500",
                "transition-opacity",
                "px-3",
              ],
              selectedIcon: "w-[12px] h-[12px]",
            },
          }}
          popoverProps={{
            classNames: {
              base: "before:bg-default-200",
              content: "rounded-md w-[65px] p-0 overflow-hidden",
            },
          }}
        >
          {locales.map((locale) => (
            <SelectItem href={`/${locale.key}${pathname}`} key={locale.key}>
              {locale.label}
            </SelectItem>
          ))}
        </Select>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-0">
        {menuItems.map((item, index) => (
          <NavbarItem className="hidden md:flex" key={index}>
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
        {pathname === "/" && (
          <InstantFilter
            queryParameters={queryParameters}
            onSubmit={setQueryParameters}
          />
        )}
        <UserButton />
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
        <Select
          aria-label="Locales"
          defaultSelectedKeys={[locale]}
          variant="faded"
          className="w-[100px]"
          color="default"
          classNames={{
            label: "group-data-[filled=true]:-translate-y-5",
            trigger: "border-1 h-8 min-h-8 rounded-md",
            listbox: "p-0",
            base: "w-[65px] min-w-[65px] ",
            innerWrapper: "w-fit ",
            selectorIcon: "w-[15px] h-[15px]",
          }}
          listboxProps={{
            itemClasses: {
              base: [
                "rounded-none",
                "text-default-500",
                "transition-opacity",
                "px-3",
              ],
              selectedIcon: "w-[12px] h-[12px]",
            },
          }}
          popoverProps={{
            classNames: {
              base: "before:bg-default-200",
              content: "rounded-md w-[65px] p-0 overflow-hidden",
            },
          }}
        >
          {locales.map((locale) => (
            <SelectItem href={`/${locale.key}${pathname}`} key={locale.key}>
              {locale.label}
            </SelectItem>
          ))}
        </Select>
      </NavbarMenu>
    </BaseNavbar>
  );
}
