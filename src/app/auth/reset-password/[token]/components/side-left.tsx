import ClickButton from "@/components/ui/button/click-button";
import FieldInput from "@/components/ui/input/field-input";
import { Login } from "@/components/ui/icons";
import { labelStyles } from "@/app/auth/login/components/form-container";

export type SideLeftProps = {
	token?: string;
};

function SideLeft({ token }: SideLeftProps) {
	return (
		<div id="side-left" className="side-left container">
			<header className="side-left-header">
				<h1 id="title">Reset Password</h1>
			</header>
			<main className="side-left-main">
				<form
					id="reset-password-form"
					name="reset-password-form"
					className="reset-password-form"
					action={`/api/auth/reset-password/${token}`}
					method="POST"
				>
					<FieldInput
						id="password"
						name="password"
						type="password"
						label="Password"
						placeholder="Enter your password"
						required
						autoComplete="current-password"
						labelStyles={labelStyles}
						aria-label="input-login-password"
						role="textbox"
						data-testid="input-login-password"
					/>
					<FieldInput
						id="confirm-password"
						name="confirm-password"
						type="password"
						label="Confirm Password"
						placeholder="Enter your password"
						required
						autoComplete="current-password"
						labelStyles={labelStyles}
						aria-label="input-login-password"
						role="textbox"
						data-testid="input-login-password"
					/>
					<div className="button-container">
						<ClickButton
							id="reset-password-button"
							name="reset-password-button"
							type="submit"
							variant="shadow-default"
							className="group"
						>
							<div className="text-secondary-300 flex items-center justify-center gap-2">
								<Login
									color="#8cd6e3"
									className="transform transition-transform duration-300 group-hover:translate-x-1"
								/>
								<span className="text-base font-semibold">Reset Password</span>
							</div>
						</ClickButton>
					</div>
				</form>
			</main>
		</div>
	);
}

export default SideLeft;
