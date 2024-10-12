"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Textarea } from "@/components";

export default function Form() {
  const t = useTranslations();
  return (
    <form
      className="w-full max-w-xl p-6 mx-auto flex flex-col gap-6"
      method="POST"
      action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdlPpkyle4Fcb04dTpmRjYiTJclOqug4pae-0ObGDUFSK-iRQ/formResponse"
    >
      <h2 className="text-secondary text-4xl font-medium font-inter">
        {t("get-in-touch")}
      </h2>

      <Input
        name="entry.376314503"
        variant="bordered"
        radius="md"
        size="lg"
        label={t("name")}
        labelPlacement="outside"
        placeholder={t("enter-name")}
        classNames={{
          inputWrapper: "border border-gray-150",
        }}
        required
        isRequired
        autoComplete="off"
      />

      <Input
        name="entry.1819623265"
        type="email"
        variant="bordered"
        radius="md"
        size="lg"
        label={t("email")}
        labelPlacement="outside"
        placeholder={t("enter-email")}
        classNames={{
          inputWrapper: "border border-gray-150",
        }}
        required
        isRequired
        autoComplete="off"
      />

      <Textarea
        name="entry.1255525543"
        variant="bordered"
        radius="md"
        size="lg"
        label={t("message")}
        labelPlacement="outside"
        classNames={{
          inputWrapper: "border border-gray-150",
        }}
        required
        isRequired
        minRows={6}
      />

      <Button
        type="submit"
        color="secondary"
        radius="md"
        size="lg"
        className="text-white"
      >
        {t("submit")}
      </Button>
    </form>
  );
}
