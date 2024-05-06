
import React, { useState, useEffect } from "react";
import'../stylings/ChatAssistant.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAppleAlt,
  faHandPaper,
  faPaperPlane,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
export default function ChatAssistant() {
    const apikey = process.env.REACT_APP_API_KEY;
    const [userMessage, setUserMessage] = useState(""); // State to store user's message
    const [chatMessages, setChatMessages] = useState([
      { role: "incoming", content: "Hi there 👋\nHow can I help you today?" },
    ]); // State to store chat messages
    const [canInfo, setCarInfo] = useState([])
    const [isTyping, setIsTyping] = useState(false);
  
    const inputInitHeight = 40; // Initial height of the input textarea
  
    useEffect(() => {
      fetch("http://127.0.0.1:5000/cars/all")
        .then((response) => response.json())
        .then((data) => {
          setCarInfo(data);
        })
        .catch((error) => console.error("Error fetching cars:", error));
    }, []);
    const handleInputChange = (e) => {
      setUserMessage(e.target.value); // Update user's message as they type
    };
  
    const handleSendChat = async () => {
      if (!userMessage.trim()) return; // Do nothing if the message is empty or contains only whitespace
  
      const newUserMessage = { role: "outgoing", content: userMessage.trim() }; // User's message
      setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setUserMessage(""); // Clear the input field after sending the message
  
      setIsTyping(true);
  
      await processMessageToChatGPT(newUserMessage);
    };
  
    async function processMessageToChatGPT(message) {
      const promptMessage = {
        role: "system",
        content:
          `This is a chat for assisting Car dealership where It would answer anything car related answer based on car inventory car invertory: ${canInfo}`,
      };
      const apiRequestBody = {
        model: "gpt-3.5-turbo",
        messages: [
          promptMessage,
          { role: "user", content: message.content },
        ],
      };
  
      await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + apikey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      })
        .then((data) => data.json())
        .then((data) => {
          const chatbotResponse = {
            role: "incoming",
            content: data.choices[0].message.content,
          };
          setChatMessages((prevMessages) => [...prevMessages, chatbotResponse]);
          setIsTyping(false);
        })
        .catch((error) => {
          console.error("Error fetching response from OpenAI API:", error);
          setIsTyping(false);
        });
    }
  
    return (
      <div>
        <button
          className="chatbot-toggler"
          onClick={() => document.body.classList.toggle("show-chatbot")}
        >
          <span className="material-symbols-rounded">
            <FontAwesomeIcon icon={faPaperPlane} />
          </span>
          <span className="material-symbols-outlined">
            <FontAwesomeIcon icon={faXmark} size="2x" />
          </span>
        </button>
        <div className="chatbot">
          <header>
            <h2>Chatbot</h2>
            <span
              className="close-btn material-symbols-outlined"
              onClick={() => document.body.classList.remove("show-chatbot")}
            >
              close
            </span>
          </header>
          <ul className="chatbox">
            {chatMessages.map((message, index) => (
              <li key={index} className={`chat ${message.role}`}>
                {message.role === "incoming" && (
                  <span className="material-symbols-outlined">
                    <FontAwesomeIcon icon={faAppleAlt} />
                  </span>
                )}
                <p>{message.content}</p>
              </li>
            ))}
          </ul>
          <div className="chat-input">
            <textarea
              placeholder="Enter a message..."
              spellCheck="false"
              value={userMessage}
              onChange={handleInputChange}
              style={{
                height:
                  Math.min(
                    180,
                    inputInitHeight + (userMessage.split("\n").length - 1) * 20
                  ) + "px",
              }}
            />
            <span
              id="send-btn"
              className="material-symbols-rounded"
              onClick={handleSendChat}
            >
              {isTyping ? "Typing..." : <FontAwesomeIcon icon={faSearch} />}
            </span>
          </div>
        </div>
      </div>
    );
  };