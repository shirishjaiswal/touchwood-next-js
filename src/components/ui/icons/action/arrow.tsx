import React from 'react';
import { IconProps } from '@/components/ui/icons/types';

type ArrowProps = IconProps;

const Arrow: React.FC<ArrowProps> = ({
  className,
  color = '#e3e3e3',
  width = 24,
  height = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    fill={color}
    className={className}
    width={width}
    height={height}
  >
    <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
  </svg>
);

export default Arrow;
