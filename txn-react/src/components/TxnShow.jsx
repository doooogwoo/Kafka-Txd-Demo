import { useEffect, useState, useRef } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

/**
 * 交易即時監控元件
 * @param {Object} props
 * @param {number} props.txnCount - 當前交易筆數
 * @param {number} [props.maxDataPoints=20] - 最大顯示資料點數量
 * @param {string} [props.title="交易即時監控"] - 圖表標題
 */
export function TxnShow({
  txnCount,
  maxDataPoints = 20,
  title = "Consumer 目前資料拉取數",
}) {
  const [data, setData] = useState([])
  const [isAnimating, setIsAnimating] = useState(false)
  const prevCountRef = useRef(txnCount)

  // 格式化時間為 HH:mm:ss
  const formatTime = (date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")
    const period = hours >= 12 ? "下午" : "上午"
    const displayHours = (hours % 12 || 12).toString().padStart(2, "0")
    return `${period}${displayHours}:${minutes}:${seconds}`
  }

  // 當 txnCount 變化時，新增資料點
  useEffect(() => {
    if (txnCount !== prevCountRef.current) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 300)

      setData((prevData) => {
        const newPoint = {
          time: formatTime(new Date()),
          count: txnCount,
        }

        const newData = [...prevData, newPoint]

        // 保持最大資料點數量
        if (newData.length > maxDataPoints) {
          return newData.slice(-maxDataPoints)
        }
        return newData
      })

      prevCountRef.current = txnCount
    }
  }, [txnCount, maxDataPoints])

  // 計算 Y 軸範圍
  const counts = data.map((d) => d.count)
  const minCount = counts.length > 0 ? Math.min(...counts) : 0
  const maxCount = counts.length > 0 ? Math.max(...counts) : 100
  const yMin = Math.max(0, minCount - 10)
  const yMax = maxCount + 10

  // 目前筆數（最新值）
  const currentCount = data.length > 0 ? data[data.length - 1].count : txnCount

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-7">
      {/* 標題區 */}
      <div className="flex items-center gap-3 mb-4">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
        </span>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>

      {/* 內容區 */}
      <div>
        {/* 目前筆數顯示 */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-sm text-gray-500">目前交易筆數：</span>
          <span
            className={`text-3xl font-bold text-emerald-600 transition-transform duration-300 ${
              isAnimating ? "scale-125" : "scale-100"
            }`}
          >
            {currentCount}
          </span>
        </div>

        {/* 圖表區域 */}
        <div className="h-64 w-full">
          {data.length > 1 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  vertical={false}
                />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  interval="preserveStartEnd"
                  minTickGap={50}
                />
                <YAxis
                  domain={[yMin, yMax]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  width={40}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ fill: "#10b981", strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: "#059669", strokeWidth: 2, stroke: "#fff" }}
                  isAnimationActive={true}
                  animationDuration={500}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-gray-400">
              <p className="text-base">等待交易資料中...</p>
              <p className="mt-1 text-sm">資料將在交易發生時顯示</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TxnShow
