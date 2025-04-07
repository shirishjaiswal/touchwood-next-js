import { inputStyles } from "@/app/auth/login/components/form-container";
import ClickButton from "@/components/ui/button/click-button";
import Toggle from "@/components/ui/button/toggle";
import { ModalBox } from "@/components/ui/dialogueBox/modal-box";
import { Add } from "@/components/ui/icons";
import FieldInput from "@/components/ui/input/field-input";
import { useState } from "react";

function AddParent() {
	const [addNewparentModalOpen, setAddNewparentModalOpen] =
		useState<boolean>(false);
	return (
		<>
			<ClickButton
				id="add-parent"
				label="Add New parent"
				variant="shadow-default"
				size="md"
				onClick={setAddNewparentModalOpen.bind(null, true)}
			>
				<div className="flex justify-center items-center gap-2">
					<Add />
					<p>Add New parent</p>
				</div>
			</ClickButton>
			<ModalBox
				isOpen={addNewparentModalOpen}
				onClose={setAddNewparentModalOpen.bind(null, false)}
				title="Add New parent"
				subtitle="Please enter parent details, parent name, parent label and parent description (optional)"
			>
				<form className="user-details--new-parent__form flex flex-col w-full gap-4">
					<FieldInput
						id="parent-label"
						name="parent-label"
						aria-label="parent-label"
						data-testid="parent-label"
						label="parent label"
						type="text"
						required
						inputStyles={inputStyles}
					/>
					<FieldInput
						id="parent-description"
						name="parent-description"
						aria-label="parent-description"
						data-testid="parent-description"
						label="parent description"
						type="text"
						required
						inputStyles={inputStyles}
					/>
					<Toggle
						label="Show parent label"
						id="parent-label-toggle"
						name="parent-label-toggle"
						aria-label="parent-label-toggle"
						data-testid="parent-label-toggle"
						mainContainerStyles="w-full flex gap-4 items-center"
					/>
					<div className="flex w-full justify-end">
						<ClickButton
							id="add-parent"
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
export default AddParent;
