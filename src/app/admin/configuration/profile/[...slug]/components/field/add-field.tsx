"use client";

import { useState } from "react";

import { Add } from "@/components/ui/icons";
import Toggle from "@/components/ui/button/toggle";
import FieldInput from "@/components/ui/input/field-input";
import ClickButton from "@/components/ui/button/click-button";
import { ModalBox } from "@/components/ui/dialogueBox/modal-box";
import { inputStyles } from "@/app/auth/login/components/form-container";
import InputSelection from "@/app/admin/configuration/profile/[...slug]/components/field/input-selection";
import CreatableDropdown, { CreatableDropdownOnChangeEvent } from "@/components/ui/dropdown/creatable-dropdown";
import Duration, { DurationOnChangeEvent } from "@/components/ui/input/duration";

function AddField() {
  const [isAddFieldModalOpen, setAddFieldModalOpen] = useState<boolean>(false);

  const [selectedInputField, setSelectedInputField] = useState<string | null>(
    null
  );
  console.log(selectedInputField);
  return (
    <>
      <ClickButton
        id="add-field"
        label="Add New field"
        variant="shadow-default"
        size="md"
        onClick={setAddFieldModalOpen.bind(null, true)}
      >
        <div className="flex justify-center items-center gap-2">
          <Add />
          <p>Add New Field</p>
        </div>
      </ClickButton>
      <ModalBox
        isOpen={isAddFieldModalOpen}
        onClose={setAddFieldModalOpen.bind(null, false)}
        title="Add New Field"
        subtitle="Please enter field details, field name, field label and field description (optional)"
      >
        <form className="user-details--new-field__form flex flex-col w-full gap-4">
          <InputSelection
            value={selectedInputField}
            onChange={setSelectedInputField}
          />
          <FieldInput
            id="field-label"
            name="field-label"
            aria-label="field-label"
            data-testid="field-label"
            label="Label"
            type="text"
            required
            inputStyles={inputStyles}
          />
          <FieldInput
            id="field-description"
            name="field-description"
            aria-label="field-description"
            data-testid="field-description"
            label="Description"
            type="text"
            inputStyles={inputStyles}
          />
          {selectedInputField === "list" && (
            <CreatableDropdown
              label="Options List"
              id="field-options"
              name="field-options"
              aria-label="field-options"
              data-testid="field-options"
              options={[]}
              onChange={function (event: CreatableDropdownOnChangeEvent): void {
                throw new Error("Function not implemented.");
              }}
              onCreateOption={function (
                event: CreatableDropdownOnChangeEvent
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
          {selectedInputField === "duration" && (
            <div className="w-full">
              <Duration
              label="Duration"
              id="field-duration"
              name="field-duration"
              aria-label="field-duration"
              data-testid="field-duration"
              onChange={function (event: DurationOnChangeEvent): void {
                console.log(event);
              }}
              value={{
                startDate: undefined,
                endDate: undefined,
                isOngoing: false,
              }}
            />
            </div>
          )}
          <div className="grid grid-cols-2 lg:grid-cols-3 ">
            <Toggle
              label="Label Visible"
              id="field-label-toggle"
              name="field-label-toggle"
              aria-label="field-label-toggle"
              data-testid="field-label-toggle"
              mainContainerStyles="w-full flex gap-4 items-center"
            />
            <Toggle
              label="Required"
              id="field-required"
              name="field-required"
              aria-label="field-required"
              data-testid="field-required"
              mainContainerStyles="w-full flex gap-4 items-center"
            />
            {selectedInputField === "checkbox" && (
              <Toggle
                label="Multi-Select"
                id="field-multi-select"
                name="field-multi-select"
                aria-label="field-multi-select"
                data-testid="field-multi-select"
                mainContainerStyles="w-full flex gap-4 items-center"
              />
            )}
          </div>
          <div className="flex w-full justify-end">
            <ClickButton
              id="add-field"
              label="Add"
              size="md"
              variant="shadow-default"
              className="w-full sm:w-fit sm:justify-end"
            />
          </div>
        </form>
      </ModalBox>
    </>
  );
}
export default AddField;
