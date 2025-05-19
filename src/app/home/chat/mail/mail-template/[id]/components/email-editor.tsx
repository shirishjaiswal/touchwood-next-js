import { inputStyles } from "@/app/auth/login/components/form-container";
import AiHelpBox from "@/components/ui/ai/ai-help-box";
import ClickButton from "@/components/ui/button/click-button";
import SelectableDropdown, {
  SelectableDropdownOnChangeEvent,
} from "@/components/ui/dropdown/selectable-dropdown";
import { ReactSelectOption } from "@/components/ui/dropdown/types";
import FieldInput from "@/components/ui/input/field-input";
import React, { useState } from "react";

type EmailEditorProps = {
  emailBody: string;
  emailSubject: string;
  accessModifierId: number;
  setAccessModifierId: (accessModifierId: number) => void;
  handleRun: () => void;
  currentView: "code" | "view";
  handleSubjectChange: (data: string) => void;
  handleBodyChange: (data: string) => void;
  accessModifiers: { id: number; value: string }[];
};

const getReactSelectOptions = (
  accessModifiers: { id: number; value: string }[]
): ReactSelectOption[] => {
  return accessModifiers.map((modifier) => ({
    label: modifier.value,
    value: String(modifier.id),
    isDisabled: false,
  }));
};

function EmailEditor({
  emailBody,
  emailSubject,
  setAccessModifierId,
  accessModifierId,
  handleRun,
  currentView,
  handleSubjectChange,
  handleBodyChange,
  accessModifiers,
}: EmailEditorProps) {
  const options = getReactSelectOptions(accessModifiers);
  const selectedAccessModifierOption = options.find(
    (option) => Number(option.value) === accessModifierId
  );

  const handleSelect = (event: SelectableDropdownOnChangeEvent) => {
    const selectedOption = event.target.value?.[0];
    if (selectedOption) {
      setAccessModifierId(Number(selectedOption.value));
    }
  };

  return (
    <div
      className={`w-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 ${
        currentView === "code" ? "" : "hidden md:flex"
      } min-h-0 flex-1`}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Email Editor</h2>
          <SelectableDropdown
            id="access-modifier"
            name="access-modifier"
            aria-label="access-modifier"
            data-testid="access-modifier"
            options={options}
            required
            selectedValues={
              selectedAccessModifierOption ? [selectedAccessModifierOption] : []
            }
            onChange={handleSelect}
          />
          <ClickButton
            id="run-template"
            variant="outline-default"
            size="xs"
            onClick={handleRun}
          >
            Run Template
          </ClickButton>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-4 p-4">
        <FieldInput
          id="email-subject"
          name="email-subject"
          aria-label="email-subject"
          data-testid="email-subject"
          label="Email Subject"
          type="text"
          required
          inputStyles={inputStyles}
          value={emailSubject}
          onChange={(e) => handleSubjectChange(e.target.value)}
        />
        <label className="text-base font-semibold text-neutral-700">
          Email Template
        </label>
        <div className="relative">
          <textarea
            value={emailBody}
            required
            rows={18}
            onChange={(e) => handleBodyChange(e.target.value)} 
            className={`w-full h-max border-none resize-none font-mono text-sm text-gray-700 bg-gray-50 rounded-md p-3 focus:outline-none ${inputStyles}`}
            spellCheck="false"
            placeholder="Edit your email template here..."
          />
          <AiHelpBox
            data={emailBody} 
            updateData={handleBodyChange} 
          />
        </div>
      </div>
    </div>
  );
}

export default EmailEditor;
