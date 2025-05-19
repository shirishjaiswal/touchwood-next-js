import '@/app/auth/reset-password/styles.css';
import SideRight from "@/app/auth/login/components/side-right";
import SideLeft from '@/app/auth/reset-password/components/side-left';

function ResetPassword() {
  return (
    <div id="login" className="reset-password-container">
      <SideLeft />
      <SideRight />
    </div>
  );
}

export default ResetPassword;