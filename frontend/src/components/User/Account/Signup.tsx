import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Input } from "@/components";
import { ModalBody, ModalFooter } from "@nextui-org/react";
import { useTranslations } from "next-intl";

const SignupInner = ({
  signUp,
  onClose,
}: {
  signUp: (form: { [k: string]: FormDataEntryValue }) => void;
  onClose: () => void;
}) => {
  const t = useTranslations();

  const handleSignup = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      signUp(Object.fromEntries(formData));
    },
    [] //eslint-disable-line
  );

  return (
    <form onSubmit={handleSignup}>
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
          required
          isRequired
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
          {t("sign-up")}
        </Button>
      </ModalFooter>
    </form>
  );
};

const Signup = ({
  signUp,
  onClose,
  disableAnimation = true,
}: {
  signUp: (form: { [k: string]: FormDataEntryValue }) => void;
  onClose: () => void;
  disableAnimation: boolean;
}) => {
  if (disableAnimation) {
    return <SignupInner signUp={signUp} onClose={onClose} />;
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
        <SignupInner signUp={signUp} onClose={onClose} />
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(Signup);
