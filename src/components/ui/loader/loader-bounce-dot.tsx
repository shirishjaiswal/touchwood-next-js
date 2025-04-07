import { LoaderProps } from '@/components/ui/loader/type';

type LoaderBounceDotProps = LoaderProps;
function LoaderBounceDot({
  width,
  height,
  color,
  className,
  message,
}: LoaderBounceDotProps) {
  return (
    <div className="loader-container">
      <svg width={width} height={height} className={className} viewBox="0 35 60 30" xmlns="http://www.w3.org/2000/svg">
        <circle fill={color} stroke="none" cx="6" cy="50" r="6">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 10 ; 0 -10; 0 10"
            repeatCount="indefinite"
            begin="0.1"
          />
        </circle>
        <circle fill={color} stroke="none" cx="30" cy="50" r="6">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 7 ; 0 -7; 0 7"
            repeatCount="indefinite"
            begin="0.2"
          />
        </circle>
        <circle fill={color} stroke="none" cx="54" cy="50" r="6">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 5 ; 0 -5; 0 5"
            repeatCount="indefinite"
            begin="0.3"
          />
        </circle>
      </svg>

      <p>{message}</p>
    </div>
  );
}

export default LoaderBounceDot;
