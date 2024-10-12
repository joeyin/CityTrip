import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Input } from "@/components";
import { ModalBody, ModalFooter } from "@nextui-org/react";
import { useTranslations } from "next-intl";

const SigninInner = ({
  signIn,
  onClose,
}: {
  signIn: (form: { [k: string]: FormDataEntryValue }) => void;
  onClose: () => void;
}) => {
  const t = useTranslations();

  const handleSignin = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      signIn(Object.fromEntries(formData));
    },
    [] //eslint-disable-line
  );

  return (
    <form onSubmit={handleSignin}>
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
  signIn,
  onClose,
  disableAnimation = true,
}: {
  signIn: (form: { [k: string]: FormDataEntryValue }) => void;
  onClose: () => void;
  disableAnimation: boolean;
}) => {
  if (disableAnimation) {
    return <SigninInner signIn={signIn} onClose={onClose} />;
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
        <SigninInner signIn={signIn} onClose={onClose} />
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(Signin);
