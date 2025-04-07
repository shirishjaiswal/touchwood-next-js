import { LoaderCircle } from 'lucide-react';
import React from 'react';

type ButtonVariant =
  | 'none' | 'default' | 'alternative' | 'dark' | 'light' | 'green' | 'red' | 'yellow' | 'purple'
  | 'gradient-default' | 'gradient-green' | 'gradient-cyan' | 'gradient-teal' | 'gradient-lime'
  | 'gradient-red' | 'gradient-pink' | 'gradient-purple'
  | 'shadow-default' | 'shadow-green' | 'shadow-cyan' | 'shadow-teal' | 'shadow-lime'
  | 'shadow-red' | 'shadow-pink' | 'shadow-purple'
  | 'outline-default' | 'outline-dark' | 'outline-green' | 'outline-red' | 'outline-yellow' | 'outline-purple'
  | 'purple-blue' | 'cyan-blue' | 'green-blue' | 'purple-pink' | 'pink-orange';

type ButtonSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const VariantClass: Record<ButtonVariant, string> = {
  none: '',
  default: 'text-white bg-primary hover:bg-primary-900',
  alternative: 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10',
  dark: 'bg-gray-800 hover:bg-gray-900',
  light: 'text-black bg-white border border-gray-300 hover:bg-gray-100',
  green: 'text-white bg-green-700 hover:bg-green-800',
  red: 'text-white bg-red-700 hover:bg-red-800',
  yellow: 'text-white bg-yellow-400 hover:bg-yellow-500',
  purple: 'text-white bg-purple-700 hover:bg-purple-800',

  // Gradient styles
  'gradient-default': 'text-white bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 hover:bg-gradient-to-br',
  'gradient-green': 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br',
  'gradient-cyan': 'text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br',
  'gradient-teal': 'text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br',
  'gradient-lime': 'text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br',
  'gradient-red': 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br',
  'gradient-pink': 'text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br',
  'gradient-purple': 'text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br',

  // Shadow styles
  'shadow-default': 'text-white bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 shadow-lg shadow-primary-500/50',
  'shadow-green': 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-lg shadow-green-500/50',
  'shadow-cyan': 'text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/50',
  'shadow-teal': 'text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 shadow-lg shadow-teal-500/50',
  'shadow-lime': 'text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50',
  'shadow-red': 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 shadow-lg shadow-red-500/50',
  'shadow-pink': 'text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 shadow-lg shadow-pink-500/50',
  'shadow-purple': 'text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 shadow-lg shadow-purple-500/50',

  // Outline styles
  'outline-default': 'text-primary border border-primary hover:bg-primary-800 hover:text-primary-50',
  'outline-dark': 'text-gray-900 border border-gray-800 hover:bg-gray-900 hover:text-white',
  'outline-green': 'text-green-700 border border-green-700 hover:bg-green-800 hover:text-white',
  'outline-red': 'text-red-700 border border-red-700 hover:bg-red-800 hover:text-white',
  'outline-yellow': 'text-yellow-400 border border-yellow-400 hover:bg-yellow-500 hover:text-white',
  'outline-purple': 'text-purple-700 border border-purple-700 hover:bg-purple-800 hover:text-white',

  // Mixed colors
  'purple-blue': 'text-white bg-gradient-to-br from-purple-600 to-primary-500 hover:bg-gradient-to-bl',
  'cyan-blue': 'text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl',
  'green-blue': 'text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl',
  'purple-pink': 'text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l',
  'pink-orange': 'text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl',
};

const SizeClass: Record<ButtonSize, string> = {
  none: '',
  xs: 'px-3 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-sm md:px-5 md:py-2.5 md:text-sm',
  sm: 'px-3 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base md:px-5 md:py-2.5 md:text-base',
  md: 'px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base md:px-6 md:py-3 md:text-base',
  lg: 'px-5 py-3 text-base sm:px-6 sm:py-3.5 sm:text-lg md:px-7 md:py-3.5 md:text-lg',
  xl: 'px-6 py-3.5 text-lg sm:px-8 sm:py-4 sm:text-xl md:px-8 md:py-4 md:text-xl',
};

const BaseClass =
  'font-medium text-center w-fit rounded-lg focus:outline-none transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';

export interface ClickButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
}

const ClickButton: React.FC<ClickButtonProps> = ({
  id,
  type = 'button',
  label = 'Click Button',
  variant = 'default',
  size = 'md',
  loading = false,
  disabled,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <button
      id={id}
      type={type}
      className={`${BaseClass} ${VariantClass[variant]} ${SizeClass[size]} ${className}`}
      onClick={onClick}
      disabled={loading || disabled}
      role='button'
      {...props}
    >
      {loading && <LoaderCircle className="absolute animate-spin" />}
      {props.children || label}
    </button>
  );
};

export default ClickButton;
