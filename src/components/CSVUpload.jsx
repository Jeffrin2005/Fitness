import { useState } from 'react'

function CSVUpload({ onUploadSuccess, buttonText = "Upload CSV Data" }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file')
      return
    }

    setUploading(true)
    setError('')
    setSuccess('')

    const formData = new FormData()
    formData.append('csvFile', file)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/upload/csv', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        setSuccess('Data uploaded successfully!')
        onUploadSuccess && onUploadSuccess(result.data)
        // Reset file input
        event.target.value = ''
      } else {
        const error = await response.json()
        setError(error.message || 'Upload failed')
      }
    } catch (error) {
      setError('Connection error. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="relative">
      <label className="block">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
        />
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          {uploading ? 'Uploading...' : buttonText}
        </div>
      </label>
      
      {error && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-600">
          {success}
        </div>
      )}
    </div>
  )
}

export default CSVUpload
