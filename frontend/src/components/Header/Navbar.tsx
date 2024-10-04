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
  // SelectItem,
} from "@nextui-org/react";
import {
  Link,
  // Select
} from "@components";
import Logo from "@images/logo";
import UserButton from "@components/Header/UserButton";
import InstantFilter from "./InstantFilter";
import { useApp } from "@/providers/AppProvider";

export interface NavbarProps {
  menuItems: {
    name: string;
    icon: React.JSX.Element;
    href: string;
  }[];
}

export default function Navbar({ menuItems }: NavbarProps) {
  const pathname = usePathname();
  const { queryParameters, setQueryParameters, user, logout } = useApp();

  // const langs = [
  //   {
  //     id: 1,
  //     name: "Canada",
  //     emoji: "🇨🇦",
  //     locale: "en",
  //     role: "CEO",
  //     team: "Management",
  //     status: "active",
  //     age: "29",
  //     avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
  //     email: "tony.reichert@example.com",
  //   },
  //   {
  //     id: 2,
  //     name: "Taiwan",
  //     emoji: "🇹🇼",
  //     locale: "zh-tw",
  //     role: "Tech Lead",
  //     team: "Development",
  //     status: "paused",
  //     age: "25",
  //     avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
  //     email: "zoey.lang@example.com",
  //   },
  // ];

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

        {/* <Select
          items={users}
          className="max-w-[80px]"
          variant="bordered"
          radius="sm"
          classNames={{
            label: "group-data-[filled=true]:-translate-y-5",
          }}
          listboxProps={{
            itemClasses: {
              base: [
                "rounded-sm",
                "text-default-500",
                "transition-opacity",
                // "data-[hover=true]:text-foreground",
                // "data-[hover=true]:bg-default-100",
                // "dark:data-[hover=true]:bg-default-50",
                // "data-[selectable=true]:focus:bg-default-50",
                // "data-[pressed=true]:opacity-70",
                // "data-[focus-visible=true]:ring-default-500",
              ],
            },
          }}
          popoverProps={{
            classNames: {
              base: "before:bg-default-200",
              content: "p-0 border-small border-divider bg-background",
            },
          }}
          renderValue={(items) => {
            return items.map((item) => (
              <div key={item.key} className="flex items-center gap-2">
                {item.data.emoji}
              </div>
            ));
          }}
        >
          {(user) => (
            <SelectItem key={user.id} textValue={user.name}>
              <div className="flex gap-2 items-center">
                {user.emoji}
              </div>
            </SelectItem>
          )}
        </Select> */}
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
        <UserButton user={user} logout={logout} />
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
