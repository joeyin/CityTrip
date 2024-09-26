import { IconProps } from ".";

const IconLocationCrosshairs = ({
  fill = "currentColor",
  animation = true,
  ...props
}: IconProps) => {
  return animation ? (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="0" fill={fill}>
        <animate
          fill="freeze"
          attributeName="r"
          begin="0.7s"
          dur="0.2s"
          values="0;4"
        />
      </circle>
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      >
        <path
          strokeDasharray="56"
          strokeDashoffset="56"
          d="M12 4c4.42 0 8 3.58 8 8c0 4.42 -3.58 8 -8 8c-4.42 0 -8 -3.58 -8 -8c0 -4.42 3.58 -8 8 -8Z"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.6s"
            values="56;0"
          />
        </path>
        <path
          strokeDasharray="4"
          strokeDashoffset="4"
          d="M12 4v0M20 12h0M12 20v0M4 12h0"
          opacity="0"
        >
          <animate
            fill="freeze"
            attributeName="d"
            begin="1s"
            dur="0.2s"
            values="M12 4v0M20 12h0M12 20v0M4 12h0;M12 4v-2M20 12h2M12 20v2M4 12h-2"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1s"
            dur="0.2s"
            values="4;0"
          />
          <set fill="freeze" attributeName="opacity" begin="1s" to="1" />
          <animateTransform
            attributeName="transform"
            dur="30s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </path>
      </g>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="0" fill={fill}>
        <animate
          fill="freeze"
          attributeName="r"
          begin="0.7s"
          dur="0.2s"
          values="0;4"
        />
      </circle>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      >
        <path
          strokeDasharray="56"
          strokeDashoffset="56"
          d="M12 4c4.42 0 8 3.58 8 8c0 4.42 -3.58 8 -8 8c-4.42 0 -8 -3.58 -8 -8c0 -4.42 3.58 -8 8 -8Z"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.6s"
            values="56;0"
          />
        </path>
        <path
          strokeDasharray="4"
          strokeDashoffset="4"
          d="M12 4v0M20 12h0M12 20v0M4 12h0"
          opacity="0"
        >
          <animate
            fill="freeze"
            attributeName="d"
            begin="1s"
            dur="0.2s"
            values="M12 4v0M20 12h0M12 20v0M4 12h0;M12 4v-2M20 12h2M12 20v2M4 12h-2"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1s"
            dur="0.2s"
            values="4;0"
          />
          <set fill="freeze" attributeName="opacity" begin="1s" to="1" />
        </path>
      </g>
    </svg>
  );
};

export default IconLocationCrosshairs;
