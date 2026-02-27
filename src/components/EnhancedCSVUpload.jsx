import { useState } from 'react'

function EnhancedCSVUpload({ onUploadSuccess, buttonText = "Upload CSV Data" }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = async (file) => {
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

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      handleFileUpload(file)
      event.target.value = ''
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const downloadTemplate = () => {
    const csvContent = `username,steps,stepsGoal,runningKm,runningGoal,caloriesBurned,chest,arms,core,legs,overall,bloodSugar,bloodPressureSystolic,bloodPressureDiastolic,heartRate,weight,bmi,bodyFat
jevin,8547,10000,3.2,5,450,75,70,65,80,72,95,120,80,72,70,22,20`
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'fitness_template.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      {/* Template Download */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Need a template?</span>
        <button
          onClick={downloadTemplate}
          className="text-orange-600 hover:text-orange-700 font-medium underline"
        >
          Download CSV template
        </button>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
          dragActive
            ? 'border-orange-400 bg-orange-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <div className="mt-4">
            <label className="cursor-pointer">
              <span className="text-orange-600 hover:text-orange-700 font-medium">
                {uploading ? 'Uploading...' : buttonText}
              </span>
              <span className="text-gray-600"> or drag and drop</span>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">CSV files only (MAX. 10MB)</p>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
          {success}
        </div>
      )}
    </div>
  )
}

export default EnhancedCSVUpload
