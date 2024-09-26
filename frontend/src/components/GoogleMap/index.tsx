"use client";

import React from "react";
import {
  GoogleMap as BaseGoogleMap,
  GoogleMapProps as BaseGoogleMapProps,
  useJsApiLoader,
  // useGoogleMap,
} from "@react-google-maps/api";
import GoogleMap from "./GoogleMap";

export interface GoogleMapProps extends BaseGoogleMapProps {
  backControl?: boolean;
  searchControl?: boolean;
}

const GoogleMapWrapper = ({ children, ...props }: GoogleMapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
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

export default GoogleMapWrapper;
