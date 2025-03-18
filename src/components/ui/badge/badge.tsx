import React from 'react';

export type BadgeVariant = 'none' | 'primary' | 'secondary';
export type BadgeSize = 'none' | 'xs' | 'sm' | 'md';
export type BadgeColor = 'none' | 'default' | 'dark' | 'green' | 'red' | 'yellow' | 'purple';

const ColorClass: Record<BadgeColor, string> = {
  none: '',
  default: 'text-white bg-primary border border-primary',
  dark: 'text-white bg-black border border-black',
  green: 'text-white bg-green-700 border border-green-700',
  red: 'text-white bg-red-700 border border-red-700',
  yellow: 'text-black bg-amber-400 border border-amber-400',
  purple: 'text-white bg-purple-700 border border-purple-700',
};

const SecondaryColorClass: Record<BadgeColor, string> = {
  none: '',
  default: 'border border-primary text-primary',
  dark: 'border border-black text-black',
  green: 'border border-green-700 text-green-700',
  red: 'border border-red-700 text-red-700',
  yellow: 'border border-amber-400 text-amber-400',
  purple: 'border border-purple-700 text-purple-700',
};

const SizeClass: Record<BadgeSize, string> = {
  none: '',
  xs: 'text-xs px-2 py-0.5',
  sm: 'text-sm px-3 py-1',
  md: 'text-md px-4 py-1.5',
};

const BaseClass = 'font-semibold w-fit rounded-full items-center';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  color?: BadgeColor;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  label = 'Badge',
  variant = 'secondary',
  size = 'sm',
  color = 'default',
  className = '',
  children,
  ...props
}) => {
  const colorClass =
    variant === 'secondary'
      ? SecondaryColorClass[color] || ''
      : variant === 'primary'
      ? ColorClass[color] || ''
      : '';

      console.log(colorClass);
  return (
    <div className={`${BaseClass} ${colorClass} ${SizeClass[size]} ${className}`} {...props}>
      {children || label}
    </div>
  );
};

export default Badge;