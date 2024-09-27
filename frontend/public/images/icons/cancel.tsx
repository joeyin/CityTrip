import { IconProps } from ".";

const IconCancel = ({ fill = "currentColor", ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <path
        d="M1.33329 11.2567L0.743286 10.6667L5.40995 6L0.743286 1.33333L1.33329 0.743332L5.99995 5.41L10.6666 0.743332L11.2566 1.33333L6.58995 6L11.2566 10.6667L10.6666 11.2567L5.99995 6.59L1.33329 11.2567Z"
        fill={fill}
      />
    </svg>
  );
};

export default IconCancel;
