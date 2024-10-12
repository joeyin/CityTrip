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
import { BikeStationProps, useAsyncFn, WaterFountainProp } from "@/hooks";

export interface ReviewFormProps {
  disclosure: UseDisclosureReturn;
  refetch: () => void;
}

const ReviewForm = ({
  name,
  refetch,
  ...props
}: ReviewFormProps & (BikeStationProps | WaterFountainProp)) => {
  const t = useTranslations();

  const { mutate } = useAsyncFn(
    `${process.env.NEXT_PUBLIC_API_URL!}/reviews/${props.facility}-${props.station_id}`,
    "POST",
    {},
    {
      onSuccess: () => {
        props.disclosure.onClose();
        refetch();
      },
    },
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    mutate(Object.fromEntries(formData));
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
              {t("rate-the-facility", {
                facility: t(`facility.${props.facility}`),
                text: name,
              })}
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <Rate
                  name="rate"
                  label={t("rating")}
                  size="lg"
                  required
                  isRequired
                />
                <Textarea
                  name="comments"
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
