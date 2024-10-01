import React from "react";
import { Button, Modal, Textarea, Rate } from "@/components";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import { BikeStationProps } from "@/hooks";

export interface ReviewFormProps extends BikeStationProps {
  disclosure: UseDisclosureReturn;
}

const ReviewForm = ({ name, ...props }: ReviewFormProps) => {
  const t = useTranslations();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(Object.fromEntries(formData));
  };

  return (
    <Modal
      backdrop="blur"
      size="xl"
      variant="bordered"
      radius="sm"
      disclosure={props.disclosure}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              {t("rate-the-bike-station-at", { text: name })}
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <Rate name="rating" label="Rating" size="lg" required />
                <Textarea
                  name="message"
                  variant="bordered"
                  radius="md"
                  size="lg"
                  label={t("message")}
                  labelPlacement="outside"
                  placeholder="Enter your message"
                  classNames={{
                    inputWrapper: "border border-gray-150",
                  }}
                  required
                  isRequired
                  minRows={6}
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

export default React.memo(ReviewForm);
