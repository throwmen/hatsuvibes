"use client";

import { useState, useRef, useEffect } from "react";
import { Send, MessageSquare, X } from "lucide-react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, `USER_SPLIT${userMessage}`]);
    setInput("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });

      if (!res.ok) throw new Error("Error en la respuesta del servidor");

      const data = await res.json();
      setMessages((prev) => [...prev, `BOT_SPLIT${data.response}`]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        "BOT_SPLITHubo un error al conectarse con el modelo.",
      ]);
    }
  };

  return (
    <>
      {/* Botón flotante mejorado */}
      <button
        onClick={() => setOpen(!open)}
        className={`cursor-pointer fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300 ${
          open
            ? "bg-rose-600 transform rotate-90"
            : "bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
        }`}
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageSquare className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Ventana de chat estilo WhatsApp */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-[32rem] bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 text-white flex items-center">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold">HatsuBot</h3>
              <p className="text-xs opacity-80">En línea</p>
            </div>
          </div>

          {/* Área de mensajes */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#e5ddd5] bg-opacity-30">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center text-gray-500 text-sm">
                <p>Envía un mensaje para empezar la conversación</p>
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isBot = msg.startsWith("BOT_SPLIT");
                const messageContent = isBot
                  ? msg.replace("BOT_SPLIT", "")
                  : msg.replace("USER_SPLIT", "");

                return (
                  <div
                    key={idx}
                    className={`flex mb-4 ${
                      isBot ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        isBot
                          ? "bg-white text-gray-800 rounded-tl-none"
                          : "bg-emerald-100 text-gray-800 rounded-tr-none"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {messageContent}
                      </p>
                      <p className="text-right text-xs text-gray-500 mt-1">
                        {new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-3 bg-white border-t flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Escribe un mensaje..."
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-2 rounded-full hover:from-emerald-600 hover:to-teal-700 transition-all duration-300"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
