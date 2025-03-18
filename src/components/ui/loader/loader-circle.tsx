import { LoaderProps } from '@/components/ui/loader/type';

type LoaderCircleProps = LoaderProps;

function LoaderCircle({
  width,
  height,
  color,
  className,
  message,
}: LoaderCircleProps) {
  return (
    <div className="loader-container">
      <svg
        version="1.1"
        id="L3"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        xmlSpace="preserve"
        width={width}
        height={height}
        className={className}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          fill="none"
          stroke={color}
          strokeWidth="4"
          cx="50"
          cy="50"
          r="44"
          style={{ opacity: 0.5 }}
        />

        <circle fill={color} stroke="none" cx="8" cy="54" r="6">
          <animateTransform
            attributeName="transform"
            dur="2s"
            type="rotate"
            from="0 50 48"
            to="360 50 52"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <p>{message}</p>
    </div>
  );
}

export default LoaderCircle;
