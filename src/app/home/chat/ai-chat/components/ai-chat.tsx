"use client";
import React, { useRef, useEffect } from "react";
import { ChatBot, Refresh, Send } from "@/components/ui/icons";
import ClickButton from "@/components/ui/button/click-button";
import FieldInput from "@/components/ui/input/field-input";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LoaderBounceDot } from "@/components/ui/loader";
import "@/components/ui/ai/styles.css";

const AIChatPage = () => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    reload,
    error,
    setMessages,
  } = useChat({ api: "/api/ai/gemini/ai-chat" });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleResetChat = () => {
    setMessages([]); // Clear all messages
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex flex-col bg-gray-950 z-50">
      <header className="z-10 sticky top-16 bg-gradient-to-r from-purple-800/90 to-blue-800/90 backdrop-blur-lg  border-b border-blue-700/40 p-4 flex justify-between items-center rounded-b-2xl transition-all duration-300">
        <div className="flex items-center space-x-3">
          <ChatBot className="h-8 w-8 text-white drop-shadow" />
          <h1 className="text-xl font-semibold text-white tracking-wide">
            TouchWood AI Chat
          </h1>
        </div>
        <div className="flex space-x-4">
          <ClickButton
            id="close-chat"
            variant="none"
            size="sm"
            onClick={handleResetChat}
          >
            <Refresh className="w-6 h-6 text-white" />
          </ClickButton>
        </div>
      </header>

      <div id="ai-help-box-container" className="flex-1 flex flex-col">
        <div className="flex-1 space-y-4 p-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              Start a conversation with TouchWood AI...
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className="space-y-2">
                <div
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-purple-700 to-blue-700 text-white"
                        : "bg-gray-800/60 text-gray-200 border border-gray-700"
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
                              className={`bg-gray-900 text-white px-1 py-0.5 rounded ${className}`}
                              {...props}
                            >
                              {children}
                            </code>
                          ) : (
                            <pre
                              className={`bg-gray-900 text-white p-3 rounded-lg overflow-x-auto ${className}`}
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
                  {message.role !== "user" && (
                    <div className="flex justify-end pr-2">
                      <ClickButton
                        id={`reload-message-${index}`}
                        variant="none"
                        size="xs"
                        onClick={() => reload()}
                        className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <Refresh className="w-4 h-4 mr-1" />
                        Reload
                      </ClickButton>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex justify-center">
              <LoaderBounceDot color="#8b5cf6" width={30} height={12} />
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center space-x-2 text-red-500">
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

        <footer>
          <form onSubmit={handleSubmit} id="chat-form">
            <FieldInput
              id="chat-message"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={isLoading}
              name="chat-message"
              aria-label="chat-message"
              data-testid="chat-message"
              autoFocus
            />
            <ClickButton
              id="send-chat"
              type="submit"
              variant="none"
              size="lg"
              disabled={isLoading}
              loading={isLoading}
            >
              <Send className="w-5 h-5" />
            </ClickButton>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default AIChatPage;
