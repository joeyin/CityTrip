"use client";

import React from "react";
import {
  Marker as BaseMarker,
  OverlayView,
  OverlayViewF,
} from "@react-google-maps/api";
import { IconBike } from "@images/icons";
import { ButtonProps } from "@nextui-org/react";
import cx from "classnames";
import Button from "../Button";

export interface MarkerProps extends ButtonProps {
  position: google.maps.LatLng | google.maps.LatLngLiteral;
  string?: string | undefined;
  active?: boolean;
}

const BikeStationMarker = ({
  title,
  position,
  active,
  ...props
}: MarkerProps) => {
  return (
    <BaseMarker title={title} position={position} opacity={0}>
      <OverlayViewF
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        position={position}
      >
        <Button
          disableRipple={active}
          color={active ? "warning" : "primary"}
          radius="sm"
          className={cx(
            "shadow-default",
            "p-0",
            "gap-0",
            "data-[hover=true]:!opacity-100",
            "min-h-full",
            "min-w-full",
            "h-[29px]",
            "w-[69px]",
            "text-white",
            { "data-[hover=true]:bg-green-400": !active },
          )}
          {...props}
        >
          <div className="h-full text-[13px] font-archivo font-light tracking-widest flex items-center justify-center flex-1 border-r-1 border-white border-opacity-10">
            2/7
          </div>
          <div className="w-[30px] flex justify-center">
            <IconBike className="w-[16px] h-[14px]" />
          </div>
        </Button>
      </OverlayViewF>
    </BaseMarker>
  );
};

export default BikeStationMarker;
