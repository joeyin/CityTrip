import { IconProps } from ".";

const IconSupport = ({
  fill = "currentColor",
  animation = true,
  ...props
}: IconProps) => {
  return animation ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.05178 15.1667C2.34319 15.4259 2.68981 15.5556 3.09167 15.5556H10.9083C11.3097 15.5556 11.6563 15.4259 11.9482 15.1667C12.2401 14.9074 12.4056 14.5769 12.4444 14.175L14 0H0L1.55556 14.175C1.59496 14.5769 1.76037 14.9074 2.05178 15.1667ZM3.11111 14L2.29444 6.65L1.75 1.55556H12.25L11.7444 6.22222L10.8889 14H6.3H3.11111Z"
        fill={fill}
      >
        <animate
          attributeName="opacity"
          from="1"
          to="0"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
          keyTimes="0;0.5;1"
        />
      </path>
      <path
        d="M6.3 5.44445C5.58704 5.44445 4.88704 5.54504 4.2 5.74622C3.51296 5.94741 2.87778 6.24867 2.29444 6.65L3.11111 14H10.8889L11.7444 6.22222H11.2C10.7074 6.22222 10.2602 6.1867 9.85833 6.11567C9.45648 6.04463 8.90556 5.90515 8.20556 5.69722C7.90741 5.60648 7.5963 5.54167 7.27222 5.50278C6.94815 5.46389 6.62407 5.44445 6.3 5.44445ZM2.1 4.95833L4.15178 4.16111C4.85852 3.97963 5.58107 3.88889 6.31944 3.88889C6.70833 3.88889 7.09411 3.91482 7.47678 3.96667C7.85944 4.01852 8.23848 4.0963 8.61389 4.2C9.26204 4.38148 9.758 4.50463 10.1018 4.56945C10.4456 4.63426 10.8116 4.66667 11.2 4.66667H11.9194L12.25 1.55556H1.75L2.1 4.95833ZM3.09167 15.5556C2.68981 15.5556 2.34319 15.4259 2.05178 15.1667C1.76037 14.9074 1.59496 14.5769 1.55556 14.175L0 0H14L12.4444 14.175C12.4056 14.5769 12.2401 14.9074 11.9482 15.1667C11.6563 15.4259 11.3097 15.5556 10.9083 15.5556H3.09167ZM6.3 14H10.8889H3.11111H6.3Z"
        fill={fill}
      >
        <animate
          attributeName="opacity"
          from="0"
          to="1"
          dur="2s"
          begin="2s"
          repeatCount="indefinite"
          keyTimes="0;0.5;1"
        />
      </path>
      <path
        d="M6.3 5.44445C5.58704 5.44445 4.88704 5.54504 4.2 5.74622C3.51296 5.94741 2.87778 6.24867 2.29444 6.65L3.11111 14H6.3H10.8889L11.7444 6.22222H11.2C10.7074 6.22222 10.2602 6.1867 9.85833 6.11567C9.45648 6.04463 8.90556 5.90515 8.20556 5.69722C7.90741 5.60648 7.5963 5.54167 7.27222 5.50278C6.94815 5.46389 6.62407 5.44445 6.3 5.44445Z"
        fill={fill}
      >
        <animate
          attributeName="opacity"
          from="0"
          to="1"
          dur="2s"
          begin="4s"
          repeatCount="indefinite"
          keyTimes="0;0.5;1"
        />
      </path>
    </svg>
  ) : (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill={fill}
        d="M6.3 5.66667C5.58704 5.66667 4.88704 5.76726 4.2 5.96844C3.51296 6.16963 2.87778 6.47089 2.29444 6.87222L3.11111 14.2222H10.8889L11.7444 6.44444H11.2C10.7074 6.44444 10.2602 6.40893 9.85833 6.33789C9.45648 6.26685 8.90556 6.12737 8.20556 5.91944C7.90741 5.8287 7.5963 5.76389 7.27222 5.725C6.94815 5.68611 6.62407 5.66667 6.3 5.66667ZM2.1 5.18055C2.76111 4.83055 3.44504 4.56481 4.15178 4.38333C4.85852 4.20185 5.58107 4.11111 6.31944 4.11111C6.70833 4.11111 7.09411 4.13704 7.47678 4.18889C7.85944 4.24074 8.23848 4.31852 8.61389 4.42222C9.26204 4.6037 9.758 4.72685 10.1018 4.79167C10.4456 4.85648 10.8116 4.88889 11.2 4.88889H11.9194L12.25 1.77778H1.75L2.1 5.18055ZM3.09167 15.7778C2.68981 15.7778 2.34319 15.6481 2.05178 15.3889C1.76037 15.1296 1.59496 14.7991 1.55556 14.3972L0 0.222221H14L12.4444 14.3972C12.4056 14.7991 12.2401 15.1296 11.9482 15.3889C11.6563 15.6481 11.3097 15.7778 10.9083 15.7778H3.09167ZM6.3 14.2222H10.8889H3.11111H6.3Z"
      />
    </svg>
  );
};

export default IconSupport;
