import React from 'react';
import { IconProps } from '@/components/ui/icons/types';

type HamburgerProps = IconProps;

const Hamburger: React.FC<HamburgerProps> = ({
  className,
  color = '#e3e3e3',
  width,
  height,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    fill={color}
    className={className}
    width={width}
    height={height}
  >
    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />{' '}
  </svg>
);

export default Hamburger;
