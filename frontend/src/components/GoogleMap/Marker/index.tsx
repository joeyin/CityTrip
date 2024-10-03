"use client";

import React from "react";
import { useGoogleMap } from "@react-google-maps/api";
import { BikeStationProps, WaterFountainProp } from "@/hooks";
import { Facility } from "@/constants";
import BikeStationMarker from "./BikeStation";
import WaterFountainMarker from "./WaterFountain";

const Marker = <T extends BikeStationProps | WaterFountainProp>(props: T) => {
  const map: google.maps.Map | null = useGoogleMap();

  const handleClick = React.useCallback(() => {
    if (props.onPress) {
      props.onPress(props);
    }

    map?.panTo(new google.maps.LatLng(props.lat, props.lon));
  }, [props, map]);

  return props.facility === Facility.BIKE_STATION ? (
    <BikeStationMarker onPress={handleClick} {...(props as BikeStationProps)} />
  ) : (
    <WaterFountainMarker
      onPress={handleClick}
      {...(props as WaterFountainProp)}
    />
  );
};

export default React.memo(Marker);
