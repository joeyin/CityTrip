"use client";

import React from "react";
import {
  GoogleMap as BaseGoogleMap,
  GoogleMapProps as BaseGoogleMapProps,
  useJsApiLoader,
  Libraries,
} from "@react-google-maps/api";
import GoogleMap from "./GoogleMap";

interface BaseGoogleMapOptionsProps extends google.maps.MapOptions {
  backControl?: boolean;
  gradientOverlay?: boolean;
}

export interface GoogleMapProps extends Omit<BaseGoogleMapProps, "options"> {
  options?: BaseGoogleMapOptionsProps | undefined;
}

const GoogleMapWrapper = ({ children, ...props }: GoogleMapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
    libraries: React.useMemo<Libraries>(() => ["places"], []),
    version: "3.55"
  });

  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading
      </div>
    );
  }

  return (
    <BaseGoogleMap {...props}>
      <GoogleMap {...props}>{children}</GoogleMap>
    </BaseGoogleMap>
  );
};

export default React.memo(GoogleMapWrapper);

export { default as GoogleMap } from ".";
export { default as BackControl } from "./BackControl";
export { default as SearchControl } from "./SearchControl";
export { default as BikeStationMarker } from "./BikeStationMarker";
export { default as WaterFountainMarker } from "./WaterFountainMarker";
export { default as MarkerSidebar } from "./MarkerSidebar/index";