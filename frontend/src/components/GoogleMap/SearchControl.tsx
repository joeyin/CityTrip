import React from "react";
// import { useGoogleMap } from "@react-google-maps/api";
import { SelectItem, Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { Device } from "@/constants";
import { Input, Select } from "@components";
import { IconFilter, IconLocation } from "@images/icons";

const LayerControl = () => {
  // const map: google.maps.Map | null = useGoogleMap();
  const t = useTranslations();
  // const handleClick = () => {
  //   map?.setZoom(16);
  // };

  return (
    <form
      method="POST"
      action="#"
      className="absolute top-[94px] min-w-80 rounded-md left-6 p-4 flex flex-col items-center gap-4 bg-white shadow-[0_0_10px_-1px_#ABABAB]"
    >
      <Input
        fullWidth
        icon={<IconLocation />}
        label={t("location")}
        placeholder={t("search-location")}
      />
      <Select
        fullWidth
        icon={<IconFilter />}
        label={t("filter")}
        selectionMode="multiple"
        defaultSelectedKeys={[Device.BIKE_STATION, Device.WATER_FOUNTAIN]}
        isDisabled
        className="w-"
      >
        {Object.keys(Device).map((item) => (
          <SelectItem key={Device[item as keyof typeof Device]}>
            {t(`devices.${Device[item as keyof typeof Device]}`)}
          </SelectItem>
        ))}
      </Select>
      <Button
        fullWidth
        className="rounded-md"
        color="primary"
        endContent={<i className="fa-solid fa-magnifying-glass" />}
        size="lg"
      >
        {t("search")}
      </Button>
      <div className="flex items-center text-xs self-end gap-2 text-gray-500">
        <i className="fa-regular fa-clock"></i>
        <span className="italic">
          {t("last-updated", { text: "08:58:58 PM" })}
        </span>
      </div>
    </form>
  );
};

export default LayerControl;
