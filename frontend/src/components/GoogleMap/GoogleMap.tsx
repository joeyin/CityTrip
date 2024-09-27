"use client";

import React from "react";
import {
  // GoogleMapProps as BaseGoogleMapProps,
  useGoogleMap,
} from "@react-google-maps/api";
import styled from "styled-components";
import { GoogleMapProps as BaseGoogleMapProps } from ".";
import BackControl from "./BackControl";

const GoogleMap = ({
  children,
  options: { gradientOverlay = true, backControl = true } = {},
}: BaseGoogleMapProps) => {
  const map: google.maps.Map | null = useGoogleMap();

  return (
    <>
      {children}
      {gradientOverlay && (
        <StyledGradientOverlay className="absolute bottom-0 h-32 w-full" />
      )}
      {backControl && <BackControl />}
    </>
  );
};

const StyledGradientOverlay = styled.div`
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

export default React.memo(GoogleMap);
