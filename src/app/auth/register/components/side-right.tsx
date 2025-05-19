import Link from "next/link";
import ClickButton from "@/components/ui/button/click-button";
import FieldInput from "@/components/ui/input/field-input";
import TermsAndCondition from "@/app/auth/register/components/terms-conditions";
import SelectBox from "@/components/ui/checkBox/select-box";
import { Github, Google, Login, Warning } from "@/components/ui/icons";
import { toast } from "sonner";
import { setScreenLoading } from "@/hooks/use-screen-loading";
import { useRouter } from "next/navigation";

const transation = "transition duration-300 ease-in-out";
const labelStyles = "text-md font-medium text-primary-500";
const inputStyles = `border-primary-400 hover:shadow-lg shadow-primary-500/50 focus:shadow-primary-500/50 focus:shadow-lg
  ${transation}`;
const errorInputEffect = `border-danger-500 hover:shadow-lg shadow-danger-500/50 focus:shadow-danger-500/50 focus:shadow-lg
  ${transation}`;

export type SideLeftProps = {
  error?: string;
};

function SideRight({ error }: SideLeftProps) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setScreenLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }
      toast.success("Verification mail sent successfully! Check your inbox.");
      router.replace("/auth/login");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setScreenLoading(false);
    }
  };

  return (
    <div id="side-right" className="side-right container">
      <header className="side-right-header">
        <h1 id="title">Start Your Journey!!</h1>
        <p id="subtitle">Success begins with a decision. Make yours today!</p>
      </header>
      <main className="side-right-main">
        <form
          id="signup-form"
          name="signup-form"
          className="signup-form"
          onSubmit={handleSubmit}
        >
          <div className="name">
            <FieldInput
              id="first-name"
              name="first-name"
              type="text"
              label="First Name"
              placeholder="Your First Name"
              required
              labelStyles={labelStyles}
              inputStyles={error ? errorInputEffect : inputStyles}
              aria-label="input-register-first-name"
              role="textbox"
              data-testid="input-register-first-name"
            />
            <FieldInput
              id="last-name"
              name="last-name"
              type="text"
              label="Last Name"
              minLength={3}
              maxLength={20}
              placeholder="Your Last Name"
              required
              labelStyles={labelStyles}
              inputStyles={error ? errorInputEffect : inputStyles}
              aria-label="input-register-last-name"
              role="textbox"
              data-testid="input-register-last-name"
            />
          </div>
          <FieldInput
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Your Email Id"
            required
            labelStyles={labelStyles}
            inputStyles={error ? errorInputEffect : inputStyles}
            aria-label="input-register-email"
            data-testid="input-register-email"
          />
          <FieldInput
            id="password"
            name="password"
            type="password"
            label="Password"
            description="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number."
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            placeholder="Enter your password"
            required
            labelStyles={labelStyles}
            inputStyles={error ? errorInputEffect : inputStyles}
            aria-label="input-register-password"
            data-testid="input-register-password"
          />
          <FieldInput
            id="confirm-password"
            name="confirm-password"
            type="password"
            label="Confirm Password"
            description="Should be same as Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            placeholder="Re-enter password"
            required
            labelStyles={labelStyles}
            inputStyles={error ? errorInputEffect : inputStyles}
            aria-label="input-register-confirm-password"
            data-testid="input-register-confirm-password"
          />
          <div className="tc-container">
            <SelectBox
              id="terms-checkbox"
              name="Terms and Conditions Checkbox"
              option={{
                label: "I agree to the terms and conditions",
                checked: false,
              }}
              required
              aria-label={""}
              data-testid={""}
            />
            <TermsAndCondition />
          </div>
          {error && (
            <div className="error-container">
              <Warning color="#dc3545" className="warning-icon" />
              <p className="error-message">{error}</p>
            </div>
          )}
          <div className="button-container">
            <ClickButton
              id="signup-button"
              name="signup-button"
              type="submit"
              variant="shadow-default"
              className="group"
            >
              <div className="text-secondary-300 flex items-center justify-center gap-2">
                <Login
                  color="#8cd6e3"
                  className="transform transition-transform duration-300 group-hover:translate-x-1"
                />
                <span className="text-base font-semibold">Sign up</span>
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
            id="register-via-google"
            name="register-via-google"
            variant="none"
            size="sm"
            className="auth-button group"
          >
            <div className="flex items-center gap-2">
              <Google />
              <span className="group-hover:text-primary-500 hidden md:block">
                Register with Google
              </span>
            </div>
          </ClickButton>
          <ClickButton
            id="register-via-github"
            name="register-via-github"
            variant="none"
            size="sm"
            className="auth-button group"
          >
            <div className="flex items-center gap-2">
              <Github />
              <span className="hidden group-hover:text-neutral-500 md:block">
                Register with Github
              </span>
            </div>
          </ClickButton>
        </div>
        <div id="sign-up-link" className="container">
          <span>Already have an account?&nbsp;</span>
          <Link id="sign-in-link" href={"/login"}>
            <span className="text-sky-900 underline">Sign-in</span>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default SideRight;
