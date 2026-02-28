import { motion } from 'framer-motion'
import Interactive3DHuman from '../components/Interactive3DHuman'
import WorkoutSidebar from '../components/WorkoutSidebar'

function ThreeDBody({ userData }) {
    const handleWorkoutUpdate = (result) => {
        // Keep it integrated with the sidebar
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 space-y-6 w-full">
                {/* Main 3D Interactive Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full h-[calc(100vh-160px)] min-h-[600px] border border-slate-200 rounded-[3rem] bg-white shadow-2xl overflow-hidden"
                >
                    <Interactive3DHuman />
                </motion.div>
            </div>

            {/* Stats Panel / Sidebar Integration */}
            <div className="lg:w-96 flex flex-col gap-8 shrink-0">
                <WorkoutSidebar userData={userData} onWorkoutUpdate={handleWorkoutUpdate} />
            </div>
        </div>
    )
}

export default ThreeDBody
