import { useState } from "react";
import axios from "axios";
import TxnDashboard from "./TxnDashboard";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT),
});

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);

  // START
  const handleStart = async () => {
    if (isRunning) return;

    try {
      await api.post("/kafka/api/start-txn");
      setIsRunning(true);
    } catch (err) {
      console.error("start error:", err);
    }
  };

  // STOP
  const handleStop = async () => {
    if (!isRunning) return;

    try {
      await api.post("/kafka/api/stop-txn");
      setIsRunning(false);
    } catch (err) {
      console.error("stop error:", err);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-white">
      {/* Heading */}
      <h1 className="mb-2 text-center text-4xl font-bold text-gray-900">
        模擬資料串接
      </h1>
      <p className="mb-8 text-center text-gray-500">
        異常交易警示資料模擬
      </p>

      {/* 按鈕 */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="flex items-center gap-2 rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          開始模擬資料
        </button>

        <button
          onClick={handleStop}
          disabled={!isRunning}
          className="flex items-center gap-2 rounded-lg border-2 border-red-500 bg-white px-6 py-3 font-medium text-red-500 hover:bg-red-50 disabled:opacity-50"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" />
          </svg>
          停止模擬資料
        </button>
      </div>

      {/* 狀態指示器 */}
      {isRunning && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
          <span className="text-gray-600">正在擷取資料...</span>
        </div>
      )}
      <TxnDashboard/>
    </main>

  );
}
