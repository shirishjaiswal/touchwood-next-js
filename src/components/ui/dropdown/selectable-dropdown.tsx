import { useState, useEffect } from "react";
import Select, { MultiValue, SingleValue, Props } from "react-select";
import { BaseFieldProps, EventInterface } from "../type";
import { ReactSelectOption } from "./types";
import { getEventFormat } from "../helper";
import { reactSelectStyles } from "./styles";

export interface SelectableDropdownOnChangeEvent extends EventInterface {
  target: {
    value: ReactSelectOption[];
    validationMessage: string | undefined;
  };
}

export interface SelectableDropdownProps extends BaseFieldProps {
  options: ReactSelectOption[];
  isMultiSelect?: boolean;
  onChange: (event: SelectableDropdownOnChangeEvent) => void;
  customComponents?: Partial<Props<ReactSelectOption>["components"]>;
  selectedValues?: ReactSelectOption[];
}

const SelectableDropdown: React.FC<SelectableDropdownProps> = ({
  label,
  description,
  required = false,
  disabled,
  options,
  isMultiSelect = false,
  onChange,
  customComponents,
  errorMessage,
  mainContainerStyles,
  infoContainerStyles,
  labelStyles,
  descriptionStyles,
  errorStyles,
  selectedValues, // ✅
}) => {
  const [dropOptions, setDropOptions] = useState<ReactSelectOption[]>(options);
  const [selectedOptions, setSelectedOptions] = useState<ReactSelectOption[]>([]);

  useEffect(() => {
    setDropOptions(options);
  }, [options]);

  const getError = (): string => {
    if (required && selectedOptions.length === 0) {
      return "Field is required";
    }
    return errorMessage || "";
  };

  const handleChange = (
    newValue: MultiValue<ReactSelectOption> | SingleValue<ReactSelectOption>,
  ) => {
    const selected = (Array.isArray(newValue) ? newValue : newValue ? [newValue] : []) as ReactSelectOption[];

    setSelectedOptions(selected);

    const updatedOptions = dropOptions.map((item) => ({
      ...item,
      isSelected: selected.some((selectedItem) => selectedItem.value === item.value),
    }));

    setDropOptions(updatedOptions);

    const event = getEventFormat(selected, getError()) as SelectableDropdownOnChangeEvent;
    onChange(event);
  };

  return (
    <div id="sd-container" className={mainContainerStyles}>
      <div id="info-container" className={infoContainerStyles}>
        {label && (
          <label
            id="label"
            className={`${labelStyles ?? "text-md font-medium text-stone-950"} ${required ? 'after:content-["*"] after:text-rose-700 after:ml-1' : ""}`}
          >
            {label}
          </label>
        )}
        {description && (
          <p id="description" className={`${descriptionStyles ?? "text-zinc-800 text-xs font-light"}`}>
            {description}
          </p>
        )}
      </div>

      <div id="input-container" className="relative flex items-center w-full">
        <Select
          id="selectable-dropdown"
          instanceId="selectable-dropdown"
          key="selectable-dropdown"
          className="text-roboto text-sm w-full"
          isDisabled={disabled}
          isMulti={isMultiSelect}
          placeholder={isMultiSelect ? "Select Options" : "Select Option"}
          styles={reactSelectStyles}
          options={dropOptions ?? []}
          value={selectedValues ?? selectedOptions} // ✅ controlled or internal state
          onChange={handleChange}
          menuPlacement="auto"
          components={customComponents}
        />
      </div>

      {errorMessage && (
        <div id="error-message" className={`text-rose-700 ${errorStyles ?? "text-sm font-medium"}`}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SelectableDropdown;
