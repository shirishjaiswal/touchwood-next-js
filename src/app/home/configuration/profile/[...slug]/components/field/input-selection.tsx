import { StylesConfig } from "react-select";
import { ReactSelectOption } from "@/components/ui/dropdown/types";
import SelectableDropdown, {
  SelectableDropdownOnChangeEvent,
} from "@/components/ui/dropdown/selectable-dropdown";

export const InputOptions: ReactSelectOption[] = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "email", label: "Email" },
  { value: "password", label: "Password" },
  { value: "tel", label: "Telephone" },
  { value: "url", label: "URL" },
  { value: "list", label: "List" },
  { value: "checkbox", label: "Checkbox" },
  { value: "date", label: "Date" },
  { value: "duration", label: "Duration" },
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
];

type InputSelectionProps = {
  onChange: (value: string | null) => void;
  value: string | null;
  reactSelectStyle?: StylesConfig<ReactSelectOption, boolean>;
};

function InputSelection({ onChange, value, reactSelectStyle }: InputSelectionProps) {
  const onSelectChange = (event: SelectableDropdownOnChangeEvent) => {
    const selected = event.target.value.find((option) => option.isSelected)?.value || null;
    onChange(selected);
  };

  // Reflect the current selected state in the options
  const updatedOptions = InputOptions.map((opt) => ({
    ...opt,
    isSelected: opt.value === value,
  }));

  return (
    <SelectableDropdown
      id="input-selection"
      name="input-selection"
      aria-label="input-selection"
      data-testid="input-selection"
      label="Input Selection"
      options={updatedOptions}
      onChange={onSelectChange}
      reactSelectStyle={reactSelectStyle}
    />
  );
}

export default InputSelection;
