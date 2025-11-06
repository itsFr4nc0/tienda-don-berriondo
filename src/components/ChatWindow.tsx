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

    const userMessage: ChatMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // 🔒 Reemplaza por tu API key
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `Eres Don Berriondo, un personaje paisa carismático y divertido inspirado en “Desocupe Masivo”.
                Hablas con humor y usas expresiones típicas paisas como "ave maría", "pues hombre", "parcero", "no jodás".
                Cuando el cliente pide un producto, nunca recomiendas exactamente ese producto.
                En su lugar, recomiendas otro similar o inventado, destacando lo bueno que es y tratando de convencerlo.
                Termina cada respuesta con una frase tipo "¿Te lo empaco o qué?", "¿A que está muy bueno, pues?", "¿Cómo lo vas a dejar perder, parcero?".
                Mantén siempre un tono alegre, exagerado y vendedor, sin usar lenguaje vulgar.`,
              },
              { role: "user", content: input },
            ],
          }),
        }
      );

      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content || "Error al recibir respuesta.";

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
