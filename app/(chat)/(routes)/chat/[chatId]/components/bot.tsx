import React, { useState } from "react";
import axios from "axios";

interface ChatMessage {
  role: string;
  content: string;
}

const apiKey = process.env.OPENAI_API_KEY; // Replace with your OpenAI API key

const ChatComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get the user's message from the input field
    const message = inputValue.trim();
    if (!message) return;

    // Display the user's message
    const userMessage: ChatMessage = { role: "user", content: message };
    setChatMessages([...chatMessages, userMessage]);

    // Clear the input field
    setInputValue("");

    try {
      // Make a POST request to the OpenAI API
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt: message,
          model: "text-davinci-003",
          temperature: 0,
          max_tokens: 1000,
          top_p: 1,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      // Extract the chatbot's response
      const chatbotResponse = response.data.choices[0].text;

      // Display the chatbot's response
      const botMessage: ChatMessage = { role: "bot", content: chatbotResponse };
      setChatMessages([...chatMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <div id="chat-messages">
        {chatMessages.map((message, index) => (
          <div key={index} className={`message ${message.role}-message`}>
            <span>{message.content}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatComponent;
