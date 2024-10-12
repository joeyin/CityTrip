"use client";

import React from "react";
import {
  GoogleMap as BaseGoogleMap,
  GoogleMapProps as BaseGoogleMapProps,
  useJsApiLoader,
  Libraries,
} from "@react-google-maps/api";
import { ButtonProps, Spinner } from "@nextui-org/react";
import GoogleMapInner from "./GoogleMap";
import { Facility } from "@/constants";
import { BikeStationProps } from "@/hooks";
import { useTranslations } from "next-intl";

export interface BaseGoogleMapOptionsProps extends google.maps.MapOptions {
  backControl?: boolean;
  backControlOptions?: ButtonProps;
  gradientOverlay?: boolean;
}

export interface GoogleMapProps
  extends Omit<BaseGoogleMapProps, "options" | "children"> {
  children:
    | ((map?: google.maps.Map) => React.ReactNode)
    | React.ReactNode
    | undefined;
  options?: BaseGoogleMapOptionsProps | undefined;
  defaultCenter?: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
  defaultZoom?: number;
}

export interface MarkerProps extends Omit<ButtonProps, "onClick"> {
  facility: Facility;
  position: google.maps.LatLng | google.maps.LatLngLiteral;
  active?: boolean;
  onClick?: (props: MarkerProps | undefined) => void;
  marker?: BikeStationProps;
}

const GoogleMapWrapper = ({ children, ...props }: GoogleMapProps) => {
  const t = useTranslations();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
    libraries: React.useMemo<Libraries>(() => ["places"], []),
    version: "3.55",
  });

  const center =
    props.center?.lat && props.center?.lng ? props.center : props.defaultCenter;

  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner label={t("loading")} color="primary" labelColor="primary" />
      </div>
    );
  }

  return (
    <BaseGoogleMap {...props} center={center}>
      <GoogleMapInner {...props}>{children}</GoogleMapInner>
    </BaseGoogleMap>
  );
};

export default React.memo(GoogleMapWrapper);

export { default as GoogleMap } from ".";
export { default as BackControl } from "./BackControl";
export { default as SearchControl } from "./SearchControl";
export { default as BikeStationMarker } from "./Marker/BikeStation";
export { default as WaterFountainMarker } from "./Marker/WaterFountain";
export { default as MarkerSidebar } from "./MarkerSidebar/index";
