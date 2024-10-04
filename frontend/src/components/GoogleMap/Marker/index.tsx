"use client";

import React from "react";
import { useGoogleMap } from "@react-google-maps/api";
import { BikeStationProps, WaterFountainProp, useIsMobile } from "@/hooks";
import { Facility } from "@/constants";
import BikeStationMarker from "./BikeStation";
import WaterFountainMarker from "./WaterFountain";

const Marker = <T extends BikeStationProps | WaterFountainProp>(props: T) => {
  const isMobile = useIsMobile();
  const map: google.maps.Map | null = useGoogleMap();

  const pointOffset = (
    latlng: google.maps.LatLng,
    offsetX: number,
    offsetY: number,
  ): google.maps.LatLng | null => {
    let newLatLng: google.maps.LatLng | null | undefined = null;
    const zoomFactor: number = Math.pow(2, map?.getZoom() || 15);
    const point1: google.maps.Point | null | undefined = map
      ?.getProjection()
      ?.fromLatLngToPoint(latlng);
    const point2: google.maps.Point | null | undefined = new google.maps.Point(
      offsetX / zoomFactor,
      offsetY / zoomFactor,
    );
    if (point1) {
      newLatLng = map
        ?.getProjection()
        ?.fromPointToLatLng(
          new google.maps.Point(point1.x - point2.x, point1.y + point2.y),
        );
    }
    return newLatLng || null;
  };

  const handleClick = React.useCallback(() => {
    if (props.onPress) {
      props.onPress(props);
    }
    const isMobileDevice = isMobile();
    const newPoint = pointOffset(
      new google.maps.LatLng(props.lat, props.lon),
      isMobileDevice ? 0 : -311 / 2,
      isMobileDevice ? (window.innerHeight - 64) / 1.5 / 2 : 0,
    );
    if (newPoint) {
      map?.panTo(newPoint);
    }
  }, []); //eslint-disable-line

  return props.facility === Facility.BIKE_STATION ? (
    <BikeStationMarker {...(props as BikeStationProps)} onPress={handleClick} />
  ) : (
    <WaterFountainMarker
      {...(props as WaterFountainProp)}
      onPress={handleClick}
    />
  );
};

export default React.memo(Marker);
