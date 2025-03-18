import { LoaderProps } from '@/components/ui/loader/type';

type LoaderCircularDotProps = LoaderProps;

function LoaderCircularDot({
  width,
  height,
  color,
  className,
  message,
}: LoaderCircularDotProps) {
  return (
    <div className="loader-container">
      <svg
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className={className}
        style={{ background: 'none' }}
      >
        <circle cx="75" cy="50" fill={color} r="6.39718">
          <animate
            attributeName="r"
            values="4.8;4.8;8;4.8;4.8"
            keyTimes={'0;0.1;0.2;0.3;1'}
            dur="1s"
            repeatCount="indefinite"
            begin="-0.875s"
          ></animate>
        </circle>
        <circle cx="67.678" cy="67.678" fill={color} r="4.8">
          <animate
            attributeName="r"
            values="4.8;4.8;8;4.8;4.8"
            keyTimes="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="-0.75s"
          ></animate>
        </circle>
        <circle cx="50" cy="75" fill={color} r="4.8">
          <animate
            attributeName="r"
            values="4.8;4.8;8;4.8;4.8"
            keyTimes="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="-0.625s"
          ></animate>
        </circle>
        <circle cx="32.322" cy="67.678" fill={color} r="4.8">
          <animate
            attributeName="r"
            values="4.8;4.8;8;4.8;4.8"
            keyTimes="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="-0.5s"
          ></animate>
        </circle>
        <circle cx="25" cy="50" fill={color} r="4.8">
          <animate
            attributeName="r"
            values="4.8;4.8;8;4.8;4.8"
            keyTimes="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="-0.375s"
          ></animate>
        </circle>
        <circle cx="32.322" cy="32.322" fill={color} r="4.80282">
          <animate
            attributeName="r"
            values="4.8;4.8;8;4.8;4.8"
            keyTimes="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="-0.25s"
          ></animate>
        </circle>
        <circle cx="50" cy="25" fill={color} r="6.40282">
          <animate
            attributeName="r"
            values="4.8;4.8;8;4.8;4.8"
            keyTimes="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="-0.125s"
          ></animate>
        </circle>
        <circle cx="67.678" cy="32.322" fill={color} r="7.99718">
          <animate
            attributeName="r"
            values="4.8;4.8;8;4.8;4.8"
            keyTimes="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="0s"
          ></animate>
        </circle>
      </svg>
      <p>{message}</p>
    </div>
  );
}

export default LoaderCircularDot;
