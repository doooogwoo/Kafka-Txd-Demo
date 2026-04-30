import useWebSocket from "../hook/useWebSocket";

export default function TxnDashboard() {
  const data = useWebSocket();
  console.log("目前交易筆數:" + data.length);
  
  return (
    // <div>
    //   <h2>交易即時資料</h2>

    //   {data.map((item, i) => (
    //     <div key={i}>
    //       {item.accountId} - {item.amount}
    //     </div>
    //   ))}
    // </div>
  
<div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-lg">
  <h2 className="mb-4 text-xl font-bold text-gray-800">交易即時資料</h2>
  
  <div className="space-y-3">
    {data.map((item, i) => (
      <div
        key={i}
        className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:bg-gray-100"
      >
        
        {/* 第一行：交易ID + 時間 */}
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-sm font-semibold text-blue-600">
            {item.transactionId}
          </span>
          <span className="text-sm text-gray-500">
            {item.timestamp}
          </span>
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
