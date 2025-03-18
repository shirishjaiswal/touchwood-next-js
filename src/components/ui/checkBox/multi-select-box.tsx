'use client';

import { useState } from 'react';
import { Square, SquareCheckBig } from 'lucide-react';
import { EventInterface } from '@/components/ui/type';
import {
  BaseSelectBoxProps,
  BoxOptionType,
  VarientClass,
} from '@/components/ui/checkBox/types';
import { getEventFormat, getId, getKey } from '@/components/ui/helper';
import ClickButton from '@/components/ui/button/click-button';

export interface MultiSelectBoxOnChangeEvent extends EventInterface {
  target: {
    value: BoxOptionType[];
    validationMessage: string | undefined;
  };
}

export interface MultiSelectBoxProps extends BaseSelectBoxProps {
  options: BoxOptionType[];
  multiSelect?: boolean;
  onTick: (event: MultiSelectBoxOnChangeEvent) => void;
}

const MultiSelectBox: React.FC<MultiSelectBoxProps> = ({
  label,
  required = false,
  description,
  disabled,
  options,
  multiSelect = false,
  variant = 'default',
  onTick,
  errorMessage,
  mainContainerStyles,
  infoContainerStyles,
  labelStyles,
  descriptionStyles,
  boxContainerStyles,
  optionStyle,
  boxStyle,
  errorStyles,
}) => {
  const [cbOptions, setOptions] = useState<BoxOptionType[]>(options);

  const getError = () => {
    if (required) {
      const checkedOptions = cbOptions.filter((option) => option.checked);
      if (checkedOptions.length === 0) {
        return 'Field is required';
      }
    }
    if (
      cbOptions.filter((option) => {
        if (option.required && !option.checked) return true;
      }).length > 0
    ) {
      return 'Field with * is required';
    }
  };

  const handleSingleSelect = (idx: number) => {
    const newValue: BoxOptionType[] = cbOptions.map((option, index) =>
      index === idx
        ? {
            ...option,
            checked:
              option.disabled || disabled
                ? option.checked
                : required
                  ? true
                  : !option.checked,
          }
        : { ...option, checked: false },
    );
    setOptions(newValue);
    const event = getEventFormat(
      newValue,
      getError(),
    ) as MultiSelectBoxOnChangeEvent;
    onTick(event);
  };

  const handleMultiSelect = (idx: number) => {
    const newValue: BoxOptionType[] = cbOptions.map((option, index) =>
      index === idx
        ? {
            ...option,
            checked:
              option.disabled || disabled ? option.checked : !option.checked,
          }
        : option,
    );
    setOptions(newValue);
    const event = getEventFormat(
      newValue,
      getError(),
    ) as MultiSelectBoxOnChangeEvent;
    onTick(event);
  };

  const handleChange = (idx: number) => {
    if (multiSelect) handleMultiSelect(idx);
    else handleSingleSelect(idx);
  };

  return (
    <div id="cb-container" className={`${mainContainerStyles}`}>
      <div id="info-container" className={`${infoContainerStyles}`}>
        {label && (
          <label
            id="label"
            className={`${labelStyles || 'text-md font-medium text-stone-950'} ${required && <span className="text-rose-700">* </span>}`}
          >
            {label}
          </label>
        )}
        <p
          id="description"
          className={`text-xs font-light text-zinc-800 ${descriptionStyles}`}
        >
          {description}
        </p>
      </div>
      <div id="cb-container-list" className={`${boxContainerStyles}`}>
        {cbOptions.map((option, idx) => (
          <div
            key={getKey(option.label)}
            id={getId(option.label)}
            className="flex items-center gap-2"
          >
            <ClickButton
              variant="none"
              size="none"
              key={option.label}
              id={`option-${option.label.toLowerCase()}`}
              className={`text-md flex gap-1 rounded text-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 ${optionStyle}`}
              onClick={() => handleChange(idx)}
              disabled={option.disabled || disabled}
            >
              {option.checked ? (
                <SquareCheckBig
                  className={`${VarientClass[variant]} ${boxStyle} rounded`}
                />
              ) : (
                <Square
                  className={`${VarientClass[variant]} ${boxStyle} rounded`}
                />
              )}
            </ClickButton>
            <label
              className={`${optionStyle} ${option.required ? 'after:ml-1 after:text-rose-700 after:content-["*"]' : ''} `}
            >
              {option.label}
            </label>
          </div>
        ))}
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

export default MultiSelectBox;
