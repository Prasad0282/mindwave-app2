import React, { useState, useEffect } from "react";
import {
  Menu,
  Send,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  Globe2,
  MessageSquare,
  X,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "../components/Button";
import {
  createNewChat as createNewChatAPI,
  sendMessage as sendMessageAPI,
  changeLanguage as changeLanguageAPI,
  submitFeedback as submitFeedbackAPI,
} from "../api";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  isTyping?: boolean;
  displayedContent?: string;
}

interface ChatData {
  id: string;
  title: string;
  messages: ChatMessage[];
}

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "zh", name: "Chinese" },
  { code: "hi", name: "Hindi" },
];

export const ChatPage: React.FC = () => {
  const [chats, setChats] = useState<ChatData[]>([]);
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showFeedbackSuccess, setShowFeedbackSuccess] = useState(false);

  const [feedbackData, setFeedbackData] = useState({
    rating: null as "positive" | "negative" | null,
    comment: "",
  });
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    // Load chats from localStorage when component mounts
    const storedChats = localStorage.getItem("chats");
    const storedChatId = localStorage.getItem("currentChat");

    console.log(storedChatId);
    console.log(storedChats);

    if (storedChats) {
      setChats(JSON.parse(storedChats));
    }
    if (storedChatId) {
      setCurrentChat(storedChatId);
    }
  }, []);

  useEffect(() => {
    const initializeDefaultChat = async () => {
      const params = new URLSearchParams(window.location.search);
      const chatIdFromURL = params.get("chat");

      if (chatIdFromURL) {
        setCurrentChat(chatIdFromURL);
      } else if (chats.length === 0) {
        try {
          const newChat = await createNewChatAPI();
          const initialChat: ChatData = {
            id: newChat.id,
            title: newChat.title || "New Chat",
            messages: [],
          };
          setChats([initialChat]);
          setCurrentChat(initialChat.id);
          //update URL
          localStorage.setItem("chats", JSON.stringify([initialChat]));
          localStorage.setItem("currentChat", initialChat.id);

          // Update URL
          window.history.replaceState({}, "", `?chat=${initialChat.id}`);
        } catch (error) {
          console.error("Failed to create default chat:", error);
        }
      }
    };

    if (chats.length === 0) {
      initializeDefaultChat();
    }
  }, [chats]); // Depend on `chats` so it doesn't overwrite existing data

  // useEffect(() => {
  //   // Load chats from localStorage when component mounts
  //   const storedChats = localStorage.getItem("chats");
  //   const storedChatId = localStorage.getItem("currentChat");
  //   console.log("Stored Chats:", storedChats);
  //   console.log("Stored Chat ID:", storedChatId);

  //   if (storedChats) {
  //     setChats(JSON.parse(storedChats));
  //   }
  //   if (storedChatId) {
  //     setCurrentChat(storedChatId);
  //   }
  // }, []);
  ///////////////////////
  useEffect(() => {
    // Save chats to localStorage whenever they change
    if (chats.length > 0) {
      localStorage.setItem("chats", JSON.stringify(chats));
    }
  }, [chats]);

  useEffect(() => {
    // Save currentChat to localStorage whenever it changes
    if (currentChat) {
      localStorage.setItem("currentChat", currentChat);
    }
  }, [currentChat]);
  ////////////////////////

  const animateText = async (messageId: string, text: string) => {
    const words = text.split(" ");
    let currentText = "";

    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? "" : " ") + words[i];
      setChats((prevChats) =>
        prevChats.map((chat) => ({
          ...chat,
          messages: chat.messages.map((msg) =>
            msg.id === messageId
              ? { ...msg, displayedContent: currentText }
              : msg
          ),
        }))
      );
      await new Promise((resolve) => setTimeout(resolve, 50)); // 0.01 second delay per word
    }

    setChats((prevChats) =>
      prevChats.map((chat) => ({
        ...chat,
        messages: chat.messages.map((msg) =>
          msg.id === messageId
            ? { ...msg, isTyping: false, displayedContent: text }
            : msg
        ),
      }))
    );
  };

  const formatMessage = (text: string) => {
    const boldUppercaseRegex = /\*\*(.*?)\*\*/g;
    let formattedText = text.replace(
      boldUppercaseRegex,
      (_, p1) =>
        `<strong style="font-weight: bold; text-transform: uppercase;">${p1}</strong>`
    );

    if (text.includes("Examples")) {
      formattedText = formattedText.replace(
        "Examples",
        "<strong>Examples</strong>"
      );
    }

    const closingSentenceRegex = /(Now, let's practice.*?\".*?\"\.)/g;
    formattedText = formattedText.replace(
      closingSentenceRegex,
      (match) => `<em>${match}</em>`
    );

    return formattedText.replace(/\n/g, "<br>");
  };

  const handleCreateNewChat = async () => {
    try {
      setIsLoading(true);
      const newChat = await createNewChatAPI();
      const chatData: ChatData = {
        id: newChat.id,
        title: newChat.title,
        messages: [],
      };
      const updatedChats = [...chats, chatData];
      setChats((prevChats) => [...prevChats, chatData]);
      setCurrentChat(chatData.id);

      // Save to localStorage
      localStorage.setItem("chats", JSON.stringify(updatedChats));
      localStorage.setItem("currentChat", chatData.id);

      window.history.pushState({}, "", `?chat=${chatData.id}`);
    } catch (error) {
      console.error("Failed to create new chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChat(chatId);
    window.history.pushState({}, "", `?chat=${chatId}`);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !currentChat || isLoading) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChat
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );
    setMessage("");
    setIsBotTyping(true);

    try {
      setIsLoading(true);
      const response = await sendMessageAPI(currentChat, message);
      const botMessageId = (Date.now() + 1).toString();
      const botMessage: ChatMessage = {
        id: botMessageId,
        content: response,
        sender: "bot",
        timestamp: new Date(),
        isTyping: true,
        displayedContent: "",
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChat
            ? { ...chat, messages: [...chat.messages, botMessage] }
            : chat
        )
      );

      await animateText(botMessageId, response);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
      setIsBotTyping(false);
    }
  };

  const handleLanguageChange = async (lang: (typeof languages)[0]) => {
    try {
      setIsLoading(true);
      await changeLanguageAPI(lang.code);
      setSelectedLanguage(lang);
    } catch (error) {
      console.error("Failed to change language:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedbackData.rating) return;

    try {
      setIsLoading(true);
      await submitFeedbackAPI(feedbackData.rating, feedbackData.comment);

      setShowFeedback(false);
      setShowFeedbackSuccess(true);

      // Clear feedback form
      setFeedbackData({ rating: null, comment: "" });

      // Hide success message after 3 seconds
      setTimeout(() => setShowFeedbackSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteChat = (id: string) => {
    setChats((prevChats) => {
      const filteredChats = prevChats.filter((chat) => chat.id !== id);
      if (currentChat === id && filteredChats.length > 0) {
        setCurrentChat(filteredChats[0].id);
      } else if (filteredChats.length === 0) {
        setCurrentChat(null);
      }
      return filteredChats;
    });
  };

  const renameChat = (id: string, newTitle: string) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === id ? { ...chat, title: newTitle } : chat
      )
    );
    setEditingChatId(null);
  };

  const getCurrentChat = () => chats.find((chat) => chat.id === currentChat);

  return (
    <div className="h-screen flex bg-gray-900 overflow-hidden">
      {/* Left Sidebar */}
      <aside
        className={`
          w-64 bg-gray-800 flex-shrink-0
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          fixed inset-y-0 left-0 z-20
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col p-4">
          <h2 className="text-white text-lg font-bold mb-6 text-center ">
            Conversations
          </h2>
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={handleCreateNewChat}
              className="flex-1 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              <Plus size={20} />
              New Chat
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsSidebarOpen(false)}
              className="ml-2 md:hidden"
            >
              <X size={20} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`
                  flex items-center justify-between p-2 rounded-lg cursor-pointer
                  ${
                    currentChat === chat.id
                      ? "bg-purple-600"
                      : "hover:bg-gray-700"
                  }
                `}
                onClick={() => handleSelectChat(chat.id)}
              >
                {editingChatId === chat.id ? (
                  <input
                    type="text"
                    defaultValue={chat.title}
                    className="bg-transparent text-white outline-none flex-1"
                    onBlur={(e) => renameChat(chat.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        renameChat(chat.id, e.currentTarget.value);
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <>
                    <span className="text-white truncate flex-1">
                      {chat.title}
                    </span>
                    <div className="flex gap-2 ml-2">
                      <Button
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingChatId(chat.id);
                        }}
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden"
            >
              <Menu size={24} />
            </Button>
            <h1 className="text-white text-xl font-semibold">Chat</h1>
          </div>
          <Button
            variant="ghost"
            onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          >
            <MoreVertical size={24} />
          </Button>
        </header>
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {getCurrentChat()?.messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg p-4 max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {msg.sender === "bot" ? (
                    <>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: formatMessage(msg.displayedContent || ""),
                        }}
                      />
                      {/* Typing indicator for bot */}

                      {getCurrentChat()?.messages?.length &&
                        msg.isTyping &&
                        index === getCurrentChat()!.messages.length - 1 && (
                          <div className="flex items-center gap-2 mt-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm text-gray-400">
                              Typing...
                            </span>
                          </div>
                        )}
                    </>
                  ) : (
                    <p>{msg.content}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Thinking indicator for bot */}
            {isBotTyping &&
              !getCurrentChat()?.messages.some((msg) => msg.isTyping) && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-white rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-700">
          <div className="max-w-4xl mx-auto flex gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside
        className={`
          w-64 bg-gray-800 flex-shrink-0
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          fixed inset-y-0 right-0 z-20
          ${
            isRightSidebarOpen
              ? "translate-x-0"
              : "translate-x-full md:translate-x-0"
          }
        `}
      >
        <div className="h-full flex flex-col p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-lg font-semibold">Settings</h2>
            <Button
              variant="ghost"
              onClick={() => setIsRightSidebarOpen(false)}
              className="md:hidden"
            >
              <X size={20} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Language Selection */}
            <div className="mb-6">
              <h3 className="text-white text-sm font-medium mb-3">Language</h3>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang)}
                    className={`
                      w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
                      ${
                        selectedLanguage.code === lang.code
                          ? "bg-purple-600 text-white"
                          : "text-gray-300 hover:bg-gray-700"
                      }
                    `}
                  >
                    <Globe2 size={16} />
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Button */}
            <Button
              onClick={() => setShowFeedback(true)}
              className="w-full flex items-center justify-center gap-2"
            >
              <MessageSquare size={16} />
              Send Feedback
            </Button>
          </div>
        </div>
      </aside>

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 animate-fade-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl font-semibold">
                Send Feedback
              </h2>
              <Button variant="ghost" onClick={() => setShowFeedback(false)}>
                <X size={20} />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  How was your experience?
                </label>
                <div className="flex gap-4">
                  <Button
                    variant={
                      feedbackData.rating === "positive" ? "primary" : "ghost"
                    }
                    onClick={() =>
                      setFeedbackData((prev) => ({
                        ...prev,
                        rating: "positive",
                      }))
                    }
                    className="flex-1"
                  >
                    <ThumbsUp size={20} />
                  </Button>
                  <Button
                    variant={
                      feedbackData.rating === "negative" ? "primary" : "ghost"
                    }
                    onClick={() =>
                      setFeedbackData((prev) => ({
                        ...prev,
                        rating: "negative",
                      }))
                    }
                    className="flex-1"
                  >
                    <ThumbsDown size={20} />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Additional Comments
                </label>
                <textarea
                  value={feedbackData.comment}
                  onChange={(e) =>
                    setFeedbackData((prev) => ({
                      ...prev,
                      comment: e.target.value,
                    }))
                  }
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={4}
                  placeholder="Tell us more about your experience..."
                />
              </div>

              <Button
                onClick={handleFeedbackSubmit}
                className="w-full"
                disabled={!feedbackData.rating}
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Success Toast */}
      {showFeedbackSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg flex items-center gap-2 animate-fade-up">
            <CheckCircle2 size={20} />
            Thank you for your feedback! 🎉
          </div>
        </div>
      )}
    </div>
  );
};
