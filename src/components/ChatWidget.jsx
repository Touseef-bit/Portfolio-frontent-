import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

const API_ENDPOINT = `${import.meta.env.VITE_API_URL}/query`;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi there! I'm Touseef's AI assistant. Ask me anything about his work, projects, or availability.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const toggleWidget = () => setIsOpen((prev) => !prev);
  const closeWidget = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    scrollEl.scrollTop = scrollEl.scrollHeight;
  }, [messages, isLoading]);

  const canSend = useMemo(
    () => inputValue.trim().length > 0 && !isLoading,
    [inputValue, isLoading]
  );

  const sendMessage = useCallback(
    async (event) => {
      event.preventDefault();
      const trimmed = inputValue.trim();
      if (!trimmed || isLoading) return;

      const userMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsLoading(true);

      try {
        const response = await axios.post(
          API_ENDPOINT,
          {
            message: trimmed,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const botReply = response?.data?.data?.answer;

        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content:
              botReply ||
              "I couldn't fetch a response from the assistant. Please try again.",
          },
        ]);
      } catch (error) {
        console.error("Failed to send chat message:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-error-${Date.now()}`,
            role: "assistant",
            content:
              "Sorry, I wasn't able to reach the assistant. Please check your connection or try again later.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [API_ENDPOINT, inputValue, isLoading, messages]
  );

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      sendMessage(event);
    }
  };

  return (
    <>
      <button
        aria-label={isOpen ? "Close chat" : "Open chat"}
        type="button"
        onClick={toggleWidget}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
      >
        {isOpen ? (
          <CloseIcon fontSize="medium" />
        ) : (
          <ChatIcon fontSize="medium" />
        )}
      </button>

      <div
        className={`fixed bottom-24 right-6 z-50 w-[calc(100%-3rem)] max-w-sm transform rounded-2xl border border-purple-500/40 bg-[#0B0F1A] text-white shadow-2xl transition-all duration-300 ease-out sm:w-96 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0"
        } h-[26rem] sm:h-[28rem]`}
        role="dialog"
        aria-live="polite"
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between rounded-t-2xl bg-purple-600 px-4 py-3">
            <div className="space-y-0.5">
              <h2 className="text-sm font-semibold uppercase tracking-wide">
                Chat with Touseef’s AI Assistant 🤖
              </h2>
              <p className="text-xs text-white/80">
                Ask about skills, projects, availability, or anything else.
              </p>
            </div>
            <button
              type="button"
              onClick={closeWidget}
              className="rounded-full p-1 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label="Close chat"
            >
              <CloseIcon fontSize="small" />
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-700/70"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-white/8 px-3 py-2 text-xs text-white/80">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-300 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-200" />
                  </span>
                  Touseef’s assistant is thinking…
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={sendMessage}
            className="flex items-end gap-2 px-4 pb-4 pt-2"
          >
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              placeholder="Ask something about Touseef’s work…"
              className="h-11 flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
            />
            <button
              type="submit"
              disabled={!canSend}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-purple-600 px-3 text-sm font-medium text-white transition-colors hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Send message"
            >
              <SendIcon fontSize="small" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
