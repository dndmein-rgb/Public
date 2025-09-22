
import React, { useState } from 'react';
import Chatbot from 'supersimpledev'
import './App.css'

function ChatInput({ chatMessages, setChatMessages }) {
        const [inputText, setInputText] = useState('');

        function saveInputText(event) {
          setInputText(event.target.value);
        }

        async function sendMessage() {
          // Clear the textbox at the top now because the Chatbot
          // will take some time to load the response. We want
          // to clear the textbox immediately rather waiting
          // for the Chatbot to finish loading.
          setInputText('');

          const newChatMessages = [
            ...chatMessages,
            {
              message: inputText,
              sender: 'user',
              id: crypto.randomUUID()
            }
          ];

          setChatMessages([
            ...newChatMessages,
            // This creates a temporary Loading... message.
            // Because we don't save this message in newChatMessages,
            // it will be removed later, when we add the response.
            {
              message: <img src="loading-spinner.gif" className="loading-spinner" />,
              sender: 'robot',
              id: crypto.randomUUID()
            }
          ]);

          const response = await Chatbot.getResponseAsync(inputText);
          setChatMessages([
            ...newChatMessages,
            {
              message: response,
              sender: 'robot',
              id: crypto.randomUUID()
            }
          ]);
        }

        return (
          <div className="chat-input-container">
            <input
              placeholder="Send a message to Chatbot"
              size="30"
              onChange={saveInputText}
              value={inputText}
              className="chat-input"
            />
            <button
              onClick={sendMessage}
              className="send-button"
            >Send</button>
          </div>
        );
      }

         
      // Custom hook to auto-scroll to the bottom when chatMessages change
      import { useRef, useEffect } from 'react';

      function useAutoScroll() {
        const ref = useRef(null);

        useEffect(() => {
          if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
          }
        }, []);

        return ref;
      }

      function ChatMessages({ chatMessages }) {
        const chatMessagesRef = useAutoScroll([chatMessages]);

        return (
          <div className="chat-messages-container" ref={chatMessagesRef}>
            {chatMessages.map((chatMessage) => {
              return (
                <ChatMessage
                  message={chatMessage.message}
                  sender={chatMessage.sender}
                  key={chatMessage.id}
                />
              );
            })}
          </div>
        );
      }


function App() {
        const [chatMessages, setChatMessages] = useState([]);
        // const [chatMessages, setChatMessages] = array;
        // const chatMessages = array[0];
        // const setChatMessages = array[1];

        return (
          <div className="app-container">
            {chatMessages.length === 0 && (
              <p className="welcome-message">
                Welcome to the chatbot project! Send a message using the textbox below.
              </p>
            )}
            <ChatMessages
              chatMessages={chatMessages}
            />
            <ChatInput
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
          </div>
        );
      }

export default App
