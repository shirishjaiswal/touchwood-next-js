import '@/app/register/styles.css';
import SideLeft from "@/app/register/components/side-left";
import SideRight from "@/app/register/components/side-right";

async function Register() {

  return (
    <div id="register" className="register-container">
      <SideLeft  />
      <SideRight error={''} />
    </div>
  );
}

export default Register;