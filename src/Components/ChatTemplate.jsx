import React, { useState } from "react";
import axios from "axios";
import { IoSend } from "react-icons/io5";

const ChatTemplate = ({ content }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    setInput("");

    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, from: "user" }]);
      try {
        const res = await axios.post(
          "https://anynotes-python.onrender.com/question",
          { content, question: input },
          { headers: { "Content-Type": "application/json" } }
        );

        if (res.data && res.data.response) {
          setMessages((prev) => [
            ...prev,
            { text: res.data.response, from: "bot" },
          ]);
        }
      } catch (error) {
        console.error(error);
        setMessages((prev) => [
          ...prev,
          { text: "Failed to get a response. Please try again.", from: "bot" },
        ]);
      }
    }
  };

  return (
    <div className="fixed right-5 bottom-20 md:right-10 md:bottom-16 w-[80%] md:w-[25%] h-[60%] md:h-[80%] bg-black z-50 rounded-xl">
      <div className="w-full h-full flex flex-col bg-white p-2 rounded-xl">
        <div className="flex-grow overflow-auto flex flex-col gap-3 p-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-[70%] ${
                  message.from === "user"
                    ? "bg-[#2F2F2F] text-white"
                    : "bg-[#2F2F2F] text-white"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex items-center gap-2 p-2">
          <input
            type="text"
            className="w-full p-2 rounded-md border border-gray-300 text-sm md:text-base"
            placeholder="Ask Anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-black text-white p-2 rounded-md"
            onClick={handleSendMessage}
          >
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatTemplate;
