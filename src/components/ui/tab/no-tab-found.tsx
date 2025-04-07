import ClickButton from "@/components/ui/button/click-button";
import { useState } from "react";
import { ModalBox } from "@/components/ui/dialogueBox/modal-box";
import FieldInput from "@/components/ui/input/field-input";
import { inputStyles } from "@/app/auth/login/components/form-container";
import { Add } from "@/components/ui/icons";
function NoTabFound() {
	const [addNewTabModalOpen, setAddNewTabModalOpen] = useState<boolean>(false);

	return (
		<div id="user-details" className="empty-tab-list">
			<h1 className="user-details--no-tabs__title">No Tabs Present</h1>
			<ClickButton
				id="add-tab"
				label="Add New Tab"
				variant="shadow-default"
				onClick={() => setAddNewTabModalOpen(true)}
			>
				<div className="flex justify-center items-center gap-2">
					<Add />
					<p>Add New Tab</p>
				</div>
			</ClickButton>
			<ModalBox
				isOpen={addNewTabModalOpen}
				onClose={() => setAddNewTabModalOpen(false)}
				title="Add New Tab"
				subtitle="Please enter tab details, tab name, tab label and tab description (optional)"
			>
				<form className="user-details--new-tab__form">
					<div className="grid grid-cols-1 gap-2">
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
					</div>
					<div className="flex w-full justify-end">
						<ClickButton
							id="add-tab"
							label="Add"
							type="submit"
							size="md"
							variant="shadow-default"
							className="w-full sm:w-fit sm:justify-end"
						/>
					</div>
				</form>
			</ModalBox>
		</div>
	);
}

export default NoTabFound;
