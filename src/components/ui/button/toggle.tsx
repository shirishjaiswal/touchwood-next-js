'use client';

import React, { useEffect, useState } from 'react';
import { BaseFieldProps } from '@/components/ui/type';
import ClickButton from '@/components/ui/button/click-button';

export type ToggleProps = BaseFieldProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> & {
    value?: boolean;
    onChange?: (checked: boolean) => void;
  };

const Toggle: React.FC<ToggleProps> = ({
  label,
  description,
  required,
  disabled,
  value,
  onChange,
  mainContainerStyles,
  infoContainerStyles,
  labelStyles,
  descriptionStyles,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(value || false);

  useEffect(() => {
    setIsChecked(value || false);
  }, [value]);

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (disabled || props.readOnly) return;
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <div id="toggle-container" className={`w-full ${mainContainerStyles}`}>
      <div id="info-container" className={infoContainerStyles}>
        {label && (
          <label
            id="label"
            className={`${labelStyles ?? 'text-md font-medium text-stone-950'} ${required ? 'after:ml-1 after:text-rose-700 after:content-["*"]' : ''}`}
          >
            {label}
          </label>
        )}
        <p
          id="description"
          className={`${descriptionStyles ?? 'text-xs font-light text-zinc-800'}`}
        >
          {description}
        </p>
      </div>

      <div id="toggle-wrapper" className="relative flex items-center gap-2">
        <ClickButton
          id="toggle-button"
          variant="none"
          className={`relative min-w-12.5 h-6.5 rounded-l-3xl rounded-r-3xl cursor-pointer transition-colors border border-primary p-3 ${
            isChecked ? 'bg-primary-500' : 'bg-gray-300'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleToggle}
        >
          <input type="checkbox" checked={isChecked} readOnly className="sr-only" />
          <div
            className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-300 border border-primary ${
              isChecked ? 'translate-x-6' : 'translate-x-0'
            }`}
          ></div>
        </ClickButton>
      </div>
    </div>
  );
};

export default Toggle;
