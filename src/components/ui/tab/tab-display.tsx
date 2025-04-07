'use client';
import Link from "next/link";
import { useState } from "react";
import ClickButton from "@/components/ui/button/click-button";
import { ModalBox } from "@/components/ui/dialogueBox/modal-box";
import { Add, Edit } from "@/components/ui/icons";
import FieldInput from "@/components/ui/input/field-input";
import { inputStyles } from "@/app/auth/login/components/form-container";

export interface TabType {
  id: number;
  key: string;
  label: string;
  description: string;
  position: number;
	link: string;
}
export type TabComponentProps = {
	tabList: TabType[];
	activeTab: number;
};

function TabComponent({ tabList, activeTab }: TabComponentProps) {
	const [isActiveTabModalOpen, setIsActiveTabModalOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	return (
		<>
			<div id="user-details" className="tab-list hidden sm:flex w-full gap-4 sticky top-20 bg-white z-10">
				{tabList
					.sort((a, b) => a.position - b.position)
					.map((tab) => (
						<div key={tab.id}>
							<div
								className={`user-details--tab__container group ${
									activeTab === tab.id
										? "border-b-2 border-primary-500 text-primary-600"
										: "text-gray-500 hover:text-primary-500"
								}`}
							>
								<Link
									key={tab.id}
									href={tab.link}
									className="user-details--tab__link"
								>
									<h1 className="user-details--tab__title">{tab.label}</h1>
								</Link>

								{activeTab === tab.id && (
									<>
										<ClickButton
											id={`edit-${tab.key}`}
											variant="none"
											size="none"
											className="active-tab--edit-button hidden group-hover:block"
											onClick={() => setIsActiveTabModalOpen(true)}
										>
											<Edit width={20} height={20} color="#9CA3AF" />
										</ClickButton>
									</>
								)}
							</div>
						</div>
					))}
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
			</div>

			{/* Mobile View (Dropdown) */}
			<div className=" w-full flex sm:hidden sticky top-20">
				<div
					className="relative flex items-center border border-gray-300 bg-white shadow-md rounded-lg p-3 cursor-pointer w-full"
					onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				>
					<span className="text-gray-700 text-lg font-bold w-full">
						{tabList.find((tab) => tab.id === activeTab)?.label || "Select Tab"}
					</span>
					<ClickButton
						id={`edit-${activeTab}`}
						variant="none"
						size="none"
						className="absolute right-3 text-gray-500 hover:text-gray-700"
						onClick={(e) => {
							e.stopPropagation();
							setIsActiveTabModalOpen(true);
						}}
					>
						<Edit width={20} height={20} color="#9CA3AF" />
					</ClickButton>
				</div>

				{isDropdownOpen && (
					<ul className="absolute left-0 mt-14 w-full bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden z-10">
						{tabList.map((tab) => (
							<li
								key={tab.id}
								className="px-4 py-2 text-gray-900 bg-white hover:bg-gray-200 cursor-pointer font-medium"
							>
								<Link href={`/home/configuration/profile/${tab.key}`}>
									{tab.label}
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>

			<ModalBox
				isOpen={isActiveTabModalOpen}
				onClose={() => setIsActiveTabModalOpen(false)}
				title="Edit Tab"
				subtitle="Please enter tab details, tab name, tab label, and tab description (optional)"
			>
				<form className="user-details--tab__form flex w-full flex-col gap-4">
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
							id="delete-tab"
							label="Delete"
							type="submit"
							size="md"
							variant="shadow-red"
							className="w-full sm:w-fit sm:justify-end"
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

export default TabComponent;
