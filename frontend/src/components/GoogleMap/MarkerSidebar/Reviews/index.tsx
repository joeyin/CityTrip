import React from "react";
import { Button } from "@/components";
import { Image, Skeleton, useDisclosure } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import useSWR from "swr";
import { BikeStationProps, WaterFountainProp } from "@/hooks";
import ReviewForm from "./Form";

const Reviews = (props: BikeStationProps | WaterFountainProp) => {
  const t = useTranslations();
  const disclosure = useDisclosure();
  const { data, isLoading } = useSWR<{ name: string; body: string }[]>({
    url: `https://jsonplaceholder.typicode.com/posts/100/comments#id=${props.station_id}`,
  });

  return (
    <>
      <ReviewForm disclosure={disclosure} {...props} />
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
          className="right-0 "
        >
          <Button
            fullWidth
            color="primary"
            size="lg"
            radius="none"
            className="h-[52px] text-base	font-roboto sticky top-0 z-20 data-[hover=true]:bg-green-400 data-[hover=true]:!opacity-100"
            onPress={disclosure.onOpen}
          >
            {t("write-a-review")}
          </Button>

          <div className="[&>*:not(:last-child)]:border-b-1 border-gray-200">
            {isLoading
              ? Array.from({ length: 5 }).map((item, index) => (
                  <div
                    key={index}
                    className="w-full flex items-center gap-5 py-4 px-3.5"
                  >
                    <div>
                      <Skeleton className="flex rounded-full w-[42px] h-[42px]" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <Skeleton className="h-4 w-4/5 rounded-lg" />
                      <Skeleton className="h-3 w-2/5 rounded-lg" />
                      <Skeleton className="h-3.5 w-5/5 rounded-lg" />
                      <Skeleton className="h-3.5 w-5/5 rounded-lg" />
                      <Skeleton className="h-3.5 w-4/5 rounded-lg" />
                    </div>
                  </div>
                ))
              : data?.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col py-4 px-3.5 transition-all duration-500 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-5">
                      <Image
                        loading="lazy"
                        shadow="none"
                        width={42}
                        height={42}
                        radius="full"
                        classNames={{
                          wrapper: "min-w-[42px] min-h-[42px]",
                          img: "object-cover border-2 border-primary",
                        }}
                        src="https://images.unsplash.com/photo-1645378999496-33c8c2afe38d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                      <div className="flex flex-col font-inter gap-1">
                        <div className="text-sm font-semibold">{item.name}</div>
                        <div className="text-[12px] font-normal italic">
                          September 24, 2024 17:21:26
                        </div>
                        <div className="text-xs font-light">{item.body}</div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default React.memo(Reviews);
