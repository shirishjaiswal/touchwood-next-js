import React from 'react';
import { IconProps } from '@/components/ui/icons/types';

type RegisterProps = IconProps;

const Register: React.FC<RegisterProps> = ({
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
    <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
  </svg>
);

export default Register;
