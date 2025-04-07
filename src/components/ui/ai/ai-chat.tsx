"use client";
import "./styles.css";
import React, {useRef, useEffect } from "react";
import { ChatBot, Refresh, Send } from "@/components/ui/icons";
import ClickButton from "@/components/ui/button/click-button";
import FieldInput from "@/components/ui/input/field-input";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LoaderBounceDot } from "@/components/ui/loader";

const AIChatPage = () => {
	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,
		isLoading,
		reload,
		error,
	} = useChat({ api: "/api/ai/gemini/ai-chat" });

	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	return (
		<div className="min-h-[calc(100vh-64px)] w-full flex flex-col bg-gray-200 z-50">
			{/* Header */}
			<header className="bg-primary-600 text-white p-4 flex justify-between items-center shadow-md">
				<div className="flex items-center space-x-3">
					<ChatBot className="h-8 w-8" />
					<h1 className="text-xl font-bold">TouchWood AI Chat</h1>
				</div>
				<div className="flex space-x-4">
					<ClickButton
						id="history-button"
						variant="none"
						size="sm"
						onClick={() => reload()}
					>
						<Refresh className="w-6 h-6" />
					</ClickButton>
				</div>
			</header>

			{/* Main Content */}
			<div className="flex-1 flex overflow-hidden">
				{/* Chat Area */}
				<div className="flex-1 flex flex-col">
					{/* Messages */}
					<div className="flex-1 overflow-y-auto p-6 bg-gray-100 drop-shadow-2xl">
						{messages.length === 0 ? (
							<div className="h-full flex items-center justify-center text-gray-500">
								Start a conversation with TouchWood AI...
							</div>
						) : (
							messages.map((message, index) => (
								<div
									key={index}
									className={`flex mb-4 ${
										message.role === "user" ? "justify-end" : "justify-start"
									}`}
								>
									<div
										className={`max-w-[70%] p-3 rounded-lg ${
											message.role === "user"
												? "bg-primary-600 text-white"
												: "bg-gray-200 text-gray-900"
										}`}
									>
										<ReactMarkdown
											remarkPlugins={[remarkGfm]}
											components={{
												code: ({
													inline,
													className,
													children,
													...props
												}: {
													inline?: boolean;
													className?: string;
													children?: React.ReactNode;
												}) =>
													inline ? (
														<code
															className={`bg-gray-300 text-gray-900 p-1 rounded ${className}`}
															{...props}
														>
															{children}
														</code>
													) : (
														<pre
															className={`bg-gray-300 text-gray-900 p-2 rounded ${className}`}
															{...(props as React.HTMLAttributes<HTMLPreElement>)}
														>
															{children}
														</pre>
													),
												ul: ({ children }) => (
													<ul className="list-disc list-inside">{children}</ul>
												),
												li: ({ children }) => (
													<li className="text-left">{children}</li>
												),
											}}
										>
											{message.content}
										</ReactMarkdown>
									</div>
								</div>
							))
						)}

						{isLoading && (
							<div className="flex justify-center">
								<LoaderBounceDot color="#666" width={30} height={12} />
							</div>
						)}

						{error && (
							<div className="flex justify-center items-center space-x-2 text-red-600">
								<span>Error occurred</span>
								<ClickButton
									id="chat-reload-button"
									variant="none"
									size="sm"
									onClick={() => reload()}
								>
									<Refresh className="w-5 h-5" />
								</ClickButton>
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>

					{/* Input Area */}
					<div className="bg-white p-4 border-t shadow-lg">
						<form
							onSubmit={handleSubmit}
							className="flex items-center space-x-2"
						>
							<FieldInput
								id="chat-message"
								value={input}
								onChange={handleInputChange}
								placeholder="Type your message..."
								className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
								disabled={isLoading}
								name="chat-message"
								aria-label="chat-message"
								data-testid="chat-message"
								autoFocus
							/>
							<ClickButton
								id="chat-send-button"
								type="submit"
								variant="shadow-default"
								size="lg"
								disabled={isLoading}
								loading={isLoading}
							>
								<Send className="w-6 h-6" />
							</ClickButton>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AIChatPage;
