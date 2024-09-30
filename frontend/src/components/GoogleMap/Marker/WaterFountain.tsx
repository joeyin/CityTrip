"use client";

import React from "react";
import {
  Marker as BaseMarker,
  OverlayView,
  OverlayViewF,
} from "@react-google-maps/api";
import { IconWaterFountain } from "@images/icons";
import { ButtonProps } from "@nextui-org/react";
import cx from "classnames";
import { Button } from "@components";

export interface MarkerProps extends ButtonProps {
  position: google.maps.LatLng | google.maps.LatLngLiteral;
  string?: string | undefined;
  active?: boolean;
}

const WaterFountainMarker = ({
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
          color={active ? "warning" : "secondary"}
          radius="sm"
          className={cx(
            "shadow-default",
            "p-0",
            "gap-0",
            "data-[hover=true]:!opacity-100",
            "min-h-full",
            "min-w-full",
            "h-[29px]",
            "w-[30px]",
            "text-white",
            { "data-[hover=true]:bg-blue-400": !active },
          )}
          {...props}
        >
          <div className="w-[30px] flex justify-center">
            <IconWaterFountain className="w-[16px] h-[14px]" />
          </div>
        </Button>
      </OverlayViewF>
    </BaseMarker>
  );
};

export default WaterFountainMarker;
