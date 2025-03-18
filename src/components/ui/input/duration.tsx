import React, { useCallback } from 'react';
import { BaseFieldProps, EventInterface } from '@/components/ui/type';
import { getEventFormat } from '@/components/ui/helper';
import SelectBox from '@/components/ui/checkBox/select-box';
import FieldInput from '@/components/ui/input/field-input';

export type DurationValue = {
  startDate: string | undefined;
  endDate: string | undefined;
  isOngoing: boolean;
};

export interface DurationOnChangeEvent extends EventInterface {
  target: {
    value: DurationValue;
    validationMessage: string | undefined;
  };
}

interface DurationProps extends BaseFieldProps {
  variant?: 'month' | 'date';
  value: DurationValue;
  onChange?: (event: DurationOnChangeEvent) => void;
  boxContainerStyles?: string;
  inputStyles?: string;
}

const Duration: React.FC<DurationProps> = ({
  label,
  description,
  required,
  variant = 'date',
  value,
  errorMessage,
  onChange,
  mainContainerStyles,
  infoContainerStyles,
  labelStyles,
  descriptionStyles,
  boxContainerStyles,
  inputStyles,
  errorStyles,
}) => {
  const handleStateUpdates = useCallback(
    (
      updateValue: string | boolean | undefined,
      type: 'startDate' | 'endDate' | 'ongoing',
    ): DurationOnChangeEvent => {
      let start: string | undefined = value.startDate;
      let end: string | undefined = value.endDate;
      let ongoing: boolean = value.isOngoing;
      let error: string | undefined = undefined;
      let duration: DurationValue | undefined = undefined;

      if (type === 'startDate' && typeof updateValue === 'string') {
        start = updateValue;
      } else if (type === 'endDate' && typeof updateValue === 'string') {
        end = updateValue;
      } else if (type === 'ongoing' && typeof updateValue === 'boolean') {
        ongoing = updateValue;
        if (ongoing) {
          end = undefined;
        }
      }

      error = getError(start, end, ongoing);
      duration = { startDate: start, endDate: end, isOngoing: ongoing };
      const event = getEventFormat(duration, error) as DurationOnChangeEvent;
      return event;
    },
    [value],
  );

  const handleChange = (
    value: string | boolean | undefined,
    type: 'startDate' | 'endDate' | 'ongoing',
  ) => {
    const onChangeData: DurationOnChangeEvent = handleStateUpdates(value, type);
    if (onChange) {
      onChange(onChangeData);
    }
  };

  const getError = (
    startDate: string | undefined,
    endDate: string | undefined,
    isOngoing: boolean,
  ) => {
    let error = undefined;

    if (required && !startDate) {
      error = 'Start Date is required';
    } else if (required && !isOngoing && !endDate) {
      error = 'Either End Date or Ongoing status is required';
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      error = 'Start Date cannot be greater than End Date';
    }
    return error;
  };

  return (
    <div id="duration-container" className={`${mainContainerStyles}`}>
      <div id="info-container" className={`${infoContainerStyles}`}>
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
      <div
        id="duration-container-box"
        className={`flex flex-col gap-2 md:flex-row md:items-end md:gap-6 ${boxContainerStyles} `}
      >
        <FieldInput
          label="From : "
          type={variant}
          value={value.startDate}
          inputStyles={inputStyles}
          onChange={(e: {
            target: { value: string | boolean | undefined };
          }) => {
            handleChange(e.target.value, 'startDate');
          }}
          id="duration-start-date"
          name="duration-start-date"
          aria-label="duration-start-date"
          data-testid="duration-start-date"
        />

        <FieldInput
          label="To :"
          type={variant}
          value={value.isOngoing ? '' : value.endDate}
          disabled={value.isOngoing}
          inputStyles={inputStyles}
          onChange={(e: {
            target: { value: string | boolean | undefined };
          }) => {
            if (!value.isOngoing) {
              handleChange(e.target.value, 'endDate');
            }
          }}
          id="duration-end-date"
          name="duration-end-date"
          aria-label="duration-end-date"
          data-testid="duration-end-date"
        />

        <SelectBox
          option={{ label: 'On Going', checked: value.isOngoing }}
          onTick={(event) =>
            handleChange(event.target.value.checked, 'ongoing')
          }
          id="duration-ongoing"
          name="duration-ongoing"
          aria-label="duration-ongoing"
          data-testid="duration-ongoing"
        />
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

export default Duration;
