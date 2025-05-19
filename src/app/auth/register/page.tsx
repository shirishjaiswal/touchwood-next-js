'use client';
import '@/app/auth/register/styles.css';
import SideLeft from "@/app/auth/register/components/side-left";
import SideRight from "@/app/auth/register/components/side-right";

function Register() {
  return (
    <div id="register" className="register-container">
      <SideLeft />
      <SideRight />
    </div>
  );
}

export default Register;