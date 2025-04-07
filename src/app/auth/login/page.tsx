import "@/app/auth/login/styles.css";
import LoginFormContainer from "@/app/auth/login/components/form-container";
import SideRight from "@/app/auth/login/components/side-right";

function Login() {
	return (
		<div id="login" className="login-container">
			<LoginFormContainer />
			<SideRight />
		</div>
	);
}

export default Login;
