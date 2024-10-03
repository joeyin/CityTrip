import { IconProps } from ".";

const IconUser = ({ fill = "currentColor", ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      viewBox="0 0 256 256"
      {...props}
    >
      <g fill={fill}>
        <path d="M192 96a64 64 0 1 1-64-64a64 64 0 0 1 64 64" opacity="0.2" />
        <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8M72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56" />
      </g>
    </svg>
  );
};

export default IconUser;