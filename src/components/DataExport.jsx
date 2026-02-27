import { useState } from 'react'

function DataExport({ userData }) {
  const [loading, setLoading] = useState(false)

  const exportToCSV = () => {
    if (!userData) return

    const csvContent = [
      'username,steps,stepsGoal,runningKm,runningGoal,caloriesBurned,chest,arms,core,legs,overall,bloodSugar,bloodPressureSystolic,bloodPressureDiastolic,heartRate,weight,bmi,bodyFat',
      `${userData.username || 'N/A'},${userData.activity?.steps || 0},${userData.activity?.stepsGoal || 10000},${userData.activity?.runningKm || 0},${userData.activity?.runningGoal || 5},${userData.activity?.caloriesBurned || 0},${userData.bodyMetrics?.chest || 0},${userData.bodyMetrics?.arms || 0},${userData.bodyMetrics?.core || 0},${userData.bodyMetrics?.legs || 0},${userData.bodyMetrics?.overall || 0},${userData.healthMetrics?.bloodSugar || 0},${userData.healthMetrics?.bloodPressure?.systolic || 0},${userData.healthMetrics?.bloodPressure?.diastolic || 0},${userData.healthMetrics?.heartRate || 0},${userData.healthMetrics?.weight || 0},${userData.healthMetrics?.bmi || 0},${userData.healthMetrics?.bodyFat || 0}`
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `fitness_data_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const exportToPDF = async () => {
    if (!userData) return

    setLoading(true)
    try {
      // Dynamic import for jsPDF
      const { default: jsPDF } = await import('jspdf')
      const doc = new jsPDF()

      // Add title
      doc.setFontSize(20)
      doc.text('Fitness Report', 20, 20)

      // Add date
      doc.setFontSize(12)
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 35)

      // Add username
      doc.text(`User: ${userData.username || 'N/A'}`, 20, 45)

      // Activity Data
      doc.setFontSize(16)
      doc.text('Activity Metrics', 20, 60)
      doc.setFontSize(12)
      doc.text(`Steps: ${userData.activity?.steps || 0} / ${userData.activity?.stepsGoal || 10000}`, 20, 70)
      doc.text(`Running: ${userData.activity?.runningKm || 0}km / ${userData.activity?.runningGoal || 5}km`, 20, 80)
      doc.text(`Calories Burned: ${userData.activity?.caloriesBurned || 0}`, 20, 90)

      // Body Metrics
      doc.setFontSize(16)
      doc.text('Body Metrics', 20, 110)
      doc.setFontSize(12)
      doc.text(`Chest: ${userData.bodyMetrics?.chest || 0}cm`, 20, 120)
      doc.text(`Arms: ${userData.bodyMetrics?.arms || 0}cm`, 20, 130)
      doc.text(`Core: ${userData.bodyMetrics?.core || 0}cm`, 20, 140)
      doc.text(`Legs: ${userData.bodyMetrics?.legs || 0}cm`, 20, 150)
      doc.text(`Overall: ${userData.bodyMetrics?.overall || 0}cm`, 20, 160)

      // Health Metrics
      doc.setFontSize(16)
      doc.text('Health Metrics', 20, 180)
      doc.setFontSize(12)
      doc.text(`Blood Sugar: ${userData.healthMetrics?.bloodSugar || 0} mg/dL`, 20, 190)
      doc.text(`Blood Pressure: ${userData.healthMetrics?.bloodPressure?.systolic || 0}/${userData.healthMetrics?.bloodPressure?.diastolic || 0} mmHg`, 20, 200)
      doc.text(`Heart Rate: ${userData.healthMetrics?.heartRate || 0} bpm`, 20, 210)
      doc.text(`Weight: ${userData.healthMetrics?.weight || 0} kg`, 20, 220)
      doc.text(`BMI: ${userData.healthMetrics?.bmi || 0}`, 20, 230)
      doc.text(`Body Fat: ${userData.healthMetrics?.bodyFat || 0}%`, 20, 240)

      // Save the PDF
      doc.save(`fitness_report_${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={exportToCSV}
        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export CSV
      </button>
      
      <button
        onClick={exportToPDF}
        disabled={loading}
        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        {loading ? 'Generating...' : 'Export PDF'}
      </button>
    </div>
  )
}

export default DataExport
