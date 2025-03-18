import '@/app/login/styles.css';
import SideLeft from "@/app/login/components/side-left";
import SideRight from "@/app/login/components/side-right";

async function Login() {
  return (
    <div id="login" className="login-container">
      <SideLeft error={''} />
      <SideRight />
    </div>
  );
}

export default Login;