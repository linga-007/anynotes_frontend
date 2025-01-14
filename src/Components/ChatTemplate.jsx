import React, { useState } from "react";
import axios from "axios";
import { IoSend } from "react-icons/io5";


const ChatTemplate = ({ content }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    setInput("");
  
    if (input.trim()) {
      // Add the user's message to the state
      setMessages((prev) => [...prev, { text: input, from: "user" }]);
      try {
        console.log(content);
        const res = await axios.post(
          "https://anynotes-python.onrender.com/question",
          {
            content: content,
            question: input,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
  
        // Add the bot's response to the state
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
    <div className="fixed right-10 top-16 w-[25%] h-[80%] bg-black z-50">
      <div className="w-full h-full flex flex-col justify-between items-center bg-white p-2 rounded-xl">
        <div className="w-full h-[90%] overflow-auto flex flex-col gap-3 p-3">
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
                    ? "bg-[#2F2F2F] text-white text-sm"
                    : "bg-[#2F2F2F] text-white text-sm"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex items-center gap-2 p-1">
          <input
            type="text"
            className="w-full p-2 rounded-md border border-gray-300 font-semibold"
            placeholder="Ask Anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-black text-white p-2 rounded-md font-semibold"
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
