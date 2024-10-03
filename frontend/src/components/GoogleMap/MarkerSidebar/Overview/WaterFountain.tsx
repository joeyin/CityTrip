"use client";

import React from "react";
import { IconStar } from "@images/icons";
import { useTranslations } from "next-intl";
import { Link } from "@nextui-org/react";
import { WaterFountainProp } from "@/hooks";

const WaterFountain = ({
  name,
  status,
  status_text,
  reason,
  rating,
  address,
  lat,
  lon,
  type,
  location,
}: WaterFountainProp) => {
  const t = useTranslations();
  return (
    <div className="py-6 px-5 flex flex-col gap-4 border-t-1 border-gray-200">
      <div className="flex flex-col gap-1">
        <div className="text-xs font-bold">{t("name")}:</div>
        <div className="text-[13px] font-light">{name}</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs font-bold">{t("status")}:</div>
        <div className="text-[13px] font-light">{t(status_text)}</div>
      </div>
      {!status && (
        <div className="flex flex-col gap-1">
          <div className="text-xs font-bold">{t("reason")}:</div>
          <div className="text-[13px] font-light">{reason}</div>
        </div>
      )}
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
        <div className="text-xs font-bold">{t("type")}:</div>
        <div className="text-[13px] font-light">
          {type.map((i) => t(i)).join(", ")}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs font-bold">{t("location")}:</div>
        <div className="text-[13px] font-light">{location}</div>
      </div>
    </div>
  );
};

export default React.memo(WaterFountain);
