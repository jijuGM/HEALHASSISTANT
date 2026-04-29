import { useState, useEffect, useRef } from "react";
import { askAI } from "../../services/api";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hey 👋 I’m your PCOD assistant. Tell me what you're feeling today."
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const [userState, setUserState] = useState({
    sleep: null,
    stress: null,
    cycle_phase: null,
    craving: null,
    meal_timing: null,
    hydration: null
  });

  // Auto scroll to bottom when messages change
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const extractData = (text) => {
    let data = {};
    const lower = text.toLowerCase();
    const sleepMatch = lower.match(/(\d+)\s*hours?/);
    if (sleepMatch) data.sleep = parseInt(sleepMatch[1]);

    if (lower.includes("stress") || lower.includes("tired") || lower.includes("anxious")) {
      data.stress = "high";
    } else if (lower.includes("good") || lower.includes("fine")) {
      data.stress = "low";
    }

    if (lower.includes("chocolate") || lower.includes("sweet")) {
      data.craving = "sweet";
    }

    if (lower.includes("period")) {
      data.cycle_phase = "luteal";
    }
    return data;
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    
    // Clear input immediately for better UX
    const currentInput = input;
    setInput("");
    setLoading(true);

    const extracted = extractData(currentInput);
    const updatedState = { ...userState, ...extracted };
    setUserState(updatedState);

    try {
      const res = await askAI({
        question: currentInput,
        ...updatedState
      });

      console.log("Raw API Response:", res);

      // --- FIX: Flexible Response Parsing ---
      // This checks common locations for the AI text
      const botReply = 
        res?.data?.advice || // Axios standard nesting
        res?.advice ||       // Direct object response
        res?.data ||         // If the backend returns a raw string
        "🤔 I received a response, but it was empty. Try rephrasing?";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: typeof botReply === 'string' ? botReply : JSON.stringify(botReply) }
      ]);

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "⚠️ I'm having trouble connecting to the server. Please try again in a moment."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-slate-50 shadow-2xl overflow-hidden border-x border-gray-100">
      
      {/* Header */}
      <header className="p-6 bg-white border-b border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-indigo-900">PCOD Companion</h1>
          <p className="text-xs text-indigo-400 font-medium tracking-wide uppercase">AI Health Assistant</p>
        </div>
        <div className={`h-3 w-3 rounded-full ${loading ? 'bg-amber-400 animate-pulse' : 'bg-green-400'}`}></div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm shadow-sm ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-white text-slate-700 border border-gray-100 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <footer className="p-6 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2">
          <input
            className="flex-1 px-4 py-3 bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="How are you feeling today?"
          />

          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl disabled:opacity-50 hover:bg-indigo-700 active:scale-95 transition-all"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}