"use client";

import React from "react";
import {
  Marker as BaseMarker,
  OverlayView,
  OverlayViewF,
} from "@react-google-maps/api";
import { IconCup } from "@images/icons";
import cx from "classnames";
import { Button } from "@components";
import { WaterFountainProp } from "@/hooks";

const WaterFountainMarker = (props: WaterFountainProp) => {
  const handelClick = React.useCallback(() => {
    if (props.onPress) {
      props.onPress(props);
    }
  }, []); //eslint-disable-line

  const position = React.useMemo(
    () => new google.maps.LatLng(props.lat, props.lon),
    [] //eslint-disable-line
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
          data-active={props.active}
          color={props.active ? "warning" : "secondary"}
          radius="sm"
          onClick={handelClick}
          className={cx(
            "p-0",
            "gap-0",
            "min-h-full",
            "min-w-full",
            "h-[29px]",
            "w-[30px]",
            "data-[hover=true]:!opacity-100",
            "data-[hover=true]:z-50",
            "data-[hover=true]:scale-110",
            "data-[hover=true]:bg-blue-400",
            "data-[active=true]:z-40",
            "data-[active=true]:bg-warning",
            "text-white",
            {
              "bg-danger": !props.status,
            },
          )}
        >
          <div className="w-[30px] flex justify-center">
            <IconCup className="w-[16px] h-[14px]" animation={props.active} />
          </div>
        </Button>
      </OverlayViewF>
    </BaseMarker>
  );
};

export default WaterFountainMarker;
