import React from "react";
import { useGoogleMap } from "@react-google-maps/api";
import { ButtonProps } from "@nextui-org/react";
import { IconLocationCrosshairs } from "@icons";
import { Button } from "..";

const LayerControl = ({
  isDisabled,
  ...props
}: ButtonProps) => {
  const [detecting, setDetecting] = React.useState(false);
  const map: google.maps.Map | null = useGoogleMap();

  const handleClick = async () => {
    setDetecting(true);
    try {
      const coords = await currentPositionAsync();
      map?.panTo(
        new google.maps.LatLng(coords.coords.latitude, coords.coords.longitude)
      );
    } catch (error) {
      console.warn(`Failed to get current position: ${error}`);
    }
    setDetecting(false);
  };

  const currentPositionAsync = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      // Get the current position
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos),
        (error) => reject(error)
      );
      // Set a timeout to reject the promise if it takes more than 2.5 seconds
      setTimeout(() => reject("timeout"), 2500);
    });
  };

  return (
    <Button
      isDisabled={isDisabled || detecting}
      isLoading={detecting}
      isIconOnly
      size="md"
      color="secondary"
      variant="light"
      radius="full"
      className="absolute bottom-6 right-6"
      onClick={handleClick}
      {...props}
    >
      <IconLocationCrosshairs />
    </Button>
  );
};

export default LayerControl;
