import { LoaderProps } from '@/components/ui/loader/type';

type LoaderLineProps = LoaderProps;

function LoaderLine({
  width,
  height,
  color,
  className,
  message,
}: LoaderLineProps) {
  return (
    <div className="loader-container">
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 60"
        className={className}
      >
        <rect fill={color} x="0" y="0" width="10" height="60" rx="6">
          <animate
            attributeType="CSS"
            attributeName="height"
            values="60;20;60;"
            begin="0s"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeType="CSS"
            attributeName="y"
            begin="0s"
            values="0;20;0;"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
        <rect fill={color} x="20" y="0" width="10" height="60" rx="6">
          <animate
            attributeType="CSS"
            attributeName="height"
            values="60;20;60"
            begin="0.2s"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeType="CSS"
            attributeName="y"
            values="0;20;0"
            begin="0.2s"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
        <rect fill={color} x="40" y="0" width="10" height="60" rx="6">
          <animate
            attributeType="CSS"
            attributeName="height"
            values="60;20;60"
            begin="0.4s"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeType="CSS"
            attributeName="y"
            values="0;20;0"
            begin="0.4s"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
        <rect fill={color} x="60" y="0" width="10" height="60" rx="6">
          <animate
            attributeType="CSS"
            attributeName="height"
            values="60;20;60"
            begin="0.6s"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeType="CSS"
            attributeName="y"
            values="0;20;0"
            begin="0.6s"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
        <rect fill={color} x="80" y="0" width="10" height="60" rx="6">
          <animate
            attributeType="CSS"
            attributeName="height"
            values="60;20;60"
            begin="0.8s"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeType="CSS"
            attributeName="y"
            values="0;20;0"
            begin="0.8s"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
      <p>{message}</p>
    </div>
  );
}

export default LoaderLine;
