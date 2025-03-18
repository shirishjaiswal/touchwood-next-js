import React from 'react';
import { IconProps } from '@/components/ui/icons/types';

type CloseXProps = IconProps;

const CloseX: React.FC<CloseXProps> = ({
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
    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
  </svg>
);

export default CloseX;
