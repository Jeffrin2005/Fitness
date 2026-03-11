import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Friends() {
  const [groups, setGroups] = useState([])

  const [createName, setCreateName] = useState('')
  const [joinCode, setJoinCode] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

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

  const fetchMyGroups = async () => {
    if (!token) return
    const response = await fetch('/api/groups/my', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const parsed = await parseJsonResponse(response)
    if (!parsed.ok) {
      setMessage(parsed.data?.message || parsed.error || 'Failed to load groups')
      return
    }
    setGroups(parsed.data?.groups || [])
  }

  const openGroup = (id) => {
    navigate(`/friends/${id}`)
  }

  useEffect(() => {
    fetchMyGroups()

    const params = new URLSearchParams(window.location.search)
    const codeFromUrl = params.get('code')
    if (codeFromUrl) {
      setJoinCode(String(codeFromUrl).toUpperCase())
    }
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/groups/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: createName })
      })

      const parsed = await parseJsonResponse(response)
      if (!parsed.ok) {
        setMessage(parsed.data?.message || parsed.error || 'Failed to create group')
        return
      }

      setMessage(`Group created. Access code: ${parsed.data.group.code}`)
      setCreateName('')
      await fetchMyGroups()
      openGroup(parsed.data.group._id)
    } finally {
      setLoading(false)
    }
  }

  const handleJoin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/groups/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ code: joinCode })
      })

      const parsed = await parseJsonResponse(response)
      if (!parsed.ok) {
        setMessage(parsed.data?.message || parsed.error || 'Failed to join group')
        return
      }

      setMessage(`Joined group: ${parsed.data.group.name}`)
      await fetchMyGroups()
      setJoinCode('')
      openGroup(parsed.data.group._id)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Friends & Groups</h1>
        <p className="text-gray-600">Create a group, share the access code, and track your friends’ progress.</p>
      </div>

      {message && (
        <div className="bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-xl">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Create Group</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <input
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50"
              placeholder="Group name (e.g. Gym Buddies)"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition shadow-lg disabled:opacity-50"
            >
              Create
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Join with Access Code</h2>
          <form onSubmit={handleJoin} className="space-y-4">
            <input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50"
              placeholder="Enter code (e.g. 8K2PZQ)"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition shadow-lg disabled:opacity-50"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 lg:col-span-1">
          <h2 className="text-xl font-bold text-gray-900 mb-4">My Groups</h2>
          {groups.length === 0 ? (
            <p className="text-gray-600 text-sm">No groups yet. Create one or join with a code.</p>
          ) : (
            <div className="space-y-2">
              {groups.map((g) => (
                <button
                  key={g._id}
                  onClick={() => openGroup(g._id)}
                  className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{g.name}</div>
                      <div className="text-xs text-gray-500">Code: {g.code}</div>
                    </div>
                    <div className="text-xs text-gray-500">{(g.memberIds || []).length} members</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Friends
