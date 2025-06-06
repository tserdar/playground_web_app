import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

const apiUrl = import.meta.env.VITE_PLAYGROUND_API_URL;

const ChatBox = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`wss://${apiUrl.replace(/^https?:\/\//, "")}/chat`);
    setSocket(ws);

    ws.onopen = () => {
    setConnected(true);
    setMessages((prev) => [
      ...prev,
      `[BOT]: Connection established. You may start chatting.`,
    ]);
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, `[BOT]: ${event.data}`]);
    };

    ws.onclose = () => {
      setConnected(false);
    };

    return () => ws.close();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (socket && connected && input.trim()) {
      socket.send(input);
      setMessages((prev) => [...prev, `[YOU]: ${input}`]);
      setInput("");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col h-[70vh] max-h-[70vh] overflow-hidden">
      <div className="flex-1 overflow-y-auto bg-gray-800 rounded-md p-4 text-white text-sm space-y-2">
        {!connected && (
          <div className="text-yellow-400 font-medium mb-2">
            Please wait for connection...
          </div>
        )}
        {messages.map((msg, i) => {
            const isBot = msg.startsWith("[BOT]:");
            return (
                <div
                key={i}
                className={`whitespace-pre-wrap ${isBot ? "text-yellow-400" : "text-white"}`}
                >
                {msg}
                </div>
            );
        })}
        <div ref={chatEndRef} />
      </div>

      <div className="flex items-stretch mt-4 h-10">
        <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 rounded-l-md bg-gray-700 border border-gray-600 text-white focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!connected}
            onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
            }}
        />
        <button
            className="px-4 bg-green-600 text-white hover:bg-green-700 transition-colors rounded-r-md"
            onClick={handleSend}
            disabled={!connected || !input.trim()}
        >
            <Send className="h-4 w-4" />
        </button>
        </div>

    </div>
  );
};

export default ChatBox;
