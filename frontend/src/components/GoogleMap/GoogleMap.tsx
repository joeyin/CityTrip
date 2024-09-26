"use client";

import React from "react";
import {
  GoogleMapProps as BaseGoogleMapProps,
  useGoogleMap,
} from "@react-google-maps/api";
import styled from "styled-components";
import BackControl from "./BackControl";
import SearchControl from "./SearchControl";

export interface GoogleMapProps extends BaseGoogleMapProps {
  backControl?: boolean;
  searchControl?: boolean;
}

const GoogleMap = ({
  children,
  backControl = true,
  searchControl = true,
}: GoogleMapProps) => {
  const map: google.maps.Map | null = useGoogleMap();

  const handleMapClick = () => {
    map?.setZoom(16);
  };

  return (
    <>
      {children}
      <MapGradient className="absolute bottom-0 h-32 w-full" />
      {searchControl && <SearchControl />}
      {backControl && <BackControl onClick={handleMapClick} />}
    </>
  );
};

const MapGradient = styled.div`
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.15) 15%,
      rgba(255, 255, 255, 0.68) 45%,
      rgb(255 255 255) 68%,
      rgba(255, 255, 255, 1) 100%
    )
    no-repeat;
`;

export default GoogleMap;
