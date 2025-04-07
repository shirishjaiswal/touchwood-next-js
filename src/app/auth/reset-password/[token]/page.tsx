'use client';
import '@/app/auth/reset-password/styles.css';
import { usePathname } from 'next/navigation';
import SideRight from "@/app/auth/login/components/side-right";
import SideLeft from '@/app/auth/reset-password/[token]/components/side-left';

function ResetPassword() {
  const pathname = usePathname();
  const token = pathname.split("/")[3];

  return (
    <div id="login" className="reset-password-container">
      <SideLeft token={token} />
      <SideRight />
    </div>
  );
}

export default ResetPassword;