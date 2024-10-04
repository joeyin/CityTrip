import React from "react";
import { Button, Modal, Input } from "@/components";
import { UserProps } from "@/providers/AppProvider";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";

export interface ProfileFormProps {
  user: UserProps;
  disclosure: UseDisclosureReturn;
}

const ProfileForm = ({ user, disclosure }: ProfileFormProps) => {
  const t = useTranslations();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(Object.fromEntries(formData));
  };

  return (
    <Modal
      backdrop="blur"
      size="lg"
      variant="bordered"
      radius="sm"
      disclosure={disclosure}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{t("profile")}</ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <Input
                  name="name"
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
                  name="email"
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
                  defaultValue={user?.email}
                  isDisabled
                  disabled
                />
                <Input
                  name="password"
                  type="password"
                  variant="bordered"
                  radius="md"
                  size="lg"
                  label={t("password")}
                  labelPlacement="outside"
                  placeholder={t("enter-password")}
                  classNames={{
                    inputWrapper: "border border-gray-150",
                  }}
                  required
                  isRequired
                  autoComplete="off"
                />
                <Input
                  name="confirm-password"
                  type="password"
                  variant="bordered"
                  radius="md"
                  size="lg"
                  label={t("confirm-password")}
                  labelPlacement="outside"
                  placeholder={t("enter-confirm-password")}
                  classNames={{
                    inputWrapper: "border border-gray-150",
                  }}
                  required
                  isRequired
                  autoComplete="off"
                />
              </ModalBody>
              <ModalFooter className="gap-5">
                <Button
                  variant="bordered"
                  color="danger"
                  radius="md"
                  size="lg"
                  onPress={onClose}
                >
                  {t("cancel")}
                </Button>
                <Button type="submit" color="primary" radius="md" size="lg">
                  {t("submit")}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default React.memo(ProfileForm);
