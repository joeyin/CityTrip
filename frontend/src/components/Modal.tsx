"use client";

import React from "react";
import {
  Modal as BaseModal,
  extendVariants,
  ModalProps as BaseModalProps,
} from "@nextui-org/react";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import Button from "./Form/Button";
import { IconCancel } from "@images/icons";
import { useTranslations } from "next-intl";

export const VariantModal = extendVariants(BaseModal, {
  variants: {
    variant: {
      tab: {
        header: "p-0 h-[61px] !pr-0",
        closeButton: "top-0 right-0 p-0 min-w-fit min-h-fit z-20",
      },
      bordered: {
        header: "border-b border-gray-150",
      },
    },
    backdrop: {
      blur: {
        backdrop: "bg-modal-backdrop backdrop-blur-[1px]",
      },
    },
    radius: {
      sm: {
        wrapper: "rounded-sm",
      },
      md: {
        wrapper: "rounded-md",
      },
      lg: {
        wrapper: "rounded-lg",
      },
      xl: {
        wrapper: "rounded-xl",
      },
    },
    size: {
      xl: {
        header: "text-lg",
      },
    },
  },
});

export interface ModalProps extends BaseModalProps {
  variant?: "bordered" | "tab";
  disclosure: UseDisclosureReturn;
}

export const Modal = ({
  variant,
  children,
  disclosure,
  ...props
}: ModalProps) => {
  const t = useTranslations();

  return (
    <VariantModal
      {...props}
      isOpen={disclosure?.isOpen}
      onOpenChange={disclosure?.onOpenChange}
      classNames={{
        body: "pt-7 pb-3 gap-7",
        wrapper: "font-roboto",
        header: "font-normal pr-[61px]",
        closeButton:
          "top-0 right-0 w-[61px] h-[61px] rounded-none data-[focus-visible=true]:outline-offset-[-2px] customized-close-button data-[focus-visible=true]:outline-transparent",
      }}
      closeButton={
        <Button
          title={t("close")}
          // variant="light"
          variant="transparent"
          radius="none"
          shadow="none"
          isIconOnly
        >
          <IconCancel />
        </Button>
      }
      variant={variant}
      {...props}
    >
      {children}
    </VariantModal>
  );
};

export default React.memo(Modal);
