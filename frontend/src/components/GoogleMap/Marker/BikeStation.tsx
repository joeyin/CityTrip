"use-client";

import React from "react";
import {
  MarkerF as BaseMarker,
  OverlayView,
  OverlayViewF,
} from "@react-google-maps/api";
import { IconBike } from "@images/icons";
import cx from "classnames";
import { Button } from "@components";
import { BikeStationProps } from "@/hooks";

const BikeStationMarker = (props: BikeStationProps) => {
  const markerRef = React.useRef<google.maps.Marker>();

  const [visible, setVisible] = React.useState<boolean | undefined>(false);

  const handelClick = React.useCallback(() => {
    if (props.onPress) {
      props.onPress(props);
    }
  }, []); //eslint-disable-line

  const position = React.useMemo(
    () => new google.maps.LatLng(props.lat, props.lon),
    [] //eslint-disable-line
  );

  const handelVisibleChanged = () => {
    setVisible(markerRef?.current?.getVisible());
  };

  const getPixelPositionOffset = React.useCallback(
    (width: number, height: number) => ({
      x: -(width / 2),
      y: -(height / 2) - 13,
    }),
    [],
  );

  return (
    <BaseMarker
      onLoad={(marker) => (markerRef.current = marker)}
      title={props.name}
      position={position}
      {...props}
      opacity={0}
      onVisibleChanged={handelVisibleChanged}
      onClick={handelClick}
      animation={undefined}
      noClustererRedraw
    >
      {visible && (
        <OverlayViewF
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          position={position}
          getPixelPositionOffset={getPixelPositionOffset}
        >
          <Button
            title={props.name}
            disableRipple={props.active}
            data-active={props.active}
            color="primary"
            radius="sm"
            onClick={handelClick}
            className={cx(
              "z-30",
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
                "bg-danger": !props.num_bikes_available || !props.status,
              },
            )}
          >
            <div className="h-full px-2 text-[13px] font-archivo font-light tracking-widest flex items-center justify-center flex-1 border-r-1 border-white border-opacity-10">
              <span>{props.num_bikes_available.toLocaleString()}</span>
              <span>/</span>
              <span>{props.capacity.toLocaleString()}</span>
            </div>
            <div className="w-[30px] flex justify-center">
              <IconBike
                className="w-[16px] h-[14px]"
                animation={props.active}
              />
            </div>
          </Button>
        </OverlayViewF>
      )}
    </BaseMarker>
  );
};

export default BikeStationMarker;
