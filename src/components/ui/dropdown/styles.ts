import { StylesConfig } from "react-select";
import { ReactSelectOption } from "./types";



export const reactSelectStyles: StylesConfig<ReactSelectOption, boolean> = {
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#FFFFFF",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "6px",
    padding: "0",
    zIndex: 1000,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#075985"
      : state.isFocused
      ? "#bfdbfe"
      : "transparent",
    color: state.isSelected ? "#FFFFFF" : "#111827",
    fontSize: "0.75rem",
    padding: "6px 10px",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#9CA3AF",
    fontStyle: "italic",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#111827",
    fontWeight: 400,
    fontSize: "0.75rem",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#9CA3AF",
    "&:hover": {
      color: "#374151",
    },
  }),
  control: (provided, state) => ({
    ...provided,
    width: '100px',
    padding: "0 6px",
    height: "30px",
    backgroundColor: state.isDisabled ? "#F3F4F6" : "#F9FAFB",
    border: state.isFocused
      ? "1px solid #3B82F6"
      : "1px solid #D1D5DB",
    borderRadius: "6px",
    boxShadow: "none",
    cursor: state.isDisabled ? "not-allowed" : "text",
    display: "flex",
    alignItems: "center",
    fontSize: "0.75rem",
    lineHeight: "1.2",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#E0F2FE",
    borderRadius: "9999px",
    padding: "2px 8px",
    display: "flex",
    alignItems: "center",
    fontSize: "0.75rem",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#0F172A",
    fontSize: "0.75rem",
    fontWeight: 500,
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#3B82F6",
    cursor: "pointer",
    marginLeft: "4px",
    borderRadius: "50%",
    width: "16px",
    height: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      color: "#EF4444",
      backgroundColor: "#FEE2E2",
    },
  }),
  indicatorSeparator: () => ({ display: "none" }),
  valueContainer: (provided) => ({
    ...provided,
    display: "flex",
    flexWrap: "wrap",
    gap: "4px",
    padding: "0",
    alignItems: "center",
  }),
  indicatorsContainer: () => ({
    display: "none",
  }),
};


export const styleForTags: StylesConfig<ReactSelectOption, boolean> = {
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
  control: (provided) => ({
    ...provided,
    width: "100%",
    padding: "6px 6px",
    height: "auto",
    backgroundColor: "#F9FAFB",
    border: "1px solid #056D82",
    borderRadius: "6px",
    boxShadow: "-moz-initial",
    cursor: "text",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: "12px",
    lineHeight: "1.2",
    "&:hover": {
      borderColor: "#3B82F6",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    display: "flex",
    flexWrap: "wrap",
    gap: "4px",
    padding: "0", 
    alignItems: "center",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#E0F2FE",
    borderRadius: "9999px",
    padding: "2px 8px",
    alignItems: "center",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    width: "100%",
    alignItems: "center",
    position: "relative",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#3B82F6",
    cursor: "pointer",
    marginLeft: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      color: "#EF4444",
      backgroundColor: "#FEE2E2",
    },
  }),
  menu: () => ({
    display: "none",
  }),
  indicatorsContainer: () => ({
    display: "none",
  }),
};

