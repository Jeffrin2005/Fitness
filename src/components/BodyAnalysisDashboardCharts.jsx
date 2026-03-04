import { useEffect, useMemo, useState } from 'react'
import { Activity, Dumbbell, HeartPulse, Scale } from 'lucide-react'

function clampNumber(value, min, max) {
  if (Number.isNaN(value)) return min
  return Math.min(max, Math.max(min, value))
}

function formatShortDate(ts) {
  try {
    const d = new Date(ts)
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  } catch {
    return ''
  }
}

function Card({ title, subtitle, icon: Icon, children }) {
  return (
    <div className="bg-gradient-to-br from-white via-white to-gray-50/80 backdrop-blur-xl rounded-2xl shadow-md border border-gray-200/70 p-6">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{title}</h3>
          {subtitle ? <p className="text-sm text-gray-500 mt-1">{subtitle}</p> : null}
        </div>
        {Icon ? (
          <div className="shrink-0 w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shadow-sm">
            <Icon className="w-5 h-5" />
          </div>
        ) : null}
      </div>
      {children}
    </div>
  )
}

function Sparkline({ data, stroke = '#6366f1', height = 88 }) {
  const width = 520
  const padding = 8

  const points = useMemo(() => {
    const values = (data || []).map((d) => (typeof d?.value === 'number' ? d.value : 0))
    if (values.length === 0) return []

    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = max - min || 1

    return values.map((v, i) => {
      const x = padding + (i * (width - padding * 2)) / Math.max(1, values.length - 1)
      const y = padding + (1 - (v - min) / range) * (height - padding * 2)
      return { x, y }
    })
  }, [data, height])

  const polyline = points.length > 0 ? points.map((p) => `${p.x},${p.y}`).join(' ') : ''

  const last = data?.[data.length - 1]
  const lastValue = typeof last?.value === 'number' ? last.value : null

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <div className="text-2xl font-extrabold text-gray-900">
          {lastValue !== null ? lastValue : '—'}
        </div>
        <div className="text-xs text-gray-500">
          {last?.ts ? `Updated ${formatShortDate(last.ts)}` : ''}
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
        <svg viewBox={`0 0 ${width} ${height}`} className="block w-full h-[88px]">
          <defs>
            <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity="0.25" />
              <stop offset="100%" stopColor={stroke} stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d={
              points.length > 0
                ? `M ${points[0].x} ${height - 8} L ${polyline.replace(/ /g, ' L ')} L ${points[points.length - 1].x} ${height - 8} Z`
                : ''
            }
            fill="url(#sparkFill)"
          />
          <polyline
            points={polyline}
            fill="none"
            stroke={stroke}
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="mt-3 flex justify-between text-[11px] text-gray-500">
        <span>{data?.[0]?.ts ? formatShortDate(data[0].ts) : ''}</span>
        <span>{data?.[data.length - 1]?.ts ? formatShortDate(data[data.length - 1].ts) : ''}</span>
      </div>
    </div>
  )
}

