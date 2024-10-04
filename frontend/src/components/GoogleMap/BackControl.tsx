import React from "react";
import { ButtonProps } from "@nextui-org/react";
import { IconLocationCrosshairs } from "@icons";
import { Button } from "..";

const LayerControl = ({ isDisabled, isLoading, ...props }: ButtonProps) => {
  return (
    <Button
      isDisabled={isDisabled || isLoading}
      isLoading={isLoading}
      isIconOnly
      size="md"
      color="secondary"
      variant="light"
      radius="full"
      className="absolute bottom-6 right-6 bg-white data-[loading=true]:opacity-100"
      {...props}
    >
      <IconLocationCrosshairs />
    </Button>
  );
};

export default React.memo(LayerControl);
