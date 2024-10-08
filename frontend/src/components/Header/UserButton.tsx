"use client";

import React from "react";
import { useDisclosure, NavbarItem } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { UserProps } from "@/providers/AppProvider";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import ProfileModal from "@/components/User/Profile";
import AccountModal from "@/components/User/Account";
import { IconUserFill } from "@images/icons";
import { Button } from "@components";

const UserButton = ({
  user,
  logout,
}: {
  user: UserProps | null;
  logout: () => void;
}) => {
  const t = useTranslations();
  const profileDisclosure = useDisclosure();
  const accountDisclosure = useDisclosure();

  if (user) {
    return (
      <NavbarItem className="px-0">
        {profileDisclosure.isOpen && (
          <ProfileModal user={user} disclosure={profileDisclosure} />
        )}
        <Dropdown
          placement="bottom-end"
          radius="none"
          classNames={{
            base: "p-0 translate-x-[12px] translate-y-[-7px] font-roboto",
            content: "p-0 md:min-w-[235px] shadow-lg",
            trigger: [
              "flex-row-reverse",
              "md:min-w-[235px]",
              "md:max-w-[235px]",
              "aria-expanded:scale-[1]",
              "aria-expanded:bg-gray-200",
              "hover:bg-gray-200",
              "h-full",
              "px-4",
              "rounded-none",
              "gap-3.5",
            ],
          }}
        >
          <DropdownTrigger title={t("open-account-dropdown")}>
            <User
              as="button"
              name={user.name}
              avatarProps={{
                size: "md",
                isBordered: true,
                src: user.avatar,
                classNames: {
                  base: "ring-offset-0 ring-primary max-w-10 max-h-10 min-w-10 min-h-10",
                },
              }}
              classNames={{
                wrapper: "overflow-hidden hidden md:block",
                name: "font-roboto text-primary text-base font-bold truncate w-full",
              }}
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="User Actions"
            variant="flat"
            itemClasses={{
              base: "rounded-none mb-0 p-4 text-gray-500 text-sm data-[hover=true]:bg-gray-50 data-[focus=true]:outline-offset-[-2px]",
            }}
            classNames={{
              base: ["p-0", "gap-0", "rounded-none"],
              list: [
                "gap-0",
                "[&>li:not(:last-child)]:border-b-1 border-gray-200",
              ],
            }}
          >
            <DropdownItem
              key="profile"
              title={t("profile")}
              onPress={profileDisclosure.onOpen}
            >
              {t("profile")}
            </DropdownItem>
            <DropdownItem key="logout" title={t("logout")} onPress={logout}>
              {t("logout")}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarItem>
    );
  }

  return (
    <NavbarItem>
      {accountDisclosure.isOpen && (
        <AccountModal disclosure={accountDisclosure} />
      )}
      <Button
        title={t("header.signin/up")}
        className="min-w-fit p-0 h-full w-[var(--navbar-height)] font-roboto text-sm font-bold sm:hidden text-gray-500"
        radius="none"
        variant="transparent"
        onClick={accountDisclosure.onOpen}
      >
        <IconUserFill />
      </Button>
      <Button
        title={t("header.signin/up")}
        className="border-1 mx-5 px-5 h-9 font-roboto text-sm font-bold hidden sm:block"
        color="primary"
        radius="none"
        variant="ghost"
        onPress={accountDisclosure.onOpen}
      >
        {t("header.signin/up")}
      </Button>
    </NavbarItem>
  );
};

export default React.memo(UserButton);
