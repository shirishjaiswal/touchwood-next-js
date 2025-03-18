import React from 'react';
import { IconProps } from '@/components/ui/icons/types';

type WarningProps = IconProps;

const Warning: React.FC<WarningProps> = ({
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
    <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" />{' '}
  </svg>
);

export default Warning;
