"use client";

import React from "react";
import { useDisclosure, NavbarItem } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { setSessionStorageItem, useAsyncFn } from "@/hooks";
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
import { useApp, UserProps } from "@/providers/AppProvider";
import { toast } from "react-toastify";

const UserButton = () => {
  const t = useTranslations();
  const profileDisclosure = useDisclosure();
  const accountDisclosure = useDisclosure();

  const { mutate: signIn } = useAsyncFn(
    `${process.env.NEXT_PUBLIC_API_URL!}/user/login`,
    "POST",
    {},
    {
      onSuccess: (result: UserProps) => {
        const profile = {
          avatar: result.avatar,
          name: result.name,
          email: result.email,
        };
        setUser(profile);
        setSessionStorageItem("user", profile);
        accountDisclosure.onClose();
      },
    },
  );

  const { mutate: signUp } = useAsyncFn(
    "http://localhost:8888/CityTrip/native/user/register.php",
    "POST",
    {},
    {
      onSuccess: () => {
        accountDisclosure.onClose();
        toast.success("Your account has been successfully created!");
      },
    },
  );

  const { mutate: signout } = useAsyncFn(
    "http://localhost:8888/CityTrip/native/user/logout.php",
    "POST",
    {},
  );

  const { setUser, user, logout } = useApp();

  const handleSignin = React.useCallback(
    (form: { [k: string]: FormDataEntryValue }) => {
      signIn(form);
    },
    [] //eslint-disable-line
  );

  const handleSignup = React.useCallback(
    (form: { [k: string]: FormDataEntryValue }) => {
      signUp(form);
    },
    [] //eslint-disable-line
  );

  const handleSignout = React.useCallback(
    () => {
      signout();
      logout();
    },
    [] //eslint-disable-line
  );

  const handleUpdateProfile = React.useCallback((result: UserProps) => {
    const profile = {
      avatar: result.avatar,
      name: result.name,
      email: result.email,
    };
    setUser(profile);
    setSessionStorageItem("user", profile);
  }, []); //eslint-disable-line

  if (user) {
    return (
      <NavbarItem className="px-0">
        {profileDisclosure.isOpen && (
          <ProfileModal
            user={user}
            disclosure={profileDisclosure}
            onSubmit={handleUpdateProfile}
          />
        )}
        <Dropdown
          placement="bottom-end"
          radius="none"
          classNames={{
            base: "p-0 translate-x-[12px] translate-y-[-7px] font-roboto",
            content: "p-0 md:min-w-[220px] shadow-lg",
            trigger: [
              "flex-row-reverse",
              "md:min-w-[220px]",
              "md:max-w-[220px]",
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
                  base: "ring-offset-0 ring-primary max-w-8 max-h-8 min-w-8 min-h-8",
                },
              }}
              classNames={{
                wrapper: "overflow-hidden hidden md:block",
                name: "block font-roboto text-primary text-base font-bold truncate w-full",
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
            <DropdownItem
              key="logout"
              title={t("logout")}
              onPress={handleSignout}
            >
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
        <AccountModal
          disclosure={accountDisclosure}
          signIn={handleSignin}
          signUp={handleSignup}
        />
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
