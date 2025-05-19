"use client";

import { ReactElement, useState } from "react";
import { ModalBox } from "@/components/ui/dialogueBox/modal-box";
import ClickButton, { ClickButtonProps } from "@/components/ui/button/click-button";

export type ActionPopupProps = {
	title: string;
	subtitle: string;
	onConfirm?: () => void;
	onConfirmText?: string;
	onConfirmVarient: "Primary" | "Secondary";
	displayButton?: ReactElement<ClickButtonProps>;
	children?: ReactElement;
};

function ActionPopup({
	title,
	subtitle,
	onConfirm,
	onConfirmText,
	displayButton,
	onConfirmVarient = "Primary",
	children,
}: ActionPopupProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			{(displayButton && !children) && (
				<ClickButton
					id={displayButton.props.id}
					variant={displayButton.props.variant}
					size={displayButton.props.size}
					className={displayButton.props.className}
					onClick={() => setIsOpen(true)}
				>
					{displayButton.props.children}
				</ClickButton>
			)}
			{children && (
				<div
					id="action-popup"
					className="flex flex-col gap-2"
					onClick={() => setIsOpen(true)}
				>
					{children}
				</div>
			)}
			{/* Modal Box */}
			<ModalBox
				key="action-popup"
				isOpen={isOpen}
				title={title}
				subtitle={subtitle}
				onClose={() => setIsOpen(false)}
			>
				<div className="flex flex-row gap-2 lg:justify-end justify-center mt-2">
					<ClickButton
						id="cancel-button"
						className="w-full lg:w-fit"
						variant={
							onConfirmVarient === "Primary"
								? "outline-default"
								: "shadow-default"
						}
						size="xs"
						label="Cancel"
						onClick={() => {
							setIsOpen(false);
							onConfirm?.();
						}}
					>
						Cancle
					</ClickButton>
					<ClickButton
						id="confirm-button"
						className="w-full lg:w-fit"
						variant={
							onConfirmVarient === "Primary"
								? "shadow-default"
								: "outline-default"
						}
						size="xs"
						label={onConfirmText || "Confirm"}
						onClick={() => {
							setIsOpen(false);
							onConfirm?.();
						}}
					/>
				</div>
			</ModalBox>
		</>
	);
}
export default ActionPopup;
