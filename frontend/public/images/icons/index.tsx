import { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  animation?: boolean;
  className?: string | undefined;
}

export { default as IconBike } from "./bike";
export { default as IconHome } from "./home";
export { default as IconLocation } from "./location";
export { default as IconLocationCrosshairs } from "./location-crosshairs";
export { default as IconSupport } from "./support";
export { default as IconWaterFountain } from "./water-fountain";
export { default as IconFilter } from "./filter";
