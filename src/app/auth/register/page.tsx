'use client';
import '@/app/auth/register/styles.css';
import SideLeft from "@/app/auth/register/components/side-left";
import SideRight from "@/app/auth/register/components/side-right";
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

function Register() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || '';
  useEffect(() => {
    if(error) toast.error(error);
  }, [])
  return (
    <div id="register" className="register-container">
      <SideLeft />
      <SideRight />
    </div>
  );
}

export default Register;