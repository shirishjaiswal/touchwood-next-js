import React from 'react';
import { IconProps } from '@/components/ui/icons/types';

type LoginProps = IconProps;

const Login: React.FC<LoginProps> = ({
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
    <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
  </svg>
);

export default Login;
