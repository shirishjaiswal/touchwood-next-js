"use client";

import ClickButton from "@/components/ui/button/click-button";
import { ModalBox } from "@/components/ui/dialogueBox/modal-box";
import FieldInput from "@/components/ui/input/field-input";
import { useState } from "react";
import {
	inputStyles,
	labelStyles,
} from "@/app/auth/login/components/form-container";
import { toast } from "sonner";

function VerifyAccount() {
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleClose = () => {
		setIsOpen(false);
		setMessage("");
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		const formData = new FormData(e.currentTarget);
		const email = formData.get("verify-email");

		try {
			const res = await fetch("/api/auth/account-verification", {
				method: "POST",
				body: JSON.stringify({ email }),
				headers: { "Content-Type": "application/json" },
			});

			if (res.ok) {
				setMessage("Verification email sent! Check your inbox.");
			} else {
				const data = await res.json();
				setMessage(data?.error || "Failed to send verification email.");
			}
			toast.success("Verification email sent! Check your inbox.");
			setIsOpen(false);
		} catch {
			setMessage("An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div id="verify-account-container" className="validating-container">
			<ClickButton
				id="verify-account-button"
				variant="none"
				size="none"
				className="font-normal underline text-primary-500"
				onClick={() => setIsOpen(true)}
			>
				<span>Verify Account</span>
			</ClickButton>
			<ModalBox
				isOpen={isOpen}
				onClose={handleClose}
				title="Verify Account"
				subtitle="Enter your registered email. If your account exists, we’ll send you a verification link."
			>
				<form
					id="verify-account-form"
					className="verify-account-form flex flex-col gap-6"
					onSubmit={handleSubmit}
				>
					<FieldInput
						id="verify-email"
						name="verify-email"
						type="email"
						label="Registered Email"
						placeholder="Enter your registered email"
						required
						labelStyles={labelStyles}
						inputStyles={inputStyles}
						aria-label="input-email"
						role="textbox"
						data-testid="input-verify-account-email"
					/>
					{message && (
						<p className="mt-2 text-sm text-primary-500 text-center">
							{message}
						</p>
					)}
					<div className="flex w-full justify-end">
						<ClickButton
							id="verify-account-reset"
							name="verify-account-reset"
							variant="shadow-default"
							type="submit"
							size="md"
							label={loading ? "Sending..." : "Send Verification"}
							disabled={loading}
							className="w-full sm:w-fit sm:justify-end"
						/>
					</div>
				</form>
			</ModalBox>
		</div>
	);
}

export default VerifyAccount;
