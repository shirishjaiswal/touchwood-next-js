import ClickButton from "@/components/ui/button/click-button";
import { TabContentGroupType } from "./group-list-content";
import { Arrow, Edit } from "@/components/ui/icons";
import { useState } from "react";
import { ModalBox } from "@/components/ui/dialogueBox/modal-box";
import FieldInput from "@/components/ui/input/field-input";
import { inputStyles } from "@/app/auth/login/components/form-container";
import Toggle from "@/components/ui/button/toggle";
import ParentListContent from "./parent-list-content";

type GroupContentProps = {
	groupContent: TabContentGroupType;
};

function GroupContent({ groupContent }: GroupContentProps) {
	const [isGroupOpen, setGroupOpen] = useState<boolean>(false);
	const [isEditMode, setEditMode] = useState<boolean>(false);

	return (
		<div className="group-content-container flex flex-col justify-between gap-2 bg-neutral-100 rounded p-4 mt-3">
			<div
				id="add-group"
				role="button"
				className="flex flex-col gap-1 pr-0 pl-0 w-full cursor-pointer focus:outline-none"
				onClick={() => setGroupOpen(!isGroupOpen)}
			>
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
					<Arrow
						color={"#e3e3e3"}
						className={`rotate-${isGroupOpen ? "270" : "90"} transform transition-all ease-in-out`}
					/>
				</div>
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
						inputStyles={inputStyles}
						value={groupContent.description}
					/>
					<Toggle
						label="Show group label"
						id="group-label-toggle"
						name="group-label-toggle"
						aria-label="group-label-toggle"
						data-testid="group-label-toggle"
						mainContainerStyles="w-full flex gap-4 items-center"
						value={groupContent.labelVisible}
					/>
					<div className="flex w-full justify-end gap-4">
						<ClickButton
							id="delete-group"
							label="Delete"
							type="submit"
							size="md"
							variant="shadow-red"
							className="w-full sm:w-fit sm:justify-end"
						/>
						<ClickButton
							id="add-group"
							label="Update"
							type="submit"
							size="md"
							variant="shadow-default"
							className="w-full sm:w-fit sm:justify-end"
						/>
					</div>
				</form>
			</ModalBox>
			{/* Group Content */}
			{isGroupOpen && (
				<div className="group-content flex flex-col gap-2">
					<ParentListContent parentListContent={groupContent.parent} />
				</div>
			)}
		</div>
	);
}

export default GroupContent;
