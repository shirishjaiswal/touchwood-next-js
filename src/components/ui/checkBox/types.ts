import { BaseFieldProps } from "../type";

export type BoxVariant =
  | 'default'
  | 'f-default'
  | 'green'
  | 'f-green'
  | 'red'
  | 'f-red'
  | 'yellow'
  | 'f-yellow'
  | 'purple'
  | 'f-purple';

export interface BaseSelectBoxProps extends BaseFieldProps {
  variant?: BoxVariant;
  boxContainerStyles?: string;
  boxStyle?: string;
  optionStyle?: string;
}

export interface BoxOptionType {
  label: string;
  checked: boolean;
  disabled?: boolean;
  required?: boolean;
};

export const VarientClass: Record<BoxVariant, string> = {
  default: 'text-primary',
  'f-default': 'text-white bg-primary',
  green: 'text-green-700',
  'f-green': 'text-white bg-green-700',
  red: 'text-red-700',
  'f-red': 'text-white bg-red-700',
  yellow: 'text-yellow-400',
  'f-yellow': 'text-white bg-yellow-400',
  purple: 'text-purple-700',
  'f-purple': 'text-white bg-purple-700',
};