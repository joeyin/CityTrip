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
export { default as IconCup } from "./cup";
export { default as IconFilter } from "./filter";
export { default as IconDirection } from "./direction";
export { default as IconCancel } from "./cancel";
export { default as IconStar } from "./star";
export { default as IconUserFill } from "./user-fill";
