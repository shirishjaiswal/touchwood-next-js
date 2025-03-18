'use client';

import ClickButton from '@/components/ui/button/click-button';
import { ModalBox } from '@/components/ui/dialogueBox/modal-box';
import FieldInput from '@/components/ui/input/field-input';
import { useState } from 'react';
import { inputStyles, labelStyles } from '@/app/login/components/side-left';

function ForgotPassword() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClose = () => setIsOpen(false);
  return (
    <div id="forgot-password-container">
      <ClickButton
        id="forgot-password-button"
        variant="none"
        size="none"
        className="font-normal"
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
          action="/register"
          method="POST"
        >
          <FieldInput
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your registered email"
            required
            labelStyles={labelStyles}
            inputStyles={inputStyles}
            aria-label="input-email"
            role="textbox"
            data-testid="input-forgot-password-email"
          />
          <div className="flex w-full justify-end">
            <ClickButton
              name="forgot-password-reset"
              variant="shadow-default"
              type="submit"
              size="md"
              label="Reset"
              className="w-full sm:w-fit sm:justify-end"
            />
          </div>
        </form>
      </ModalBox>
    </div>
  );
}

export default ForgotPassword;
