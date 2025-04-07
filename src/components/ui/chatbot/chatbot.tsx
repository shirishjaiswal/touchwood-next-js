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

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    error
  } = useChat({ api: '/api/ai/gemini/chatbot' });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      {!isOpen && (
        <motion.div
          id="live-chat-button"
          onClick={toggleChat}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          exit={{ y: 100, opacity: 0, transition: { duration: 0.2 } }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className='shadow'
        >
          <LiveHelp className="w-8 h-8" />
        </motion.div>
      )}

      <AnimatePresence>
        {isOpen && (
          <div id='chatbot-container' className='shadow'
          >
            <header id='chatbot-header'>
              <ClickButton
                id='close-chat'
                variant='none'
                size='none'
                onClick={toggleChat}
                className='shadow'
              >
                <CloseCircleX className="w-7 h-7" color='grey' />
              </ClickButton>
              <div id='header-content' className='flex space-x-2'>
                <ChatBot className="h-8 w-8" />
                <p id='chatbot-title' >TouchWood Chatbot</p>
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
              <form id='chat-form' onSubmit={handleSubmit}>
                <FieldInput
                  id='chat-message'
                  name='input-chat-message'
                  aria-label='input-chat-message'
                  data-testid='input-chat-message'
                  type="text"
                  required
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me about TouchWood..."
                  autoCorrect='on'
                  autoComplete='on'
                  className="w-full p-2 border-none focus:outline-none bg-transparent" />
                <ClickButton
                  id='send-chat'
                  type='submit'
                  loading={isLoading}
                >
                  <Send className="w-6 h-6 " />
                </ClickButton>
              </form>
            </footer>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
