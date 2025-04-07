import './styles.css';
import React, { useState, useRef, useEffect } from 'react';
import { ChatBot, CloseCircleX, LiveHelp, Refresh, Send } from '@/components/ui/icons';
import ClickButton from '@/components/ui/button/click-button';
import { motion, AnimatePresence } from 'framer-motion';
import FieldInput from '@/components/ui/input/field-input';
import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LoaderBounceDot } from '@/components/ui/loader';

interface ChatbotProps {
  link: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ link }) => {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload
  } = useChat({ 
    api: '/api/ai/live',
    body: { websiteUrl: link } 
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => setIsOpen((prev) => !prev);

  return (
    <>
      {!isOpen && (
        <motion.div id="live-chat-button" onClick={toggleChat} className="shadow cursor-pointer">
          <LiveHelp className="w-8 h-8" />
        </motion.div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div id="chatbot-container" className="shadow">
            <header id="chatbot-header">
              <ClickButton id="close-chat" onClick={toggleChat} className="shadow">
                <CloseCircleX className="w-7 h-7 text-gray-600" />
              </ClickButton>
              <div id="header-content" className="flex space-x-2">
                <ChatBot className="h-8 w-8" />
                <p id="chatbot-title">Chatbot</p>
              </div>
            </header>

            <div id='chatbot-body' >
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-2 max-w-[75%] text-sm ${message.role === 'user' ? 'bg-neutral-600' : 'bg-primary-200'} text-white rounded-lg`}>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code: ({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode }) =>
                          inline ? (
                            <code className={`bg-gray-200 text-gray-900 p-1 rounded-md ${className}`} {...props}>
                              {children}
                            </code>
                          ) : (
                            <pre className={`bg-gray-200 text-gray-900 p-2 rounded-md ${className}`} {...(props as React.HTMLAttributes<HTMLPreElement>)}>
                              {children}
                            </pre>
                          ),
                        ul: ({ children }) => <ul className="list-disc list-inside">{children}</ul>,
                        li: ({ children }) => <li className="text-left">{children}</li>,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}

              {/* Loading State */}
              {isLoading && (
                <ClickButton
                  id="stop-chat"
                  onClick={stop}
                  variant="none"
                  size="none"
                >
                  <LoaderBounceDot color='#fff' width={30} height={12} />
                </ClickButton>
              )}

              {/* Error State */}
              {error && (
                <ClickButton
                  id="error-reload-chat"
                  variant="none"
                  size="none"
                  onClick={() => reload()}
                >
                  <span>{'Error occured. try again?'}</span>
                  <Refresh className="w-5 h-5 bg-danger-700 rounded-2xl p-0.5" color='#e3e3e3' />
                </ClickButton>
              )}
              {/* Auto-scroll to the bottom */}
              <div ref={messagesEndRef} />
            </div>

            <footer>
              <form id="chat-form" onSubmit={handleSubmit} className="flex gap-2">
                <FieldInput
                  id="chat-message"
                  name="input-chat-message"
                  type="text"
                  required
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me..."
                  autoComplete="on" aria-label={''} data-testid={''}                />
                <ClickButton id="send-chat" type="submit" loading={isLoading}>
                  <Send className="w-6 h-6" />
                </ClickButton>
              </form>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
