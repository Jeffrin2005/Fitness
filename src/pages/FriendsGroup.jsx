import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Simple3DModel from '../components/Simple3DModel'

function FriendsGroup() {
  const { groupId } = useParams()
  const [group, setGroup] = useState(null)
  const [members, setMembers] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [details, setDetails] = useState(null)

  const token = useMemo(() => localStorage.getItem('token'), [])

  const parseJsonResponse = async (response) => {
    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      const text = await response.text()
      return {
        ok: response.ok,
        status: response.status,
        data: null,
        error: `Expected JSON but got ${contentType || 'unknown content-type'} (HTTP ${response.status}). ${text.slice(0, 120)}`
      }
    }
    const data = await response.json()
    return { ok: response.ok, status: response.status, data, error: null }
  }

  const hashString = (s) => {
    let h = 0
    for (let i = 0; i < s.length; i += 1) {
      h = (h * 31 + s.charCodeAt(i)) >>> 0
    }
    return h
  }

  const createRng = (seed) => {
    let x = seed >>> 0
    return () => {
      x ^= x << 13
      x ^= x >>> 17
      x ^= x << 5
      return (x >>> 0) / 4294967296
    }
  }

  const getWeeklySeries = (member) => {
    const seed = hashString(`${member._id}-${member.username}`)
    const rnd = createRng(seed)

    const overall = member?.bodyMetrics?.overall ?? 0
    const base = Math.max(10, Math.min(95, overall))

    const series = []
    for (let i = 0; i < 7; i += 1) {
      const noise = (rnd() - 0.5) * 18
      const trend = (i - 3) * 1.2
      const v = Math.round(Math.max(0, Math.min(100, base + noise + trend)))
      series.push(v)
    }
    return series
  }

  useEffect(() => {
    const fetchGroup = async () => {
      if (!token) return
      setLoading(true)
      setMessage('')

      try {
        const response = await fetch(`/api/groups/${groupId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        const parsed = await parseJsonResponse(response)
        if (!parsed.ok) {
          setMessage(parsed.data?.message || parsed.error || 'Failed to load group')
          return
        }

        setGroup(parsed.data.group)
        setMembers(parsed.data.members || [])
      } finally {
        setLoading(false)
      }
    }

    fetchGroup()
  }, [groupId, token])

  const membersSorted = useMemo(() => {
    return [...members].sort((a, b) => (b?.bodyMetrics?.overall ?? 0) - (a?.bodyMetrics?.overall ?? 0))
  }, [members])

  const avatarModels = ['/models/friend.glb', '/models/gym-model.glb', '/models/human.glb']

  const openDetails = (member, modelPath, rank) => {
    setDetails({ member, modelPath, rank })
    setDetailsOpen(true)
  }

  const closeDetails = () => {
    setDetailsOpen(false)
    setDetails(null)
  }

  const formatPct = (n) => {
    const v = Number.isFinite(n) ? n : 0
    return `${Math.max(0, Math.min(100, Math.round(v)))}%`
  }

  const getBadge = (member) => {
    const overall = member?.bodyMetrics?.overall ?? 0
    if (overall >= 85) return { label: 'Elite', classes: 'bg-emerald-100 text-emerald-800 border-emerald-200' }
    if (overall >= 70) return { label: 'Strong', classes: 'bg-blue-100 text-blue-800 border-blue-200' }
    if (overall >= 55) return { label: 'Rising', classes: 'bg-orange-100 text-orange-800 border-orange-200' }
    return { label: 'Starter', classes: 'bg-gray-100 text-gray-800 border-gray-200' }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{group?.name || 'Group'}</h1>
            <p className="text-gray-600">Access code: <span className="font-semibold">{group?.code || '—'}</span></p>
          </div>
          <Link
            to="/friends"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold"
          >
            Back
          </Link>
        </div>
      </div>

      {message && (
        <div className="bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-xl">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-xl font-bold text-gray-900">Friends</h2>
            <div className="text-xs text-gray-500">{membersSorted.length} members</div>
          </div>

          {loading ? (
            <p className="text-gray-600 text-sm">Loading…</p>
          ) : (
            <div className="space-y-2">
              {membersSorted.map((m, index) => {
                const badge = getBadge(m)
                const modelPath = avatarModels[index % avatarModels.length]
                return (
                  <div key={m._id} className="rounded-2xl border border-gray-200 bg-white px-4 py-3 flex items-center justify-between gap-4 hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center font-black">
                        #{index + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="font-bold text-gray-900 truncate">{m.username}</div>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${badge.classes}`}>{badge.label}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Overall: <span className="font-semibold text-gray-900">{formatPct(m?.bodyMetrics?.overall ?? 0)}</span>
                          <span className="mx-2">•</span>
                          Streak: <span className="font-semibold text-gray-900">{m.currentStreak ?? 0}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => openDetails(m, modelPath, index + 1)}
                      className="px-4 py-2 rounded-xl bg-gray-900 text-white font-bold text-xs hover:bg-gray-800"
                    >
                      View Details
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {detailsOpen && details && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-4xl bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between gap-4">
              <div>
                <div className="text-lg font-bold text-gray-900">#{details.rank} {details.member.username}</div>
                <div className="text-xs text-gray-500">{details.modelPath.replace('/models/', '')}</div>
              </div>
              <button
                type="button"
                onClick={closeDetails}
                className="px-4 py-2 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800"
              >
                Close
              </button>
            </div>
            <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="w-full h-[240px] sm:h-[280px] lg:h-[340px] rounded-3xl overflow-hidden border border-gray-200 bg-white">
                <Simple3DModel
                  modelPath={details.modelPath}
                  workoutData={details.member?.workoutData}
                  showInstructions={false}
                  showLegend={false}
                  transparentBackground
                />
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="text-xs font-semibold text-gray-500">Overall</div>
                  <div className="text-3xl font-black text-gray-900">{formatPct(details.member?.bodyMetrics?.overall ?? 0)}</div>
                  <div className="mt-2 h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: formatPct(details.member?.bodyMetrics?.overall ?? 0) }} />
                  </div>
                  <div className="mt-3 text-xs text-gray-600">
                    Streak: <span className="font-semibold text-gray-900">{details.member?.currentStreak ?? 0}</span>
                    <span className="mx-2">•</span>
                    Last workout: <span className="font-semibold text-gray-900">{details.member?.lastWorkoutAt ? new Date(details.member.lastWorkoutAt).toLocaleDateString() : '—'}</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="text-sm font-bold text-gray-900 mb-3">Muscle breakdown</div>
                  <div className="space-y-3">
                    {[
                      { label: 'Chest', value: details.member?.bodyMetrics?.chest ?? 0, bar: 'from-emerald-500 to-teal-500' },
                      { label: 'Arms', value: details.member?.bodyMetrics?.arms ?? 0, bar: 'from-red-500 to-orange-500' },
                      { label: 'Legs', value: details.member?.bodyMetrics?.legs ?? 0, bar: 'from-blue-600 to-cyan-500' },
                      { label: 'Core', value: details.member?.bodyMetrics?.core ?? 0, bar: 'from-violet-600 to-fuchsia-500' }
                    ].map((row) => (
                      <div key={row.label}>
                        <div className="flex items-center justify-between text-xs">
                          <div className="font-semibold text-gray-600">{row.label}</div>
                          <div className="font-bold text-gray-900">{formatPct(row.value)}</div>
                        </div>
                        <div className="mt-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div className={`h-2 rounded-full bg-gradient-to-r ${row.bar}`} style={{ width: formatPct(row.value) }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="text-sm font-bold text-gray-900 mb-3">Workout totals</div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                      <div className="text-xs text-gray-500">Pushups</div>
                      <div className="text-xl font-black text-gray-900">{details.member?.workoutData?.pushups?.count ?? 0}</div>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                      <div className="text-xs text-gray-500">Sessions</div>
                      <div className="text-xl font-black text-gray-900">
                        {(details.member?.workoutData?.pushups?.frequency ?? 0) + (details.member?.workoutData?.armExercises?.frequency ?? 0) + (details.member?.workoutData?.chestExercises?.frequency ?? 0) + (details.member?.workoutData?.legExercises?.frequency ?? 0) + (details.member?.workoutData?.coreExercises?.frequency ?? 0)}
                      </div>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                      <div className="text-xs text-gray-500">Chest</div>
                      <div className="text-xl font-black text-gray-900">{details.member?.workoutData?.chestExercises?.count ?? 0}</div>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                      <div className="text-xs text-gray-500">Arms</div>
                      <div className="text-xl font-black text-gray-900">{details.member?.workoutData?.armExercises?.count ?? 0}</div>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                      <div className="text-xs text-gray-500">Legs</div>
                      <div className="text-xl font-black text-gray-900">{details.member?.workoutData?.legExercises?.count ?? 0}</div>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                      <div className="text-xs text-gray-500">Core</div>
                      <div className="text-xl font-black text-gray-900">{details.member?.workoutData?.coreExercises?.count ?? 0}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FriendsGroup
