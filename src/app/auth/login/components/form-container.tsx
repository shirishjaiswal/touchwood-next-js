"use client";
import ClickButton from "@/components/ui/button/click-button";
import Link from "next/link";
import ForgotPassword from "@/app/auth/login/components/forgot-password";
import FieldInput from "@/components/ui/input/field-input";
import { Github, Google, Login } from "@/components/ui/icons";
import VerifyAccount from "@/app/auth/login/components/verify-account";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { setScreenLoading } from "@/hooks/use-screen-loading";

const transition = "transition duration-300 ease-in-out";
export const labelStyles = "text-md font-medium text-primary-500";
export const inputStyles = `border-primary-400 hover:shadow-lg shadow-primary-500/50 focus:shadow-primary-500/50 focus:shadow-lg ${transition}`;
export const errorInputEffect = `border-danger-500 hover:shadow-lg shadow-danger-500/50 focus:shadow-danger-500/50 focus:shadow-lg ${transition}`;

function LoginFormContainer() {
  const searchParams = useSearchParams();
  const rawToken = searchParams.get("token") || "";
  const token = rawToken ? (encodeURIComponent(rawToken) as string) : null;
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const router = useRouter();
  const loginAction = token
    ? `/api/auth/login?token=${token}`
    : "/api/auth/login";

  const handleLoginFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setScreenLoading(true);
    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }
    const formData = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        loginAction,
        {
          ...formData,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        toast.success("Login successful!");
        router.push("/home/user/role");
      }
    } catch (error) {
      if (axios.isAxiosError(error))
        if (error.response?.data?.error) toast.error(error.response.data.error);
    } finally {
      setScreenLoading(false);
    }
  };
  return (
    <div id="side-left" className="side-left container">
      <header className="side-left-header">
        <h1 id="title">Welcome Back!!</h1>
        <p id="subtitle">Don’t miss out — Discover what’s waiting for you!</p>
      </header>

      <main className="side-left-main">
        <form
          id="login-form"
          name="login-form"
          className="login-form"
          onSubmit={handleLoginFormSubmit}
        >
          <FieldInput
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your registered email"
            role="textbox"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            labelStyles={labelStyles}
            inputStyles={inputStyles}
            aria-label={`input-login-email`}
            data-testid={`input-login-email`}
          />
          <FieldInput
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            role="textbox"
            required
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            labelStyles={labelStyles}
            inputStyles={inputStyles}
            aria-label={`input-login-password`}
            data-testid={`input-login-password`}
          />

          <div className="button-container">
            <ClickButton
              id="login-button"
              name="login-button"
              type="submit"
              variant="shadow-default"
              className="group"
            >
              <div className="text-secondary-300 flex items-center justify-center gap-2">
                <Login
                  color="#8cd6e3"
                  className="transform transition-transform duration-300 group-hover:translate-x-1"
                />
                <span className="text-base font-semibold">Login</span>
              </div>
            </ClickButton>
          </div>
        </form>

        <div className="or container">
          <div className="line" />
          <span className="text-neutral-500">or</span>
          <div className="line" />
        </div>

        <div id="auth-providers" className="container">
          {[
            {
              id: "google-button",
              name: "login-via-google",
              icon: <Google />,
              label: "Sign in with Google",
            },
            {
              id: "github-button",
              name: "login-via-github",
              icon: <Github />,
              label: "Sign in with Github",
            },
          ].map(({ id, name, icon, label }) => (
            <ClickButton
              key={id}
              id={id}
              name={name}
              variant="none"
              size="sm"
              className="auth-button group"
            >
              <div className="flex items-center gap-2">
                {icon}
                <span className="hidden md:block group-hover:text-primary-500">
                  {label}
                </span>
              </div>
            </ClickButton>
          ))}
        </div>

        <div id="forgot-register-container">
          <div id="sign-up-link" className="container text-center">
            Don&apos;t have an account?
            <Link
              id="register-link"
              href="/auth/register"
              className="text-sky-900 underline"
            >
              Register
            </Link>
          </div>
          <div className="forgot-password-verify-account-container">
            <ForgotPassword />
            <VerifyAccount />
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginFormContainer;
