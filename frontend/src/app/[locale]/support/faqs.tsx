"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function FAQs() {
  const t = useTranslations();

  return (
    <div className="w-full max-w-xl p-6 mx-auto flex flex-col gap-6">
      <h2 className="text-white text-4xl font-medium font-inter">{t("faq")}</h2>
      <Accordion
        fullWidth
        className="p-0"
        dividerProps={{
          className: "bg-blue-200",
        }}
        itemClasses={{
          trigger: "p-3",
          title: "font-medium text-white",
          content: "pl-3 py-4 text-white",
        }}
      >
        <AccordionItem key="1" title={t("FAQs.Q1.question")}>
          {t("FAQs.Q1.answer")}
        </AccordionItem>
        <AccordionItem key="2" title={t("FAQs.Q2.question")}>
          {t("FAQs.Q2.answer")}
        </AccordionItem>
        <AccordionItem key="3" title={t("FAQs.Q3.question")}>
          {t("FAQs.Q3.answer")}
        </AccordionItem>
        <AccordionItem key="4" title={t("FAQs.Q4.question")}>
          {t("FAQs.Q4.answer")}
        </AccordionItem>
        <AccordionItem key="5" title={t("FAQs.Q5.question")}>
          {t("FAQs.Q5.answer")}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
