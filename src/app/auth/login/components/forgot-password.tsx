"use client";

import ClickButton from "@/components/ui/button/click-button";
import { ModalBox } from "@/components/ui/dialogueBox/modal-box";
import FieldInput from "@/components/ui/input/field-input";
import { useState } from "react";
import {
  inputStyles,
  labelStyles,
} from "@/app/auth/login/components/form-container";
import { setScreenLoading } from "@/hooks/use-screen-loading";

function ForgotPassword() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setScreenLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        e.currentTarget.reset();
      } else {
        await res.json();
      }
    } catch {
    } finally {
      setIsOpen(false);
      setScreenLoading(false);
    }
  };

  return (
    <div id="forgot-password-container" className="validating-container">
      <ClickButton
        id="forgot-password-button"
        variant="none"
        size="none"
        className="font-normal underline text-primary-500"
        onClick={() => setIsOpen(true)}
      >
        <span>Forgot Password?</span>
      </ClickButton>
      <ModalBox
        isOpen={isOpen}
        onClose={handleClose}
        title="Forgot Password"
        subtitle="Please enter your registered email"
      >
        <form
          id="forgot-password-form"
          name="forgot-password-form"
          className="forgot-password-form"
          onSubmit={handleSubmit}
        >
          <FieldInput
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your registered email"
            required
            inputMode="email"
            labelStyles={labelStyles}
            inputStyles={inputStyles}
            aria-label="input-email"
            role="textbox"
            data-testid="input-forgot-password-email"
          />
          <div className="flex w-full justify-end mt-4">
            <ClickButton
              id="forgot-password-reset"
              name="forgot-password-reset"
              variant="shadow-default"
              label="Reset Password"
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

export default ForgotPassword;
