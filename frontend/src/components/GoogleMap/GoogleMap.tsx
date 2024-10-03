"use client";

import React from "react";
import styled from "styled-components";
import { GoogleMapProps as BaseGoogleMapProps } from ".";
import BackControl from "./BackControl";
import { useGoogleMap } from "@react-google-maps/api";

const GoogleMap = ({
  children,
  options: {
    gradientOverlay = true,
    backControl = true,
    backControlOptions,
  } = {},
}: BaseGoogleMapProps) => {
  const map: google.maps.Map | null = useGoogleMap();

  return (
    <>
      {typeof children === "function" ? children(map || undefined) : children}
      {gradientOverlay && (
        <StyledGradientOverlay className="absolute bottom-0 h-16 w-full" />
      )}
      {backControl && <BackControl {...backControlOptions} />}
    </>
  );
};

const StyledGradientOverlay = styled.div`
  background: linear-gradient(
      rgb(255 255 255 / 0%) 0%,
      rgb(255 255 255 / 10%) 15%,
      rgb(255 255 255 / 25%) 25%,
      rgb(255 255 255 / 60%) 45%,
      rgb(255 255 255 / 100%) 65%,
      rgb(255 255 255) 100%
    )
    no-repeat;
`;

export default React.memo(GoogleMap);
