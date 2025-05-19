"use client";

import ClickButton from "@/components/ui/button/click-button";
import { ModalBox } from "@/components/ui/dialogueBox/modal-box";
import FieldInput from "@/components/ui/input/field-input";
import { useState } from "react";
import {
  inputStyles,
  labelStyles,
} from "@/app/auth/login/components/form-container";
import { toast } from "sonner";
import { setScreenLoading } from "@/hooks/use-screen-loading";

function VerifyAccount() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setScreenLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("verify-email");

    try {
      const res = await fetch("/api/auth/account-verification", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast.success("Verification email sent! Check your inbox.");
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to send verification email.");
      }
      toast.success("Verification email sent! Check your inbox.");
    } catch {
      toast.error("Failed to send verification email.");
    } finally {
      setIsOpen(false);
      setScreenLoading(false);
    }
  };

  return (
    <div id="verify-account-container" className="validating-container">
      <ClickButton
        id="verify-account-button"
        variant="none"
        size="none"
        className="font-normal underline text-primary-500"
        onClick={() => setIsOpen(true)}
      >
        <span>Verify Account</span>
      </ClickButton>
      <ModalBox
        isOpen={isOpen}
        onClose={handleClose}
        title="Verify Account"
        subtitle="Enter your registered email. If your account exists, we’ll send you a verification link."
      >
        <form
          id="verify-account-form"
          className="verify-account-form flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <FieldInput
            id="verify-email"
            name="verify-email"
            type="email"
            label="Registered Email"
            placeholder="Enter your registered email"
            required
            labelStyles={labelStyles}
            inputStyles={inputStyles}
            aria-label="input-email"
            role="textbox"
            data-testid="input-verify-account-email"
          />
          <div className="flex w-full justify-end">
            <ClickButton
              id="verify-account-reset"
              name="verify-account-reset"
              variant="shadow-default"
              type="submit"
              size="md"
              className="w-full sm:w-fit sm:justify-end"
            />
          </div>
        </form>
      </ModalBox>
    </div>
  );
}

export default VerifyAccount;
