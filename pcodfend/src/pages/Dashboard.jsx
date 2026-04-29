

import { useEffect, useState } from "react";
import Chat from "../components/Chat/Chat";
import { askAI } from "../services/api";

export default function Dashboard() {

  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);

  // temporary user data (later dynamic)
  const userState = {
    sleep: 5,
    stress: "medium",
    cycle_phase: "luteal",
    craving: "sweet"
  };

  useEffect(() => {
    const getInsight = async () => {
      try {
        const res = await askAI({
          question: "Give today's health insight",
          ...userState
        });

        setInsight(res.data.advice);
      } catch {
        setInsight("Unable to load insight");
      } finally {
        setLoading(false);
      }
    };

    getInsight();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        👋 Dashboard
      </h1>

      {/* 🔥 Smart Insight */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold text-indigo-600 mb-2">
          🧠 Smart Insight
        </h2>

        <p className="text-gray-600">
          {loading ? "Analyzing your data..." : insight}
        </p>
      </div>

      {/* 📊 Status Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Sleep</p>
          <p className="text-lg font-bold">{userState.sleep} hrs</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Stress</p>
          <p className="text-lg font-bold">{userState.stress}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Cycle</p>
          <p className="text-lg font-bold">{userState.cycle_phase}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Craving</p>
          <p className="text-lg font-bold">{userState.craving}</p>
        </div>
      </div>

      {/* 💬 Chat Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          💬 Ask AI
        </h2>
        <Chat />
      </div>

    </div>
  );
}