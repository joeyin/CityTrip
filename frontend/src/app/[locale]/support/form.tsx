import React from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Textarea } from "@nextui-org/react";

export default function Form() {
  const t = useTranslations();
  return (
    <form className="w-full max-w-xl p-6 mx-auto flex flex-col gap-6">
      <h2 className="text-secondary text-4xl font-medium font-inter">
        {t("get-in-touch")}
      </h2>
      <Input isRequired label={t("name")} />
      <Input isRequired label={t("email")} />
      <Textarea isRequired label={t("message")} />
      <Button color="secondary" className="rounded-md">
        {t("submit")}
      </Button>
    </form>
  );
}
