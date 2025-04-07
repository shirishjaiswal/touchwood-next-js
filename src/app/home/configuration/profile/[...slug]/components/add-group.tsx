import { inputStyles } from "@/app/auth/login/components/form-container";
import ClickButton from "@/components/ui/button/click-button";
import Toggle from "@/components/ui/button/toggle";
import { ModalBox } from "@/components/ui/dialogueBox/modal-box";
import { Add } from "@/components/ui/icons";
import FieldInput from "@/components/ui/input/field-input";
import { useState } from "react";

function AddGroup() {
	const [addNewGroupModalOpen, setAddNewGroupModalOpen] =
		useState<boolean>(false);
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
				<form className="user-details--new-group__form flex flex-col w-full gap-4">
					<FieldInput
						id="group-label"
						name="group-label"
						aria-label="group-label"
						data-testid="group-label"
						label="Group label"
						type="text"
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
						required
						inputStyles={inputStyles}
					/>
					<Toggle
						label="Show group label"
						id="group-label-toggle"
						name="group-label-toggle"
						aria-label="group-label-toggle"
						data-testid="group-label-toggle"
						mainContainerStyles="w-full flex gap-4 items-center"
					/>
					<div className="flex w-full justify-end">
						<ClickButton
							id="add-group"
							label="Add"
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
export default AddGroup;
