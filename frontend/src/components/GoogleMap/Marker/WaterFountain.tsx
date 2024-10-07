"use-client";

import React from "react";
import {
  MarkerF as BaseMarker,
  OverlayView,
  OverlayViewF,
} from "@react-google-maps/api";
import { IconCup } from "@images/icons";
import cx from "classnames";
import { Button } from "@components";
import { WaterFountainProp } from "@/hooks";

const WaterFountainMarker = (props: WaterFountainProp) => {
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

  const handelVisibleChanged = React.useCallback(() => {
    setVisible(markerRef?.current?.getVisible());
  }, []);

  const getPixelPositionOffset = React.useCallback(
    (width: number, height: number) => ({
      x: -(width / 2) + 1,
      y: -(height / 2) - 14,
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
      )}
    </BaseMarker>
  );
};

export default WaterFountainMarker;
