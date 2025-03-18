import ClickButton from '@/components/ui/button/click-button';
import Link from 'next/link';
import ForgotPassword from '@/app/login/components/forgot-password';
import FieldInput from '@/components/ui/input/field-input';
import { Github, Google, Login, Warning } from '@/components/ui/icons';

const transation = 'transition duration-300 ease-in-out';
export const labelStyles = 'text-md font-medium text-primary-500';
export const inputStyles = `border-primary-400 hover:shadow-lg shadow-primary-500/50 focus:shadow-primary-500/50 focus:shadow-lg ${transation}`;
const errorInputEffect = `border-danger-500 hover:shadow-lg shadow-danger-500/50 focus:shadow-danger-500/50 focus:shadow-lg
  ${transation}`;

export type SideLeftProps = {
  error?: string;
};

function SideLeft({ error }: SideLeftProps) {
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
          action="/login"
          method="POST"
        >
          <FieldInput
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your registered email"
            required
            autoComplete="email"
            labelStyles={labelStyles}
            inputStyles={error ? errorInputEffect : inputStyles}
            aria-label="input-login-email"
            role="textbox"
            data-testid="input-login-email"
          />
          <FieldInput
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            required
            autoComplete="current-password"
            labelStyles={labelStyles}
            inputStyles={error ? errorInputEffect : inputStyles}
            aria-label="input-login-password"
            role="textbox"
            data-testid="input-login-password"
          />
          {error && (
            <div className="error-container">
              <Warning color="#dc3545" className="warning-icon" />
              <p className="error-message">{error}</p>
            </div>
          )}
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
          <div className="line"></div>
          <span className="text-neutral-500">or</span>
          <div className="line"></div>
        </div>
        <div id="auth-providers" className="container">
          <ClickButton
            id="google-button"
            name="login-via-google"
            variant="none"
            size="sm"
            className="auth-button group"
          >
            <div className="flex items-center gap-2">
              <Google />
              <span className="group-hover:text-primary-500 hidden md:block">
                Sign in with Google
              </span>
            </div>
          </ClickButton>
          <ClickButton
            id="github-button"
            name="login-via-github"
            variant="none"
            size="sm"
            className="auth-button group"
          >
            <div className="flex items-center gap-2">
              <Github />
              <span className="hidden group-hover:text-neutral-500 md:block">
                Sign in with Github
              </span>
            </div>
          </ClickButton>
        </div>
        <div id="forgot-register-container">
          <div id="sign-up-link" className="container">
            <span>Don&apos;t have an account?&nbsp;</span>
            <Link id="register-link" href={'/register'}>
              <span className="text-sky-900 underline">Register</span>
            </Link>
          </div>
          <ForgotPassword />
        </div>
      </main>
    </div>
  );
}

export default SideLeft;
