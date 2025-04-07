import { useState } from "react";
import ClickButton from "@/components/ui/button/click-button";
import { ModalBox } from "@/components/ui/dialogueBox/modal-box";

type ConfirmBoxProps = {
	onConfirm: () => void;
	onCancel: () => void;
	heading: string;
	subHeading: string;
	confirmButtonText?: string;
	cancelButtonText?: string;
};
function ConfirmBox({
	onConfirm,
	onCancel,
	heading,
	subHeading,
	confirmButtonText,
	cancelButtonText,
}: ConfirmBoxProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<>
			<ClickButton
				id="confirm-button"
				variant="shadow-default"
				size="md"
				className="md:w-fit flex"
				title="Confirm"
				onClick={() => {
					setIsOpen(true);
				}}
			/>
			<ModalBox
				title={heading}
				subtitle={subHeading}
				isOpen={isOpen}
				onClose={onCancel}
				mainContainerStyle_mb="w-1/3"
				dialogContentStyle_mb="p-4"
				closeButtonStyle_mb="top-2 right-2"
				titleStyle_mb="text-lg font-semibold text-gray-800"
				subTitleStyle_mb="text-sm text-gray-600"
			>
				<div className="flex justify-end mt-4">
					<button
						id="confirm-button"
						className="bg-primary text-white font-semibold rounded-md hover:bg-secondary p-2"
						onClick={onConfirm}
					>
						{confirmButtonText ?? "Confirm"}
					</button>
					<button
						id="cancel-button"
						className="bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 p-2 ml-2"
						onClick={onCancel}
						autoFocus
					>
						{cancelButtonText ?? "Cancel"}
					</button>
				</div>
			</ModalBox>
		</>
	);
}
export default ConfirmBox;
