'use client'
import { inputStyles } from "@/app/auth/login/components/form-container";
import { ModalBox } from "@/components/ui/dialogueBox/modal-box";
import FieldInput from "@/components/ui/input/field-input";
import ClickButton from "@/components/ui/button/click-button";
import { useState } from "react";
import { Add } from "@/components/ui/icons";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type AddTabPopupProps = {
  length: number;
};

function AddTabPopup({ length }: AddTabPopupProps) {
	const [isActiveTabModalOpen, setIsActiveTabModalOpen] = useState(false);
	const router = useRouter();

  const handleCreateTab = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const tabLabel = formData.get("tab-label") as string;
		const tabDescription = formData.get("tab-description") as string;
		try {
			await axios.post(`/api/form-data/tab/create`, {
				label: tabLabel,
				description: tabDescription,
        position: length,
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
				id="new-tab"
				label="Add New Tab"
				variant="none"
				size="none"
				onClick={() => setIsActiveTabModalOpen(true)}
			>
				<div className="flex justify-center items-center gap-2">
					<Add color="#9CA3AF" />
				</div>
			</ClickButton>
			<ModalBox
				isOpen={isActiveTabModalOpen}
				onClose={() => setIsActiveTabModalOpen(false)}
				title="Add New Tab"
				subtitle="Please enter tab details, tab name, tab label, and tab description (optional)"
			>
				<form className="user-details--tab__form flex w-full flex-col gap-4" onSubmit={handleCreateTab}>
					<FieldInput
						id="tab-label"
						name="tab-label"
						aria-label="tab-label"
						data-testid="tab-label"
						label="Tab label"
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
						type="text"
						inputStyles={inputStyles}
					/>
					<div className="flex w-full justify-end gap-4">
						<ClickButton
							id="create-tab"
							label="Create"
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

export default AddTabPopup;
