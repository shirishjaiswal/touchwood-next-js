'use client';

import { Square, SquareCheckBig } from 'lucide-react';
import { EventInterface } from '@/components/ui/type';
import { BaseSelectBoxProps, BoxOptionType, VarientClass } from './types';
import { getEventFormat, getId, getKey } from '@/components/ui/helper';
import ClickButton from '@/components/ui/button/click-button';
import { useState } from 'react';

export interface SelectBoxOnChangeEvent extends EventInterface {
  target: {
    value: BoxOptionType;
    validationMessage: string | undefined;
  };
}

export interface SelectBoxProps extends BaseSelectBoxProps {
  option: BoxOptionType;
  onTick?: (updatedOptions: SelectBoxOnChangeEvent) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  required = false,
  description,
  disabled,
  option,
  variant = 'default',
  onTick,
  errorMessage,
  mainContainerStyles,
  infoContainerStyles,
  labelStyles,
  descriptionStyles,
  boxContainerStyles,
  boxStyle,
  optionStyle,
  errorStyles,
  ...props
}) => {
  const [checked, setChecked] = useState<boolean>(option.checked);
  const handleChange = () => {
    if (disabled || option.disabled) return;
    setChecked(!checked);
    const newValue: BoxOptionType = { ...option, checked: !option.checked };
    const event = getEventFormat(
      newValue,
      getError(newValue),
    ) as SelectBoxOnChangeEvent;
    onTick?.(event);
  };

  const getError = (currentOption: BoxOptionType) => {
    if (required && !currentOption.checked) {
      return 'Field is required';
    }
    return undefined;
  };

  return (
    <div id="cb-container" className={`${mainContainerStyles}`}>
      <div id="info-container" className={`${infoContainerStyles}`}>
        {label && (
          <label
            id="label"
            className={`${labelStyles || 'text-md font-medium text-stone-950'} ${required ? 'after:ml-1 after:text-rose-700 after:content-["*"]' : ''} `}
          >
            {label}
          </label>
        )}
        <p
          id="description"
          className={`${descriptionStyles || 'text-xs font-light text-zinc-800'}`}
        >
          {description}
        </p>
      </div>
      <div id="cb-container-list" className={`${boxContainerStyles}`}>
        <div
          key={getKey(option.label)}
          id={getId(option.label)}
          className="flex items-center gap-2"
        >
          <ClickButton
            variant="none"
            size="none"
            type="button"
            key={option.label}
            id={`option-${option.label.toLowerCase()}`}
            className={`text-md flex gap-1 rounded text-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 ${optionStyle}`}
            onClick={handleChange}
            disabled={option.disabled || disabled}
          >
            <label className="relative flex items-center">
              <input
                type="checkbox"
                name={props?.name || option.label}
                id={`option-${option.label.toLowerCase()}`}
                checked={checked}
                onChange={handleChange}
                disabled={option.disabled || disabled}
                className="peer absolute h-6 w-6 opacity-0"
                required={required}
                aria-label={`option-${option.label.toLowerCase()}`}
                role="checkbox"
                autoFocus
              />
              <span className="flex h-6 w-6 items-center justify-center">
                {checked ? (
                  <SquareCheckBig
                    className={`${VarientClass[variant]} ${boxStyle} peer-checked:opacity-100`}
                  />
                ) : (
                  <Square
                    className={`${VarientClass[variant]} ${boxStyle} peer-checked:hidden`}
                  />
                )}
              </span>
            </label>
          </ClickButton>
          <label
            className={`${optionStyle} ${option.required ? 'after:ml-1 after:text-rose-700 after:content-["*"]' : ''} `}
          >
            {option.label}
          </label>
        </div>
      </div>
      {errorMessage && (
        <div
          id="error-message"
          className={`text-rose-700 ${errorStyles ?? 'text-sm font-medium'}`}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SelectBox;
