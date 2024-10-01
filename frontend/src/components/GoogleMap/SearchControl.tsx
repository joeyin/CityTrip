"use client";

import React from "react";
import { useGoogleMap, StandaloneSearchBox } from "@react-google-maps/api";
import { SelectItem } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { Device } from "@/constants";
import { AdvancedInput, AdvancedSelect, Button } from "@components";
import { IconFilter, IconLocation } from "@images/icons";
import moment from "moment";

export interface LayerControlProps {
  lastUpdated: number | undefined;
  onSubmit?: (props: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

const LayerControl = ({
  lastUpdated,
  onSubmit,
  isLoading,
}: LayerControlProps) => {
  const [place, setPlace] = React.useState<string>();
  const map: google.maps.Map | null = useGoogleMap();
  const placesSearchBoxRef = React.useRef<null | google.maps.places.SearchBox>(
    null,
  );
  const t = useTranslations();

  const onPlacesChanged = React.useCallback(() => {
    const placeSearch = placesSearchBoxRef.current;
    const places = placeSearch?.getPlaces();

    if (
      places &&
      places.length > 0 &&
      places[0]?.geometry?.location &&
      places[0]?.name
    ) {
      setPlace(places[0]?.name);
      map?.setCenter(places[0]?.geometry?.location.toJSON());
    }
  }, []); //eslint-disable-line

  const onSearchBoxLoad = React.useCallback(
    (searchBox: google.maps.places.SearchBox) => {
      placesSearchBoxRef.current = searchBox;
    },
    [],
  );

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPlace(e.target.value);
    },
    [],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form
      method="POST"
      action="#"
      className="absolute top-[94px] min-w-80 rounded-md left-6 p-4 flex flex-col items-center gap-4 bg-white shadow-default"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <StandaloneSearchBox
          onLoad={onSearchBoxLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <AdvancedInput
            color="default"
            radius="md"
            icon={<IconLocation />}
            label={t("location")}
            placeholder={t("search-location")}
            value={place || ""}
            isClearable
            onChange={onChange}
            onClear={() => setPlace("")}
            onKeyDown={() => {}}
          />
        </StandaloneSearchBox>
      </div>

      <AdvancedSelect
        fullWidth
        radius="md"
        icon={<IconFilter />}
        label={t("filter")}
        selectionMode="multiple"
        defaultSelectedKeys={[Device.BIKE_STATION, Device.WATER_FOUNTAIN]}
        // isDisabled
      >
        {Object.keys(Device).map((item) => (
          <SelectItem key={Device[item as keyof typeof Device]}>
            {t(`devices.${Device[item as keyof typeof Device]}`)}
          </SelectItem>
        ))}
      </AdvancedSelect>

      <Button
        fullWidth
        radius="md"
        color="primary"
        type="submit"
        isLoading={isLoading}
        isDisabled={isLoading}
        endContent={<i className="fa-solid fa-magnifying-glass" />}
        size="lg"
      >
        {t("search")}
      </Button>

      <div className="flex items-center text-xs self-end gap-2 text-gray-500">
        <i className="fa-regular fa-clock"></i>
        <span className="italic">
          {t("last-updated", { text: moment(lastUpdated).format("h:mm:ss A") })}
        </span>
      </div>
    </form>
  );
};

export default LayerControl;
