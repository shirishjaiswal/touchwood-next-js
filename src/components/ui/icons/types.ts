type Color =
  | `#${string}` // Supports hex colors like #FF5733
  | `rgb(${number},${number},${number})` // Supports RGB
  | `rgba(${number},${number},${number},${number})` // Supports RGBA
  | `hsl(${number},${number}%,${number}%)` // Supports HSL
  | `hsla(${number},${number}%,${number}%,${number})` // Supports HSLA
  | "currentColor" // Allows Tailwind text color control
  | "inherit"
  | string; // Allows Tailwind classes like "text-red-500"

export interface IconProps {
  className?: string;
  color?: Color;
  width?: number | string;
  height?: number | string;
}
