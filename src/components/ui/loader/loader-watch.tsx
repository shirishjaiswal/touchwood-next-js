import { LoaderProps } from '@/components/ui/loader/type';

type LoaderWatchProps = LoaderProps;

function LoaderWatch({
  width,
  height,
  color,
  className,
  message,
}: LoaderWatchProps) {
  return (
    <div className="loader-container">
      <svg
        version="1.1"
        id="L2"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width={width}
        height={height}
        className={className}
        viewBox="0 0 100 100"
        enable-background="new 0 0 100 100"
        xmlSpace="preserve"
      >
        <circle
          fill="none"
          stroke={color}
          strokeWidth="4"
          stroke-miterlimit="10"
          cx="50"
          cy="50"
          r="48"
        />
        <line
          fill="none"
          stroke-linecap="round"
          stroke={color}
          strokeWidth="4"
          stroke-miterlimit="10"
          x1="50"
          y1="50"
          x2="85"
          y2="50.5"
        >
          <animateTransform
            attributeName="transform"
            dur="2s"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </line>
        <line
          fill="none"
          stroke-linecap="round"
          stroke={color}
          strokeWidth="4"
          stroke-miterlimit="10"
          x1="50"
          y1="50"
          x2="49.5"
          y2="74"
        >
          <animateTransform
            attributeName="transform"
            dur="15s"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </line>
      </svg>
      <p>{message}</p>
    </div>
  );
}

export default LoaderWatch;
