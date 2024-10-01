import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Input } from "@/components";
import { ModalBody, ModalFooter } from "@nextui-org/react";
import { useTranslations } from "next-intl";

const SigninInner = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations();

  return (
    <form>
      <ModalBody>
        <Input
          name="email"
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
        />
        <Input
          name="password"
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
          {t("sign-in")}
        </Button>
      </ModalFooter>
    </form>
  );
};

const Signin = ({
  onClose,
  disableAnimation = true,
}: {
  onClose: () => void;
  disableAnimation: boolean;
}) => {
  if (disableAnimation) {
    return <SigninInner onClose={onClose} />;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{
          x: 0,
        }}
        exit={{
          x: "100%",
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
        className="right-0"
      >
        <SigninInner onClose={onClose} />
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(Signin);
