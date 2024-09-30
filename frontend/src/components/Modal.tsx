"use client";

import {
  Modal as BaseModal,
  extendVariants,
  ModalProps as BaseModalProps,
} from "@nextui-org/react";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import Button from "./Form/Button";
import { IconCancel } from "@images/icons";
import React from "react";

export const VariantModal = extendVariants(BaseModal, {
  variants: {
    variant: {
      tab: {
        body: "pt-7 pb-3 gap-7",
        header: "p-0 h-[55px]",
        closeButton:
          "top-0 right-0 p-0 w-[55px] h-[55px] min-w-fit min-h-fit rounded-none z-20 data-[focus-visible=true]:outline-offset-[-2px]",
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
  return (
    <VariantModal
      {...props}
      isOpen={disclosure.isOpen}
      onOpenChange={disclosure.onOpenChange}
      classNames={{
        header: "font-roboto font-normal",
        body: "font-roboto",
        footer: "font-roboto test",
      }}
      closeButton={
        <Button
          isIconOnly
          variant="transparent"
          radius="none"
          shadow="none"
          className="p-20"
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
