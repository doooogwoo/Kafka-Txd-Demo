import useWebSocket from "../hook/useWebSocket";
import { useState, useEffect, useRef } from "react";
import { TxnShow } from "./TxnShow";
import useWebSocket2 from "../hook/useWebSocket2";
export default function TxnDashboard() {
  const data = useWebSocket();
  const data2 = useWebSocket2();
  const displayData = data.slice(-20);
  console.log("目前交易筆數:" + data.length);

  const [tps, setTps] = useState(0);
  const prevRef = useRef(0);

  const dataRef = useRef(data);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = dataRef.current.length;
      const diff = current - prevRef.current;

      setTps(diff);
      prevRef.current = current;
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-lg">
      <TxnShow txnCount={tps} />
      {/* <TxnShow txnCount={tps} title="每秒交易量 (TPS)" /> */}
      <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-800">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-5 w-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </span>
          目前異常金額交易累積筆數：
          <span className="rounded-lg bg-red-500 px-3 py-1 text-white">
            {data2.length}
          </span>
        </h2>
        <div className="space-y-3">
          {data2.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-orange-200 bg-white p-4 shadow-sm transition hover:border-orange-400 hover:bg-orange-50 hover:shadow-md"
            >
              {/* 第一行：交易ID + 時間 */}
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-orange-600">
                  {item.transactionId}
                </span>
                <span className="text-sm text-gray-500">{item.timestamp}</span>
              </div>

              {/* 第二行：帳戶 + 裝置 + 金額 */}
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <span className="rounded bg-orange-100 px-2 py-1 text-sm font-medium text-orange-700">
                    {item.accountId}
                  </span>
                  <span className="rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-700">
                    {item.deviceId}
                  </span>
                </div>
                <span className="font-mono text-lg font-bold text-red-600">
                  $
                  {item.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h2 className="mb-4 text-xl font-bold text-gray-800">
        Consumer 目前資料拉取的正常資料
      </h2>
      <div className="space-y-3">
        {displayData.map((item, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:bg-gray-100"
          >
            {/* 第一行：交易ID + 時間 */}
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-sm font-semibold text-blue-600">
                {item.transactionId}
              </span>
              <span className="text-sm text-gray-500">{item.timestamp}</span>
            </div>

            {/* 第二行：帳戶 + 裝置 + 金額 */}
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <span className="rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-700">
                  {item.accountId}
                </span>
                <span className="rounded bg-purple-100 px-2 py-1 text-sm font-medium text-purple-700">
                  {item.deviceId}
                </span>
              </div>
              <span className="font-mono text-lg font-bold text-gray-900">
                ${item.amount.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
      {data.length === 0 && (
        <p className="py-8 text-center text-gray-400">尚無資料</p>
      )}
    </div>
  );
}
