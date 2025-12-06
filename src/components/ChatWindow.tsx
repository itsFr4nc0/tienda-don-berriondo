import React, { useState } from "react";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

interface ChatWindowProps {
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const message: ChatMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, message]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/chat/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input, // 👈 solo envías el mensaje del usuario
        }),
      });

      const data = await response.json();

      const botReply =
        data.reply || "Error al recibir respuesta del servidor.";

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Hubo un problema al conectar con el servidor." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>Don Berriondo</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}

        {loading && <div className="chat-bubble bot">Escribiendo...</div>}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};
