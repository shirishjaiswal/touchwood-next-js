import React from 'react';

export type BadgeVariant = 'none' | 'primary' | 'secondary';
export type BadgeSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BadgeColor =
  | 'none'
  | 'default'
  | 'blue'
  | 'gray'
  | 'green'
  | 'red'
  | 'yellow'
  | 'purple';

const FilledColorClass: Record<BadgeColor, string> = {
  none: '',
  default: 'bg-gray-600 text-white border border-gray-600',
  blue: 'bg-accent text-white border border-accent',
  gray: 'bg-gray-200 text-gray-800 border border-gray-300',
  green: 'bg-green-600 text-white border border-green-600',
  red: 'bg-red-600 text-white border border-red-600',
  yellow: 'bg-yellow-400 text-black border border-yellow-400',
  purple: 'bg-purple-600 text-white border border-purple-600',
};

const OutlineColorClass: Record<BadgeColor, string> = {
  none: '',
  default: 'border border-gray-600 text-gray-600',
  blue: 'border border-accent text-accent',
  gray: 'border border-gray-300 text-gray-800',
  green: 'border border-green-600 text-green-600',
  red: 'border border-red-600 text-red-600',
  yellow: 'border border-yellow-400 text-yellow-600',
  purple: 'border border-purple-600 text-purple-600',
};

const SizeClass: Record<BadgeSize, string> = {
  none: '',
  xs: 'text-xs px-2 py-0.5',
  sm: 'text-sm px-2.5 py-0.5',
  md: 'text-base px-3 py-1',
  lg: 'text-base px-4 py-1.5',
  xl: 'text-lg px-5 py-2',
};

const BaseClass = 'inline-flex font-medium rounded-full items-center';

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
    variant === 'primary'
      ? FilledColorClass[color]
      : variant === 'secondary'
      ? OutlineColorClass[color]
      : '';

  return (
    <div
      className={`${BaseClass} ${SizeClass[size]} ${colorClass} ${className}`}
      {...props}
    >
      {children || label}
    </div>
  );
};

export default Badge;
