import React from "react";
// import { useGoogleMap } from "@react-google-maps/api";
import { Button, ButtonProps } from "@nextui-org/button";
import { IconLocationCrosshairs } from "@icons";

const LayerControl = (props: ButtonProps) => {
  // const map: google.maps.Map | null = useGoogleMap();

  // const handleClick = () => {
  //   map?.setZoom(16);
  // };

  return (
    <Button
      isIconOnly
      size="md"
      color="secondary"
      radius="full"
      className="absolute bottom-6 right-6 bg-white shadow-[0_0_10px_-1px_#ABABAB] p-1.5 text-secondary"
      {...props}
    >
      <IconLocationCrosshairs />
    </Button>
  );
};

export default LayerControl;