function HorizontalBars({ items, maxValue }) {
  return (
    <div className="space-y-3">
      {items.map((it) => {
        const v = typeof it.value === 'number' ? it.value : 0
        const pct = maxValue > 0 ? clampNumber((v / maxValue) * 100, 0, 100) : 0
        return (
          <div key={it.key}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-semibold text-gray-700">{it.label}</span>
              <span className="text-sm font-bold text-gray-900">{v}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function readHistory() {
  try {
    const raw = localStorage.getItem('bodyAnalysisHistory')
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeHistory(next) {
  try {
    localStorage.setItem('bodyAnalysisHistory', JSON.stringify(next))
  } catch {
    // ignore
  }
}

function sameDay(aTs, bTs) {
  const a = new Date(aTs)
  const b = new Date(bTs)
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function buildPoint(ts, value) {
  return { ts, value: typeof value === 'number' ? value : 0 }
}

function BodyAnalysisDashboardCharts({ healthMetrics, bodyMetrics, activityMetrics }) {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const now = Date.now()

    const point = {
      ts: now,
      weight: typeof healthMetrics?.weight === 'number' ? healthMetrics.weight : Number(healthMetrics?.weight || 0),
      bmi: typeof healthMetrics?.bmi === 'number' ? healthMetrics.bmi : Number(healthMetrics?.bmi || 0),
      bodyFat: typeof healthMetrics?.bodyFat === 'number' ? healthMetrics.bodyFat : Number(healthMetrics?.bodyFat || 0),
      heartRate: typeof healthMetrics?.heartRate === 'number' ? healthMetrics.heartRate : Number(healthMetrics?.heartRate || 0),
      steps: typeof activityMetrics?.steps === 'number' ? activityMetrics.steps : Number(activityMetrics?.steps || 0),
      caloriesBurned: typeof activityMetrics?.caloriesBurned === 'number' ? activityMetrics.caloriesBurned : Number(activityMetrics?.caloriesBurned || 0),
      runningKm: typeof activityMetrics?.runningKm === 'number' ? activityMetrics.runningKm : Number(activityMetrics?.runningKm || 0),
      overallFitness: typeof bodyMetrics?.overall === 'number' ? bodyMetrics.overall : Number(bodyMetrics?.overall || 0)
    }

    const hasMeaningful =
      point.weight > 0 ||
      point.bmi > 0 ||
      point.bodyFat > 0 ||
      point.heartRate > 0 ||
      point.steps > 0 ||
      point.caloriesBurned > 0 ||
      point.runningKm > 0 ||
      point.overallFitness > 0

    const existing = readHistory()

    if (!hasMeaningful) {
      setHistory(existing)
      return
    }

    const next = [...existing]
    const last = next[next.length - 1]

    if (last?.ts && sameDay(last.ts, now)) {
      next[next.length - 1] = { ...last, ...point, ts: last.ts }
    } else {
      next.push(point)
    }

    const trimmed = next.slice(-30)
    writeHistory(trimmed)
    setHistory(trimmed)
  }, [healthMetrics, bodyMetrics, activityMetrics])

  const weightSeries = useMemo(() => history.filter(h => (h.weight || 0) > 0).map(h => buildPoint(h.ts, h.weight)), [history])
  const stepsSeries = useMemo(() => history.filter(h => (h.steps || 0) > 0).map(h => buildPoint(h.ts, h.steps)), [history])

  const bars = useMemo(() => {
    return [
      { key: 'arms', label: 'Arms', value: Number(bodyMetrics?.arms || 0) },
      { key: 'chest', label: 'Chest', value: Number(bodyMetrics?.chest || 0) },
      { key: 'core', label: 'Core', value: Number(bodyMetrics?.core || 0) },
      { key: 'legs', label: 'Legs', value: Number(bodyMetrics?.legs || 0) }
    ]
  }, [bodyMetrics])

  const maxBar = useMemo(() => {
    const values = bars.map(b => b.value)
    const max = values.length ? Math.max(...values) : 0
    return max || 1
  }, [bars])

  const hasAny =
    (healthMetrics?.weight || 0) > 0 ||
    (healthMetrics?.bmi || 0) > 0 ||
    (healthMetrics?.heartRate || 0) > 0 ||
    (activityMetrics?.steps || 0) > 0 ||
    (activityMetrics?.caloriesBurned || 0) > 0 ||
    (bodyMetrics?.overall || 0) > 0

  if (!hasAny) {
    return null
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <Card
        title="Weight Trend"
        subtitle="Last 30 check-ins"
        icon={Scale}
      >
        {weightSeries.length >= 2 ? (
          <Sparkline data={weightSeries} stroke="#0ea5e9" />
        ) : (
          <div className="text-sm text-gray-600">Add more check-ins to see a trend.</div>
        )}
      </Card>

      <Card
        title="Daily Steps Trend"
        subtitle="Last 30 check-ins"
        icon={Activity}
      >
        {stepsSeries.length >= 2 ? (
          <Sparkline data={stepsSeries} stroke="#22c55e" />
        ) : (
          <div className="text-sm text-gray-600">Upload or log steps to visualize progress.</div>
        )}
      </Card>

      <Card
        title="Muscle Group Activity"
        subtitle="From your workout upload"
        icon={Dumbbell}
      >
        <HorizontalBars items={bars} maxValue={maxBar} />
      </Card>
    </div>
  )
}

export default BodyAnalysisDashboardCharts
