import React from "react";
import { Key } from '@react-types/shared'
import { Tab } from "@nextui-org/react";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Tabs } from "@/components";
import { IconDirection, IconCancel } from "@images/icons";
import Overview from "./Overview";
import Reviews from "./Reviews";

export interface MarkerSidebarProps {
  visible?: boolean;
}

const MarkerSidebar = ({ visible }: MarkerSidebarProps) => {
  const [selectedKey, setSelectedKey] = React.useState<Key>("overview");

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
            "flex-col"
          )}
        >
          <div className="h-[52px] flex justify-between">
            <div className="flex">
              <Button
                title="Direction"
                isIconOnly
                radius="none"
                variant="light"
                className="shadow-none h-full min-w-[52px]"
              >
                <IconDirection />
              </Button>
              <Tabs
                aria-label="Tabs"
                color="default"
                variant="underlined"
                defaultSelectedKey={selectedKey}
                onSelectionChange={setSelectedKey}
                classNames={{
                  tabList:
                    "w-full h-full relative rounded-none p-0 border-divider",
                  cursor: "w-full",
                  tab: "max-w-fit px-4 h-full",
                  tabContent: "font-medium"
                }}
              >
                <Tab
                  key="overview"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Overview</span>
                    </div>
                  }
                />
                <Tab
                  key="reviews"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Reviews</span>
                    </div>
                  }
                />
              </Tabs>
            </div>
            <Button
              title="Close"
              isIconOnly
              radius="none"
              variant="light"
              className="shadow-none h-full min-w-[52px] bg-gray-50"
            >
              <IconCancel />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {selectedKey === "reviews" ? <Reviews /> : <Overview />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(MarkerSidebar);
