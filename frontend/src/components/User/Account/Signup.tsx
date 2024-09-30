import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Input } from "@/components";
import { ModalBody, ModalFooter } from "@nextui-org/react";
import { useTranslations } from "next-intl";

const SignupInner = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations();

  return (
    <form>
      <ModalBody>
        <Input
          name="name"
          variant="bordered"
          radius="md"
          label={t("name")}
          labelPlacement="outside"
          placeholder={t("enter-name")}
          classNames={{
            inputWrapper: "border border-gray-150",
          }}
          required
          isRequired
        />
        <Input
          name="email"
          type="email"
          variant="bordered"
          radius="md"
          label={t("email")}
          labelPlacement="outside"
          placeholder={t("enter-email")}
          classNames={{
            inputWrapper: "border border-gray-150",
          }}
          required
          isRequired
        />
        <Input
          name="password"
          type="password"
          variant="bordered"
          radius="md"
          label={t("password")}
          labelPlacement="outside"
          placeholder={t("enter-password")}
          classNames={{
            inputWrapper: "border border-gray-150",
          }}
          required
          isRequired
        />
        <Input
          name="confirm-password"
          type="password"
          variant="bordered"
          radius="md"
          label={t("confirm-password")}
          labelPlacement="outside"
          placeholder={t("enter-confirm-password")}
          classNames={{
            inputWrapper: "border border-gray-150",
          }}
          required
          isRequired
        />
      </ModalBody>
      <ModalFooter className="gap-5">
        <Button
          variant="bordered"
          color="danger"
          radius="md"
          size="md"
          onPress={onClose}
          className="w-28 text-base border-1"
        >
          {t("cancel")}
        </Button>
        <Button
          type="submit"
          color="primary"
          radius="md"
          size="md"
          className="w-28 text-base"
        >
          {t("sign-up")}
        </Button>
      </ModalFooter>
    </form>
  );
};

const Signup = ({
  onClose,
  disableAnimation = true,
}: {
  onClose: () => void;
  disableAnimation: boolean;
}) => {
  if (disableAnimation) {
    return <SignupInner onClose={onClose} />;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{
          x: 0,
        }}
        exit={{
          x: "-100%",
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
        className="right-0"
      >
        <SignupInner onClose={onClose} />
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(Signup);
