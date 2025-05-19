'use client'
import { inputStyles } from "@/app/auth/login/components/form-container";
import ClickButton from "@/components/ui/button/click-button";
import Toggle from "@/components/ui/button/toggle";
import { ModalBox } from "@/components/ui/dialogueBox/modal-box";
import { Add } from "@/components/ui/icons";
import FieldInput from "@/components/ui/input/field-input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { setScreenLoading } from "@/hooks/use-screen-loading";

type AddGroupProps = {
	formDataTabId: number;
};
function AddGroup({ formDataTabId }: AddGroupProps) {
	const [addNewGroupModalOpen, setAddNewGroupModalOpen] =
		useState<boolean>(false);
	const router = useRouter();
	const [label, setLabel] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [labelVisible, setLabelVisible] = useState<boolean>(false);
	const [multiple, setMultiple] = useState<boolean>(false);
	const [required, setRequired] = useState<boolean>(false);
	const handleAddNewGroup = async () => {
		setScreenLoading(true);
		try {
			await axios.post(`/api/form-data/group/create`, {
				label: label,
				description: description,
				labelVisible: labelVisible,
				multiple: multiple,
				required: required,
				formDataTabId: formDataTabId,
			});
			toast.success("Tab created successfully");
			setAddNewGroupModalOpen(false);
			router.refresh();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data.message || "Error updating tab");
			}
		} finally {
			setAddNewGroupModalOpen(false);
			setScreenLoading(false);
		}
	};
	return (
		<>
			<ClickButton
				id="add-group"
				label="Add New Group"
				variant="shadow-default"
				size="md"
				onClick={setAddNewGroupModalOpen.bind(null, true)}
			>
				<div className="flex justify-center items-center gap-2">
					<Add />
					<p>Add New Group</p>
				</div>
			</ClickButton>
			<ModalBox
				isOpen={addNewGroupModalOpen}
				onClose={setAddNewGroupModalOpen.bind(null, false)}
				title="Add New Group"
				subtitle="Please enter group details, group name, group label and group description (optional)"
			>
				<form
					className="user-details--new-group__form flex flex-col w-full gap-4"
				>
					<FieldInput
						id="group-label"
						name="group-label"
						aria-label="group-label"
						data-testid="group-label"
						label="Group label"
						type="text"
						onChange={(e) => setLabel(e.target.value)}
						required
						inputStyles={inputStyles}
					/>
					<FieldInput
						id="group-description"
						name="group-description"
						aria-label="group-description"
						data-testid="group-description"
						label="Group description"
						type="text"
						onChange={(e) => setDescription(e.target.value)}
						inputStyles={inputStyles}
					/>
					<div className="flex flex-col md:flex-row gap-4">
						<Toggle
							label="Show group label"
							id="group-label-toggle"
							name="group-label-toggle"
							aria-label="group-label-toggle"
							data-testid="group-label-toggle"
							mainContainerStyles="w-full flex gap-4 items-center"
							onChange={() => setLabelVisible(!labelVisible)}
							required
						/>
						<Toggle
							label="Can be multiple"
							id="multiple-toggle"
							name="multiple-toggle"
							aria-label="multiple-toggle"
							data-testid="multiple-toggle"
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
							mainContainerStyles="w-full flex gap-4 items-center"
							onChange={() => setRequired(!required)}
							required
						/>
					</div>
					<div className="flex w-full justify-end">
						<ClickButton
							id="add-group"
							label="Add"
							type="submit"
							size="md"
							variant="shadow-default"
							className="w-full sm:w-fit sm:justify-end"
							onClick={handleAddNewGroup}
						/>
					</div>
				</form>
			</ModalBox>
		</>
	);
}
export default AddGroup;
