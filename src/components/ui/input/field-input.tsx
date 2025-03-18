'use client';

import {
  EyeOff,
  Eye,
  CircleCheck,
  CircleAlert,
  Pencil,
  PencilOff,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { BaseFieldProps } from '@/components/ui/type';
import ClickButton from '@/components/ui/button/click-button';
import { debounce } from 'lodash';

export type FieldInputType =
  | 'text'
  | 'password'
  | 'email'
  | 'date'
  | 'month'
  | 'tel'
  | 'number'
  | 'hidden';

export type FieldInputProps = BaseFieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    type?: FieldInputType;
    verified?: boolean | 'none';
    editable?: boolean;
    inputStyles?: string;
  };

const FieldInput: React.FC<FieldInputProps> = ({
  type = 'text',
  label,
  description,
  required,
  disabled,
  verified = 'none',
  editable,
  value,
  onChange,
  onBlur,
  errorMessage,
  mainContainerStyles,
  infoContainerStyles,
  labelStyles,
  descriptionStyles,
  inputStyles,
  errorStyles,
  autoComplete,
  ...props
}: FieldInputProps) => {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<
    string | number | readonly string[]
  >(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const debouncedOnChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      onChange?.({
        ...e,
        target: {
          ...e.target,
          value: inputValue,
          validationMessage: getError(inputValue),
        },
      });
    },
    300,
  );
  const getError = (value: string) => {
    let error = '';
    if (required && value.trim() === '') {
      error = 'Field is required';
    } else if (props.min && value.length < +props.min) {
      error = `Minimum ${props.min} characters are required`;
    } else if (props.max && value.length > +props.max) {
      error = `Maximum ${props.max} characters are required`;
    } else if (props.pattern && !props.pattern.match(value)) {
      error = 'Invalid format';
    } else if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Invalid email address';
      }
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debouncedOnChange(e);
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (editable) setIsEditable(false);
    onBlur?.(e);
  };

  return (
    <div id="ipf-container" className={`w-full ${mainContainerStyles}`}>
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

      <div id="input-container" className="relative flex items-center">
        <input
          className={`text-md min-h-9 w-full rounded-sm border p-1 text-neutral-950 placeholder-zinc-500 placeholder:text-sm focus:border focus:outline-none ${
            disabled || !isEditable
              ? 'cursor-not-allowed bg-gray-100 text-neutral-400'
              : 'bg-white'
          } ${inputStyles} ${type === 'password' && 'pr-10'} ${
            errorMessage
              ? 'border-rose-600 focus:border-rose-700 focus:bg-rose-300/10'
              : 'focus:border-zinc-300 focus:bg-slate-400/10'
          }z-0`}
          type={type === 'password' && isPasswordVisible ? 'text' : type}
          placeholder={props.placeholder}
          value={inputValue}
          disabled={disabled || !isEditable}
          onChange={handleChange}
          onBlur={handleOnBlur}
          required={required}
          autoComplete={autoComplete}
          autoFocus
          role="textbox"
          {...props}
        />
        {type !== 'hidden' && (
          <div className="absolute top-1/2 right-2 flex -translate-y-1/2 gap-1">
            {type === 'password' && (
              <ClickButton
                id="show-password-button"
                className="text-gray-400"
                variant="none"
                size="none"
                type="button"
                onClick={() => setPasswordVisible(!isPasswordVisible)}
                aria-label={
                  isPasswordVisible ? 'Hide password' : 'Show password'
                }
              >
                {isPasswordVisible ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </ClickButton>
            )}

            {type !== 'password' &&
              type !== 'month' &&
              type !== 'date' &&
              editable && (
                <ClickButton
                  id="edit-toggle"
                  variant="none"
                  size="none"
                  className="text-gray-500"
                  type="button"
                  onClick={() => setIsEditable(!isEditable)}
                  aria-label={isEditable ? 'Disable editing' : 'Enable editing'}
                >
                  {isEditable ? (
                    <PencilOff className="h-5 w-5" />
                  ) : (
                    <Pencil className="h-5 w-5" />
                  )}
                </ClickButton>
              )}
            {verified !== 'none' &&
              (type === 'text' || type === 'email' || type === 'tel') &&
              (verified ? (
                <CircleCheck id="verified" size={18} className="text-success" />
              ) : (
                <CircleAlert
                  id="unverified"
                  size={18}
                  className="text-danger"
                />
              ))}
          </div>
        )}
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

export default FieldInput;
