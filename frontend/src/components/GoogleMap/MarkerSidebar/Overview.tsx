"use client";

import React from "react";
import { IconStar } from "@images/icons";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@nextui-org/react";
import { BikeStationProps } from "@/hooks";
import moment from "moment";

const Overview = ({
  name,
  status,
  rating,
  address,
  lat,
  lon,
  is_charging_station,
  capacity,
  rental_methods,
  num_bikes_available_types,
  num_docks_available,
  last_reported,
}: BikeStationProps) => {
  const t = useTranslations();
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
        <div className="py-6 px-5 flex flex-col gap-4 border-t-1 border-gray-200">
          <div className="flex flex-col gap-1">
            <div className="text-xs font-bold">{t("name")}:</div>
            <div className="text-[13px] font-light">{name}</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs font-bold">{t("status")}:</div>
            <div className="text-[13px] font-light">{t(status)}</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs font-bold">{t("rating")}:</div>
            <div className="text-[13px] font-light flex gap-0.5">
              {Array.from({ length: 5 }).map((_, index) =>
                (rating || 0) > index ? (
                  <IconStar key={index} className="text-primary" />
                ) : (
                  <IconStar key={index} className="text-gray-200" />
                ),
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs font-bold">{t("address")}:</div>
            <Link
              isExternal
              title={name}
              color="foreground"
              underline="hover"
              className="text-[13px] font-light text-black"
              target="_blank"
              href={`https://maps.google.com/?q=${lat},${lon}`}
            >
              {address}
            </Link>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs font-bold">{t("charging-station")}:</div>
            <div className="text-[13px] font-light">
              {is_charging_station ? t("yes") : t("no")}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs font-bold">{t("capacity")}:</div>
            <div className="text-[13px] font-light">
              {capacity?.toLocaleString()}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs font-bold">{t("rental-method")}:</div>
            <div className="text-[13px] font-light">
              {rental_methods.map((i) => t(i)).join(", ")}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs font-bold">
              {t("available-mechanical-bikes")}:
            </div>
            <div className="text-[13px] font-light">
              {num_bikes_available_types?.mechanical?.toLocaleString()}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs font-bold">{t("available-ebikes")}:</div>
            <div className="text-[13px] font-light">
              {num_bikes_available_types?.ebike?.toLocaleString()}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs font-bold">{t("available-docks")}:</div>
            <div className="text-[13px] font-light">
              {num_docks_available?.toLocaleString()}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs font-bold">{t("last-reported")}:</div>
            <div className="text-[13px] font-light">
              {moment(last_reported * 1000).format("MMMM D, YYYY h:mm:ss A")}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(Overview);
