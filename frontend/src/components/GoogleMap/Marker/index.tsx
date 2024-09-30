"use client";

import React from "react";
import { useGoogleMap } from "@react-google-maps/api";
import { BikeStationProps } from "@/hooks";
import { Device } from "@/constants";
import BikeStation from "./BikeStation";
// import WaterFountain from "./WaterFountain";

const Marker = (props: BikeStationProps) => {
  const map: google.maps.Map | null = useGoogleMap();
  const handelClick = React.useCallback(() => {
    if (props.onClick) {
      props.onClick(props);
    }
    map?.panTo(new google.maps.LatLng(props.lat, props.lon));
  }, []); //eslint-disable-line

  return props.device === Device.BIKE_STATION ? (
    <BikeStation {...props} onClick={handelClick} />
  ) : (
    <div></div>
  );
};

export default React.memo(Marker);
