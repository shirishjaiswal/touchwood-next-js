'use client';
import { useState } from 'react';
import { MultiValue, SingleValue, Props, StylesConfig } from 'react-select';
import dynamic from 'next/dynamic'; // Import dynamic from Next.js
import { BaseFieldProps, EventInterface } from '@/components/ui/type';
import { ReactSelectOption } from '@/components/ui/dropdown/types';
import { generateUniqueKey } from '@/components/ui/dropdown/helper';
import { getEventFormat } from '@/components/ui/helper';
import { styleForTags } from '@/components/ui/dropdown/styles';
import { ActionMeta } from 'react-select';

// Dynamically import CreatableSelect with SSR disabled
const CreatableSelect = dynamic(() => import('react-select/creatable'), {
  ssr: false, // Disable SSR for this component
});

export interface CreatableDropdownOnChangeEvent extends EventInterface {
  target: {
    value: ReactSelectOption[];
    validationMessage: string | undefined;
  };
}

export interface CreatableDropdownProps extends BaseFieldProps {
  options: ReactSelectOption[];
  listType?: boolean;
  onChange: (event: CreatableDropdownOnChangeEvent) => void;
  onCreateOption: (event: CreatableDropdownOnChangeEvent) => void;
  customComponents?: Partial<Props<ReactSelectOption>['components']>;
}

const CreatableDropdown: React.FC<CreatableDropdownProps> = ({
  label,
  required = false,
  description,
  disabled,
  listType = false,
  options,
  onChange,
  onCreateOption,
  errorMessage,
  mainContainerStyles,
  infoContainerStyles,
  labelStyles,
  descriptionStyles,
  errorStyles,
  customComponents = {},
}) => {
  const [dropOptions, setDropOptions] = useState<ReactSelectOption[]>(options);
  const [selectedOptions, setSelectedOptions] = useState<ReactSelectOption[]>([]);

  const MultiValueLabel = ({ data }: { data: ReactSelectOption }) => {
    if (!data) return <></>;
    const index = selectedOptions.findIndex((option) => option.value === data.value) + 1;
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '4px',
          fontSize: '14px',
          width: '100%',
        }}
      >
        <span style={{ fontWeight: 'bold', color: '#1E40AF', marginRight: '6px' }}>
          {index}.
        </span>
        {data.label}
      </div>
    );
  };

  const handleCreateOption = (inputValue: string) => {
    const newOption: ReactSelectOption = {
      value: generateUniqueKey(inputValue),
      label: inputValue,
      isSelected: true,
      isDisabled: false,
      __isNew__: true,
    };

    setDropOptions([...dropOptions, newOption]);
    setSelectedOptions([...selectedOptions, newOption]);
    const event = getEventFormat([...dropOptions, newOption], getError()) as CreatableDropdownOnChangeEvent;
    onCreateOption(event);
  };

  const handleListChange = (
    newValue: MultiValue<ReactSelectOption> | SingleValue<ReactSelectOption>,
  ) => {
    const selected = (
      Array.isArray(newValue) ? newValue : newValue ? [newValue] : []
    ) as ReactSelectOption[];

    const updatedOptions = dropOptions.filter((option) =>
      option.__isNew__
        ? selected.some((selectedItem) => selectedItem.value === option.value)
        : true,
    );

    setDropOptions(updatedOptions);
    setSelectedOptions(selected);

    const event = getEventFormat(selected, getError()) as CreatableDropdownOnChangeEvent;
    onChange(event);
  };

  const handleCreatableChange = (
    newValue: MultiValue<ReactSelectOption> | SingleValue<ReactSelectOption>,
  ) => {
    const selected = (
      Array.isArray(newValue) ? newValue : newValue ? [newValue] : []
    ) as ReactSelectOption[];

    setSelectedOptions(selected);

    setDropOptions(
      dropOptions.map((item) => ({
        ...item,
        isSelected: selected.some((selectedItem) => selectedItem.value === item.value),
      })),
    );

    const event = getEventFormat(selected, getError()) as CreatableDropdownOnChangeEvent;
    onChange(event);
  };

  
  const handleChange = (
    newValue: MultiValue<ReactSelectOption> | SingleValue<ReactSelectOption>,
  ) => {
    if (listType) handleListChange(newValue);
    else handleCreatableChange(newValue);
  };

  const getError = (): string | undefined => {
    let error: string | undefined = undefined;
    if (required && selectedOptions.length === 0) {
      error = 'Field is required';
    }
    return error;
  };

  return (
    <div id="cd-container" className={mainContainerStyles}>
      <div id="info-container" className={infoContainerStyles}>
        {label && (
          <label
            id="label"
            className={`${labelStyles ?? 'text-md font-medium text-stone-950'} ${
              required ? 'after:ml-1 after:text-rose-700 after:content-["*"]' : ''
            }`}
          >
            {label}
          </label>
        )}
        {description && (
          <p
            id="description"
            className={descriptionStyles ?? 'text-xs font-light text-zinc-800'}
          >
            {description}
          </p>
        )}
      </div>

      <div id="input-container" className="relative flex w-full items-center">
        <CreatableSelect
          key="creatable-select"
          isDisabled={disabled}
          isMulti={true}
          placeholder=""
          options={dropOptions}
          styles={styleForTags as StylesConfig<unknown, boolean>}
          components={{ MultiValueLabel, ...(customComponents as Partial<Props<unknown>['components']>) }}
          onChange={handleChange as (newValue: unknown, actionMeta: ActionMeta<unknown>) => void}
          value={selectedOptions}
          onCreateOption={handleCreateOption}
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

export default CreatableDropdown;