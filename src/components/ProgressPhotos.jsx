import { useState, useEffect } from 'react'

function ProgressPhotos({ userData, onUserDataUpdate }) {
  const [photos, setPhotos] = useState([])
  const [uploading, setUploading] = useState(false)
  const [selectedPhotos, setSelectedPhotos] = useState([])
  const [comparisonMode, setComparisonMode] = useState(false)

  useEffect(() => {
    if (userData?.progressPhotos) {
      setPhotos(userData.progressPhotos.sort((a, b) => new Date(b.date) - new Date(a.date)))
    }
  }, [userData])

  const handlePhotoUpload = async (event) => {
    const files = Array.from(event.target.files)
    if (files.length === 0) return

    setUploading(true)
    const formData = new FormData()
    files.forEach(file => {
      formData.append('photos', file)
    })

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/upload/photos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        setPhotos(prev => [...result.photos, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date)))
        onUserDataUpdate && onUserDataUpdate(result.user)
      } else {
        const error = await response.json()
        alert(error.message || 'Upload failed')
      }
    } catch (error) {
      alert('Connection error. Please try again.')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  const handleDeletePhoto = async (photoId) => {
    if (!confirm('Are you sure you want to delete this photo?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/upload/photos/${photoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const result = await response.json()
        setPhotos(prev => prev.filter(p => p.id !== photoId))
        onUserDataUpdate && onUserDataUpdate(result.user)
      } else {
        alert('Failed to delete photo')
      }
    } catch (error) {
      alert('Connection error. Please try again.')
    }
  }

  const togglePhotoSelection = (photoId) => {
    setSelectedPhotos(prev => {
      if (prev.includes(photoId)) {
        return prev.filter(id => id !== photoId)
      } else if (prev.length < 2) {
        return [...prev, photoId]
      } else {
        return [prev[1], photoId]
      }
    })
  }

  const selectedPhotosData = photos.filter(p => selectedPhotos.includes(p.id))

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Progress Photos</h2>
        <p className="text-gray-600 mb-4">Track your fitness journey with visual progress photos</p>
        
        <label className="block">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            disabled={uploading}
            className="hidden"
          />
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
          </div>
        </label>
      </div>

      {/* Comparison Toggle */}
      {photos.length >= 2 && (
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Compare Photos</span>
            <button
              onClick={() => setComparisonMode(!comparisonMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                comparisonMode ? 'bg-orange-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  comparisonMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      )}

      {/* Photos Grid */}
      {photos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all ${
                selectedPhotos.includes(photo.id)
                  ? 'border-orange-500 ring-2 ring-orange-200'
                  : 'border-gray-200'
              } ${comparisonMode ? 'cursor-pointer hover:shadow-xl' : ''}`}
              onClick={() => comparisonMode && togglePhotoSelection(photo.id)}
            >
              <div className="relative aspect-square">
                <img
                  src={photo.url}
                  alt={`Progress photo from ${new Date(photo.date).toLocaleDateString()}`}
                  className="w-full h-full object-cover"
                />
                {comparisonMode && (
                  <div className="absolute top-2 right-2">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPhotos.includes(photo.id)
                        ? 'bg-orange-500 border-orange-500'
                        : 'bg-white border-gray-300'
                    }`}>
                      {selectedPhotos.includes(photo.id) && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeletePhoto(photo.id)
                  }}
                  className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-gray-900">
                  {new Date(photo.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(photo.date).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-200 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-2 text-sm text-gray-600">No progress photos yet</p>
          <p className="text-xs text-gray-500">Upload your first photo to start tracking your journey</p>
        </div>
      )}

      {/* Comparison View */}
      {comparisonMode && selectedPhotosData.length === 2 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Photo Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedPhotosData.map((photo, index) => (
              <div key={photo.id}>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={photo.url}
                    alt={`Comparison photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900 text-center">
                  {new Date(photo.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgressPhotos
