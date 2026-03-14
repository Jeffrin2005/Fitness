import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Simple3DModel from '../components/Simple3DModel'

function FriendsGroup() {
  const { groupId } = useParams()
  const [group, setGroup] = useState(null)
  const [members, setMembers] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [details, setDetails] = useState(null)
  const [showTopRankPopup, setShowTopRankPopup] = useState(false)
  const [hasShownPopup, setHasShownPopup] = useState(false)

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

  const generateActivityMap = (member, weeksCount = 14) => {
    if (!member) return []
    const seed = hashString(`${member._id}-${member.username}-activity`)
    const rnd = createRng(seed)
    const overall = member?.bodyMetrics?.overall ?? 0
    const probability = Math.max(0.15, Math.min(0.85, overall / 100))

    const weeks = []
    for (let w = 0; w < weeksCount; w++) {
      const week = []
      for (let d = 0; d < 7; d++) {
        // Calculate days ago to end exactly on today
        const daysAgo = (weeksCount - 1 - w) * 7 + (6 - d)
        const date = new Date()
        date.setDate(date.getDate() - daysAgo)
        const dateStr = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })

        let level = 0
        if (rnd() < probability) {
          level = Math.floor(rnd() * 4) + 1
        }
        week.push({ level, dateStr })
      }
      weeks.push(week)
    }
    return weeks
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

  useEffect(() => {
    if (!loading && membersSorted.length > 0 && !hasShownPopup) {
      setShowTopRankPopup(true)
      setHasShownPopup(true)
      const timer = setTimeout(() => {
        setShowTopRankPopup(false)
      }, 4500)
      return () => clearTimeout(timer)
    }
  }, [loading, membersSorted, hasShownPopup])

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

  const renderPodium = () => {
    if (loading || membersSorted.length === 0) return null

    const topMembers = membersSorted.slice(0, 3)
    let podiumOrder = []
    if (topMembers.length >= 3) {
      podiumOrder = [
        { member: topMembers[1], rank: 2 },
        { member: topMembers[0], rank: 1 },
        { member: topMembers[2], rank: 3 }
      ]
    } else if (topMembers.length === 2) {
      podiumOrder = [
        { member: topMembers[1], rank: 2 },
        { member: topMembers[0], rank: 1 }
      ]
    } else {
      podiumOrder = [
        { member: topMembers[0], rank: 1 }
      ]
    }

    return (
      <div className="relative rounded-3xl overflow-hidden bg-gray-50 pt-16 pb-0 px-4 sm:px-8 shadow-md border border-gray-200 z-10 mt-2">
        
        <div className="flex items-end justify-center gap-3 sm:gap-6 h-[320px] relative z-10 w-full max-w-3xl mx-auto">
          {podiumOrder.map((item) => {
            const { member, rank } = item

            let heightClass = "h-[200px]"
            let colorClass = "bg-gradient-to-b from-[#fcd34d] to-[#fbbf24] border-t-[8px] border-[#fde68a] shadow-[0_0_40px_rgba(250,204,21,0.5)]"
            let textColors = { name: "text-orange-500", score: "text-orange-600", number: "text-yellow-700" }
            let delay = 0.2

            if (rank === 2) {
              heightClass = "h-[140px]"
              colorClass = "bg-gradient-to-b from-[#e2e8f0] to-[#cbd5e1] border-t-[8px] border-[#f1f5f9] shadow-lg"
              textColors = { name: "text-slate-400", score: "text-[#1e293b]", number: "text-slate-500" }
              delay = 0.4
            } else if (rank === 3) {
              heightClass = "h-[110px]"
              colorClass = "bg-gradient-to-b from-[#fdba74] to-[#fb923c] border-t-[8px] border-[#fed7aa] shadow-lg"
              textColors = { name: "text-[#9a3412]", score: "text-[#7c2d12]", number: "text-orange-800" }
              delay = 0.6
            }

            return (
              <motion.div
                key={member._id}
                className="flex flex-col items-center w-28 sm:w-36 relative"
                initial={{ y: 200, opacity: 0 }}
                animate={(!hasShownPopup || showTopRankPopup) ? { y: 200, opacity: 0 } : { y: 0, opacity: 1 }}
                transition={{ delay, type: "spring", stiffness: 100, damping: 15 }}
              >
                {rank === 1 && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", bounce: 0.6 }}
                    className="absolute -top-[70px] text-5xl filter drop-shadow-md z-20"
                  >
                    👑
                  </motion.div>
                )}
                
                <div className={`font-black text-[15px] sm:text-lg mb-0.5 ${textColors.name} truncate w-full text-center z-10 drop-shadow-sm`}>
                  {member.username}
                </div>
                <div className={`font-black text-2xl sm:text-3xl mb-3 ${textColors.score} z-10 drop-shadow-sm`}>
                  {formatPct(member?.bodyMetrics?.overall ?? 0)}
                </div>
                
                <div className={`w-full rounded-t-3xl flex flex-col justify-start pt-6 items-center ${heightClass} ${colorClass} relative`}>
                  <div className="absolute inset-0 bg-white/5 rounded-t-3xl pointer-events-none" />
                  <span className={`text-4xl sm:text-5xl font-black ${textColors.number} opacity-80 z-10`}>
                    {rank}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {showTopRankPopup && membersSorted[0] && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-1.5 rounded-[2rem] shadow-[0_0_80px_rgba(249,115,22,0.6)] relative cursor-pointer"
              initial={{ scale: 0, y: 150, rotate: -15 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0, y: 100, rotate: 15 }}
              transition={{ type: "spring", damping: 14, stiffness: 200 }}
              onClick={() => setShowTopRankPopup(false)}
            >
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 text-[5rem] filter drop-shadow-xl z-20 origin-bottom"
              >
                <div className="animate-bounce">👑</div>
              </motion.div>

              <div className="bg-white rounded-[1.7rem] px-12 py-10 flex flex-col items-center text-center min-w-[320px] max-w-[90vw] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100/50 via-white to-white pointer-events-none" />

                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
                  className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center font-black text-5xl shadow-[0_10px_30px_rgba(239,68,68,0.5)] border-4 border-white mb-6 z-10 relative"
                >
                  #1
                </motion.div>

                <div className="z-10 relative space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm font-black text-orange-500 uppercase tracking-widest"
                  >
                    Group Leader
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-4xl sm:text-5xl font-black text-gray-900 break-all"
                  >
                    {membersSorted[0].username}
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, type: "spring" }}
                    className="flex justify-center mt-6"
                  >
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 px-6 py-3 rounded-2xl font-bold border border-orange-200 flex items-center gap-3 shadow-inner">
                      <span className="text-xl">🔥</span>
                      <span>Score: <span className="text-2xl font-black text-orange-600">{formatPct(membersSorted[0]?.bodyMetrics?.overall ?? 0)}</span></span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
        {renderPodium()}
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
          <div className="w-full max-w-4xl bg-white rounded-3xl border border-gray-200 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between gap-4 shrink-0">
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
            <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-5 overflow-y-auto">
              <div className="space-y-4 shrink-0 lg:sticky lg:top-0 h-fit">
                <div className="w-full h-[240px] sm:h-[280px] lg:h-[340px] rounded-3xl overflow-hidden border border-gray-200 bg-white">
                  <Simple3DModel
                    modelPath={details.modelPath}
                    workoutData={details.member?.workoutData}
                    showInstructions={false}
                    showLegend={false}
                    transparentBackground
                  />
                </div>

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
              </div>

              <div className="space-y-4 pb-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-green-500">⚡</span> Activity Streak
                  </div>
                  <div className="flex gap-[3px] overflow-x-auto pb-2 scrollbar-hide">
                    {generateActivityMap(details.member).map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-[3px] shrink-0">
                        {week.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className={`w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-[2px] cursor-pointer hover:ring-1 ring-gray-400 ${item.level === 0 ? 'bg-gray-100' :
                                item.level === 1 ? 'bg-green-200' :
                                  item.level === 2 ? 'bg-green-400' :
                                    item.level === 3 ? 'bg-green-600' :
                                      'bg-green-800'
                              }`}
                            title={`${item.dateStr}: Activity level ${item.level}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <div>14 Weeks</div>
                    <div className="flex items-center gap-1">
                      <span>Less</span>
                      <div className="flex gap-[3px]">
                        <div className="w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-[2px] bg-gray-100" />
                        <div className="w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-[2px] bg-green-200" />
                        <div className="w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-[2px] bg-green-400" />
                        <div className="w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-[2px] bg-green-600" />
                        <div className="w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-[2px] bg-green-800" />
                      </div>
                      <span>More</span>
                    </div>
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
