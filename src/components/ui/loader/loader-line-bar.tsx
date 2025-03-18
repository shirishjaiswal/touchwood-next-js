import { LoaderProps } from '@/components/ui/loader/type';

type LoaderLineBarProps = LoaderProps;

function LoaderLineBar({
  width,
  height,
  color,
  className,
  message,
}: LoaderLineBarProps) {
  return (
    <div className="loader-container">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width={width}
        height={height}
        className={className}
        viewBox="0 0 100 100"
        enable-background="new 0 0 100 100"
        xmlSpace="preserve"
      >
        <rect
          fill={color}
          width="3"
          height="100"
          transform="translate(0) rotate(180 3 50)"
        >
          <animate
            attributeName="height"
            attributeType="XML"
            dur="1s"
            values="30; 100; 30"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="17"
          fill={color}
          width="3"
          height="100"
          transform="translate(0) rotate(180 20 50)"
        >
          <animate
            attributeName="height"
            attributeType="XML"
            dur="1s"
            values="30; 100; 30"
            repeatCount="indefinite"
            begin="0.1s"
          />
        </rect>
        <rect
          x="40"
          fill={color}
          width="3"
          height="100"
          transform="translate(0) rotate(180 40 50)"
        >
          <animate
            attributeName="height"
            attributeType="XML"
            dur="1s"
            values="30; 100; 30"
            repeatCount="indefinite"
            begin="0.3s"
          />
        </rect>
        <rect
          x="60"
          fill={color}
          width="3"
          height="100"
          transform="translate(0) rotate(180 58 50)"
        >
          <animate
            attributeName="height"
            attributeType="XML"
            dur="1s"
            values="30; 100; 30"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </rect>
        <rect
          x="80"
          fill={color}
          width="3"
          height="100"
          transform="translate(0) rotate(180 76 50)"
        >
          <animate
            attributeName="height"
            attributeType="XML"
            dur="1s"
            values="30; 100; 30"
            repeatCount="indefinite"
            begin="0.1s"
          />
        </rect>
      </svg>
      <p>{message}</p>
    </div>
  );
}

export default LoaderLineBar;
