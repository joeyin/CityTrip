"use client";

import React from "react";
import {
  Marker as BaseMarker,
  OverlayView,
  OverlayViewF,
  useGoogleMap,
} from "@react-google-maps/api";
import { IconBike } from "@images/icons";
import cx from "classnames";
import { Button } from "@components";
import { BikeStationProps } from "@/hooks";

const BikeStationMarker = ({
  onClick = () => {},
  ...props
}: BikeStationProps) => {
  const map: google.maps.Map | null = useGoogleMap();
  const handelClick = React.useCallback(() => {
    onClick(props);
    map?.panTo(new google.maps.LatLng(props.lat, props.lon));
  }, []); //eslint-disable-line

  const position = React.useMemo(
    () => new google.maps.LatLng(props.lat, props.lon),
    [], //eslint-disable-line
  );

  return (
    <BaseMarker title={props.name} position={position} opacity={0}>
      <OverlayViewF
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        position={position}
      >
        <Button
          title={props.name}
          disableRipple={props.active}
          color="primary"
          radius="sm"
          onClick={handelClick}
          data-active={props.active}
          className={cx(
            "p-0",
            "gap-0",
            "min-h-full",
            "min-w-full",
            "h-[29px]",
            "data-[hover=true]:!opacity-100",
            "data-[hover=true]:z-50",
            "data-[hover=true]:scale-110",
            "data-[hover=true]:bg-green-400",
            "data-[active=true]:z-40",
            "data-[active=true]:bg-warning",
            "font-arial",
            {
              "bg-danger": !props.num_bikes_available,
              // "opacity-75": !props.num_bikes_available,
            },
          )}
          {...props}
        >
          <div className="h-full px-2 text-[13px] font-archivo font-light tracking-widest flex items-center justify-center flex-1 border-r-1 border-white border-opacity-10">
            <span>{props.num_bikes_available.toLocaleString()}</span>
            <span>/</span>
            <span>{props.capacity.toLocaleString()}</span>
          </div>
          <div className="w-[30px] flex justify-center">
            <IconBike className="w-[16px] h-[14px]" animation={props.active} />
          </div>
        </Button>
      </OverlayViewF>
    </BaseMarker>
  );
};

export default React.memo(BikeStationMarker);
