"use client";

import ClickButton from "@/components/ui/button/click-button";
import { ModalBox } from "@/components/ui/dialogueBox/modal-box";
import FieldInput from "@/components/ui/input/field-input";
import { useEffect, useState } from "react";
import {
  inputStyles,
  labelStyles,
} from "@/app/auth/login/components/form-container";
import { toast } from "sonner";
import SelectBox from "@/components/ui/checkBox/select-box";
import TermsAndCondition from "./terms-conditions";
import axios from "axios";
import { setScreenLoading } from "@/hooks/use-screen-loading";

function UserEmailSecureKey() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [privateTokenPresent, setPrivateTokenPresent] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchPrivateTokenStatus = async () => {
    setScreenLoading(true);
    try {
      const res = await axios.get("/api/user-email-secure-token/is-present", {
        headers: { "Content-Type": "application/json" },
      });
      setPrivateTokenPresent(res.data);
    } catch {
      setPrivateTokenPresent(false);
    } finally {
      setScreenLoading(false);
    }
  };

  useEffect(() => {
    fetchPrivateTokenStatus();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDeletePrivateKey = async () => {
    setDeleting(true);
    setLoading(true);

    try {
      await axios.delete("/api/user-email-secure-token/delete", {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Private key deleted successfully!");
      fetchPrivateTokenStatus();
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "Failed to delete private key.";
      toast.error(errorMessage);
    } finally {
      setDeleting(false);
      setLoading(false);
    }
  };

  const handleSubmitPrivateKey = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const privateToken = formData.get("private-token")?.toString().trim();

    if (!privateToken) {
      toast.error("Private token is required.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        "/api/user-email-secure-token/create",
        { privateToken },
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Private key added successfully!");
      setIsOpen(false);
      fetchPrivateTokenStatus(); // Refetch to update UI
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "Failed to send verification email.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="verify-account-container" className="my-4 justify-end w-full">
      <div className="flex justify-end gap-4">
        {privateTokenPresent && (
          <ClickButton
            id="delete-private-key-button"
            variant="shadow-red"
            size="md"
            loading={deleting}
            onClick={handleDeletePrivateKey}
          >
            <span>Delete Private Key</span>
          </ClickButton>
        )}
        <ClickButton
          id="configure-email-button"
          variant="shadow-green"
          size="md"
          onClick={() => setIsOpen(true)}
        >
          <span>Configure Private Key</span>
        </ClickButton>
      </div>
      <ModalBox
        isOpen={isOpen}
        onClose={handleClose}
        title="Secure Key Registration"
        subtitle="Enter your secure key for registered email."
      >
        <form
          id="verify-account-form"
          className="verify-account-form flex flex-col gap-6"
          onSubmit={handleSubmitPrivateKey}
        >
          <FieldInput
            id="private-token"
            name="private-token"
            type="password"
            label="Private password of registered email"
            placeholder="Private password of registered email"
            required
            labelStyles={labelStyles}
            inputStyles={inputStyles}
            aria-label="private-token"
            role="textbox"
            data-testid="private-token"
          />
          <div className="tc-container">
            <SelectBox
              id="terms-checkbox"
              name="termsAccepted"
              option={{
                label: "I agree to the terms and conditions",
                checked: false,
              }}
              required
              aria-label="terms-and-conditions-checkbox"
              data-testid="terms-and-conditions-checkbox"
            />
            <TermsAndCondition />
          </div>
          <div className="flex w-full justify-end">
            <ClickButton
              id="verify-account-submit"
              name="verify-account-submit"
              variant="shadow-default"
              type="submit"
              size="md"
              label={loading ? "Submitting..." : "Submit"}
              disabled={loading}
              className="w-full sm:w-fit sm:justify-end"
            />
          </div>
        </form>
      </ModalBox>
    </div>
  );
}

export default UserEmailSecureKey;
