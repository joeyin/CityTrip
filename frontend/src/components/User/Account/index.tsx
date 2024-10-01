import React from "react";
import { Key } from "@react-types/shared";
import { Modal } from "@/components";
import Tabs from "@/components/Tabs";
import { ModalHeader, ModalContent, Tab } from "@nextui-org/react";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import { useTranslations } from "next-intl";
import Signin from "./Signin";
import Signup from "./Signup";

export interface AccountModalProps {
  disclosure: UseDisclosureReturn;
}

const AccountModal = ({ disclosure }: AccountModalProps) => {
  const t = useTranslations();
  const [selectedKey, setSelectedKey] = React.useState<Key>("signin");
  const [disableAnimation, setDisableAnimation] = React.useState(true);

  const handleSelectionChange = React.useCallback((key: Key) => {
    setSelectedKey(key);
    setDisableAnimation(false);
  }, []);

  React.useEffect(() => {
    if (!disclosure.isOpen) {
      setSelectedKey("signin");
      setDisableAnimation(true);
    }
  }, [disclosure.isOpen]);

  return (
    <Modal
      backdrop="blur"
      size="xl"
      radius="sm"
      variant="tab"
      disclosure={disclosure}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <Tabs
                fullWidth
                size="lg"
                aria-label="Tabs"
                color="primary"
                variant="underlined"
                className="relative after:content-[''] after:w-full after:h-[1px] after:bg-gray-150 after:bottom-0 after:absolute after:-z-10"
                classNames={{
                  tabList:
                    "w-full h-full relative rounded-none p-0 border-divider gap-0",
                  cursor: "w-full h-[1px]",
                  tab: "max-w-fit px-9 py-[1.1rem] h-full",
                  tabContent: "font-medium",
                }}
                defaultSelectedKey={selectedKey}
                onSelectionChange={handleSelectionChange}
              >
                <Tab
                  key="signin"
                  titleValue={t("sign-in")}
                  className="data-[focus=true]:outline-offset-[-2px]"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>{t("sign-in")}</span>
                    </div>
                  }
                />
                <Tab
                  key="signup"
                  titleValue={t("sign-up")}
                  className="data-[focus=true]:outline-offset-[-2px]"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>{t("sign-up")}</span>
                    </div>
                  }
                />
              </Tabs>
            </ModalHeader>
            {selectedKey === "signup" ? (
              <Signup onClose={onClose} disableAnimation={disableAnimation} />
            ) : (
              <Signin onClose={onClose} disableAnimation={disableAnimation} />
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default React.memo(AccountModal);
