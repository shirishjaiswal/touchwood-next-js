import "./styles.css";
import React, { useState, useEffect } from "react";
import { Ai, CloseCircleX, Send } from "@/components/ui/icons";
import ClickButton from "@/components/ui/button/click-button";
import { AnimatePresence, motion } from "framer-motion";
import FieldInput from "@/components/ui/input/field-input";
import { useChat } from "@ai-sdk/react";

function removeFormatText(text: string) {

	return text.replace(/```html/g, "").replace(/```/g, "");
}
type AiHelpBoxProps = {
	data: string;
	updateData: (data: string) => void;
	setLoading: (data: boolean) => void;
};
const AiHelpBox = ({updateData, setLoading }: AiHelpBoxProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const { messages, input, handleInputChange, handleSubmit, isLoading } =
		useChat({ api: "/api/ai/gemini/mail" });

	useEffect(() => {
		if (messages.length > 0 && messages[messages.length - 1].role !== "user")
			updateData(removeFormatText(messages[messages.length - 1].content));
		setLoading(true);
		setIsOpen(false);
	}, [messages]);

	const toggleChat = () => setIsOpen(!isOpen);

	return (
		<>
			{!isOpen && (
				<button
					type="button"
					onClick={toggleChat}
					className="p-2 bg-gradient-to-bl from-primary-300 to-primary-700 rounded-full hover:bg-gray-300 focus:outline-none absolute bottom-2 right-2"
				>
					<Ai className="text-2xl text-gray-700" />
				</button>
			)}

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ x: "100%", opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: "100%", opacity: 0 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className="absolute w-full bottom-0 shadow"
					>
						<div id="ai-help-box-container">
							<ClickButton
								id="close-chat"
								variant="none"
								size="none"
								onClick={toggleChat}
								className="z-10 -top-3 -left-3 absolute"
							>
								<CloseCircleX className="w-7 h-7" color="grey" />
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
										onChange={handleInputChange}
										placeholder="Ai help box... ask me anything..."
										autoCorrect="on"
										autoComplete="on"
										className="w-full p-2 border-none focus:outline-none bg-transparent"
									/>
									<ClickButton id="send-chat" type="submit" loading={isLoading}>
										<Send className="w-6 h-6 " />
									</ClickButton>
								</form>
							</footer>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default AiHelpBox;
