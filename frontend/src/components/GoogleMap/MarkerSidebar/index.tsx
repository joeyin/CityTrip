import React from "react";
import { Key } from "@react-types/shared";
import { Tab } from "@nextui-org/react";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Tabs } from "@/components";
import { IconDirection, IconCancel } from "@images/icons";
import { useTranslations } from "next-intl";
import Overview from "./Overview";
import Reviews from "./Reviews/index";
import { BikeStationProps, GeolocationProps } from "@/hooks";

export interface MarkerSidebarProps {
  visible?: boolean;
  marker?: BikeStationProps;
  geolocation?: GeolocationProps;
  onCancel?: () => void;
}

const MarkerSidebar = ({
  visible,
  marker,
  geolocation,
  onCancel,
}: MarkerSidebarProps) => {
  const t = useTranslations();
  const [selectedKey, setSelectedKey] = React.useState<Key>("overview");

  React.useEffect(() => {
    if (!visible) {
      setSelectedKey("overview");
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{
            x: 0,
          }}
          exit={{
            x: "100%",
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.6 }}
          className={cx(
            "fixed",
            "h-full",
            "bg-white",
            "z-30",
            "right-0",
            "pt-16",
            "shadow-lg",
            "w-[311px]",
            "flex",
            "flex-col",
          )}
        >
          <div className="h-[52px] flex justify-between">
            <div className="flex">
              <Button
                as="a"
                shadow="none"
                title="Direction"
                isIconOnly
                isDisabled={!(geolocation?.latitude && geolocation?.longitude)}
                radius="none"
                variant="light"
                className="h-full min-w-[52px] text-gray-500 data-[hover=true]:text-black data-[focus-visible=true]:outline-offset-[-2px]"
                target="_blank"
                href={`https://www.google.com/maps/dir/?api=1&origin=${geolocation?.latitude},${geolocation?.longitude}&destination=${marker?.lat},${marker?.lon}`}
              >
                <IconDirection />
              </Button>
              <Tabs
                aria-label="Tabs"
                color="default"
                variant="underlined"
                selectedKey={selectedKey}
                onSelectionChange={setSelectedKey}
                classNames={{
                  tabList:
                    "w-full h-full relative rounded-none p-0 border-divider",
                  cursor: "w-full",
                  tab: "max-w-fit px-4 h-full",
                  tabContent: "font-medium",
                }}
              >
                <Tab
                  key="overview"
                  titleValue={t("overview")}
                  className="font-inter data-[focus=true]:outline-offset-[-2px]"
                  title={t("overview")}
                />
                <Tab
                  key="reviews"
                  titleValue={t("reviews")}
                  className="font-inter data-[focus=true]:outline-offset-[-2px]"
                  title={t("reviews")}
                />
              </Tabs>
            </div>
            <Button
              shadow="none"
              title="Close"
              isIconOnly
              radius="none"
              variant="light"
              className="h-full min-w-[52px] bg-gray-50 text-gray-500 data-[hover=true]:text-black data-[focus-visible=true]:outline-offset-[-2px]"
              onPress={onCancel}
            >
              <IconCancel />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {marker &&
              (selectedKey === "reviews" ? (
                <Reviews {...marker} />
              ) : (
                <Overview {...marker} />
              ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(MarkerSidebar);
