import { inputStyles } from "@/app/auth/login/components/form-container";
import { ModalBox } from "@/components/ui/dialogueBox/modal-box";
import FieldInput from "@/components/ui/input/field-input";
import ClickButton from "@/components/ui/button/click-button";
import { useState } from "react";
import { Edit } from "@/components/ui/icons";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormDataTab_Read } from "@/lib/types/form-data/tab";

export type EditTabPopupProps = {
  tab: FormDataTab_Read;
  className?: string;
};
function EditTabPopup({ tab, className }: EditTabPopupProps) {
  const [isActiveTabModalOpen, setIsActiveTabModalOpen] = useState(false);
  const router = useRouter();

  const handleDeleteTab = async () => {
    try {
      await axios.delete(`/api/form-data/tab/delete/${tab.id}`);
      toast.success("Tab deleted successfully");
      setIsActiveTabModalOpen(false);
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Error deleting tab");
      }
    }
  };

  const handleUpdateTab = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tabLabel = formData.get("tab-label") as string;
    const tabDescription = formData.get("tab-description") as string;
    const tabClick = formData.getAll("tab-click");
    console.log(tabLabel, tabDescription, tabClick);
    try {
      await axios.put(`/api/form-data/tab/update`, {
        id: tab.id,
        uniqueKey: tab.uniqueKey,
        label: tabLabel,
        description: tabDescription,
        link: tab.link,
        position: tab.position,
      });
      toast.success("Tab created successfully");
      setIsActiveTabModalOpen(false);
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Error updating tab");
      }
    }
  };
  return (
    <>
      <ClickButton
        id={`edit-${tab?.uniqueKey}`}
        variant="none"
        size="none"
        className={`active-tab--edit-button group-hover:block ${className}`}
        onClick={() => setIsActiveTabModalOpen(true)}
      >
        <Edit width={20} height={20} color="#9CA3AF" />
      </ClickButton>
      <ModalBox
        isOpen={isActiveTabModalOpen}
        onClose={() => setIsActiveTabModalOpen(false)}
        title="Edit Tab"
        subtitle="Please enter tab details, tab name, tab label, and tab description (optional)"
      >
        <form
          className="user-details--tab__form flex w-full flex-col gap-4"
          onSubmit={handleUpdateTab}
        >
          <FieldInput
            id="tab-label"
            name="tab-label"
            aria-label="tab-label"
            data-testid="tab-label"
            label="Tab label"
            value={tab?.label}
            type="text"
            required
            inputStyles={inputStyles}
          />
          <FieldInput
            id="tab-description"
            name="tab-description"
            aria-label="tab-description"
            data-testid="tab-description"
            label="Tab Description"
            value={tab?.description}
            type="text"
            inputStyles={inputStyles}
          />
          <div className="flex w-full justify-end gap-4">
            <ClickButton
              id="delete-tab"
              label="Delete"
              type="button"
              size="md"
              variant="shadow-red"
              className="w-full sm:w-fit sm:justify-end"
              onClick={handleDeleteTab}
            />
            <ClickButton
              id="update-tab"
              label="Update"
              type="submit"
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

export default EditTabPopup;
