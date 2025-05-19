import { inputStyles } from "@/app/auth/login/components/form-container";
import ClickButton from "@/components/ui/button/click-button";
import Toggle from "@/components/ui/button/toggle";
import { ModalBox } from "@/components/ui/dialogueBox/modal-box";
import { Edit } from "@/components/ui/icons";
import FieldInput from "@/components/ui/input/field-input";
import { FormDataGroup_Read } from "@/lib/types/form-data/group";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { setScreenLoading } from "@/hooks/use-screen-loading";

type EditGroupProps = {
  groupContent: FormDataGroup_Read;
};

function EditGroup({ groupContent }: EditGroupProps) {
  const router = useRouter();
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [labelVisible, setLabelVisible] = useState<boolean>(
    groupContent.labelVisible
  );
  const [multiple, setMultiple] = useState<boolean>(groupContent.multiple);
  const [required, setRequired] = useState<boolean>(groupContent.required);
  const [description, setDescription] = useState<string>(
    groupContent.description
  );
  const [label, setLabel] = useState<string>(groupContent.label);

  const handleDeleteGroup = async () => {
    setScreenLoading(true);
    try {
      await axios.delete(`/api/form-data/group/delete/${groupContent.id}`);
      toast.success("Tab deleted successfully");
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Error deleting tab");
      }
    } finally {
      setScreenLoading(false);
    }
  }
  const handleUpdateGroupFields = async () => {
    setScreenLoading(true);
		try {
			await axios.put(`/api/form-data/group/update/${groupContent.id}`, {
				label: label,
				description: description,
				labelVisible: labelVisible,
				multiple: multiple,
				required: required,
				formDataTabId: groupContent.formDataTab.id,
			});
			toast.success("Tab created successfully");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data.message || "Error updating tab");
			}
		} finally {
			setEditMode(false);
      setScreenLoading(false);
		}
	};

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-4">
          <h1 className="text-xl font-semibold text-primary-600">
            {groupContent.label}
          </h1>
          <ClickButton
            id="edit-group"
            variant="none"
            size="none"
            onClick={(e) => {
              e.stopPropagation();
              setEditMode(true);
            }}
          >
            <Edit />
          </ClickButton>
        </div>
        <ModalBox
          isOpen={isEditMode}
          onClose={() => setEditMode(false)}
          title={`Edit Group : ${groupContent.label}`}
          subtitle="Please enter group details, group name, group label and group description (optional)"
        >
          <form className="user-details--new-group__form flex flex-col w-full gap-4">
            <FieldInput
              id="group-label"
              name="group-label"
              aria-label="group-label"
              data-testid="group-label"
              label="Group label"
              type="text"
              required
              onChange={(e) => setLabel(e.target.value)}
              inputStyles={inputStyles}
              value={groupContent.label}
            />
            <FieldInput
              id="group-description"
              name="group-description"
              aria-label="group-description"
              data-testid="group-description"
              label="Group description"
              type="text"
              required
              onChange={(e) => setDescription(e.target.value)}
              inputStyles={inputStyles}
              value={groupContent.description}
            />
            <div className="flex-col flex md:flex-row gap-4">
              <Toggle
                label="Show group label"
                id="group-label-toggle"
                name="group-label-toggle"
                aria-label="group-label-toggle"
                data-testid="group-label-toggle"
                mainContainerStyles="w-full flex gap-4 items-center"
                value={labelVisible}
                onChange={() => setLabelVisible(!labelVisible)}
                required
              />
              <Toggle
                label="Can be multiple"
                id="multiple-toggle"
                name="multiple-toggle"
                aria-label="multiple-toggle"
                data-testid="multiple-toggle"
                value={multiple}
                mainContainerStyles="w-full flex gap-4 items-center"
                onChange={() => setMultiple(!multiple)}
                required
              />
              <Toggle
                label="Required"
                id="required-toggle"
                name="required-toggle"
                aria-label="required-toggle"
                data-testid="required-toggle"
                value={required}
                mainContainerStyles="w-full flex gap-4 items-center"
                onChange={() => setRequired(!required)}
                required
              />
            </div>
            <div className="flex w-full justify-end gap-4">
              <ClickButton
                id="delete-group"
                label="Delete"
                type="button"
                onClick={handleDeleteGroup}
                size="md"
                variant="shadow-red"
                className="w-full sm:w-fit sm:justify-end"
              />
              <ClickButton
                id="add-group"
                label="Update"
                type="button"
                size="md"
                variant="shadow-default"
                onClick={handleUpdateGroupFields}
                className="w-full sm:w-fit sm:justify-end"
              />
            </div>
          </form>
        </ModalBox>
      </div>
    </>
  );
}

export default EditGroup;
