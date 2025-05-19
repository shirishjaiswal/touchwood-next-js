import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import FieldInput from "@/components/ui/input/field-input";
import ClickButton from "@/components/ui/button/click-button";
import { Ai, CloseCircleX, Send } from "@/components/ui/icons";
import clsx from "clsx"; // Import clsx
import "@/components/ui/ai/styles.css";
import { Loader2Icon } from "lucide-react";

function removeFormatText(text: string) {
  return text.replace(/```html/g, "").replace(/```/g, "");
}

type AiHelpBoxProps = {
  data: string;
  updateData: (data: string) => void;
};

const AiHelpBox = ({ updateData }: AiHelpBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({ api: "/api/ai/gemini/mail" });

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].role !== "user") {
      updateData(removeFormatText(messages[messages.length - 1].content));
      setIsOpen(false);
    }
  }, [messages, updateData]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("chat-open");
    } else {
      document.body.classList.remove("chat-open");
    }
    return () => document.body.classList.remove("chat-open");
  }, [isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={toggleChat}
          className={clsx(
            "p-2 rounded-full bg-gradient-to-r from-purple-200 to-blue-200 shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out",
            "absolute bottom-2 right-1",
            "text-white hover:bg-gradient-to-l from-purple-200 to-blue-500",
            "focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50",
            "hover:scale-110 active:scale-95"
          )}
        >
          <Ai width={30} height={30} className="text-white border" />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "20%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "20%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.4,
              ease: "easeOut",
            }}
            className={clsx("motion-div-container")}
          >
            <div id="ai-help-box-container">
              <ClickButton
                id="close-chat"
                variant="none"
                size="none"
                onClick={toggleChat}
                className={clsx("z-10 -top-3 -left-3 absolute")}
              >
                <CloseCircleX className={clsx("w-7 h-7")} color="grey" />
              </ClickButton>

              <footer>
                <form id="chat-form" onSubmit={handleSubmit}>
                  <FieldInput
                    id="chat-message"
                    name="input-chat-message"
                    aria-label="input-chat-message"
                    data-testid="input-chat-message"
                    type="text"
                    required
                    value={input}
                    ref={inputRef}
                    onChange={handleInputChange}
                    placeholder="Ai help box... ask me anything..."
                    autoCorrect="on"
                    autoComplete="on"
                    className={clsx(
                      "w-full p-2 border-none bg-transparent",
                      "focus:outline-none"
                    )}
                  />
                  <ClickButton id="send-chat" type="submit" loading={isLoading}>
                    <Send className={clsx("w-6 h-6")} />
                  </ClickButton>
                </form>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-lg rounded-md z-10">
          <div className="flex items-center gap-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white py-2 px-4 rounded-full shadow-lg animate-pulse">
            <Loader2Icon className="w-5 h-5 animate-spin" />
            <span className="text-sm font-medium">AI is thinking...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default AiHelpBox;
