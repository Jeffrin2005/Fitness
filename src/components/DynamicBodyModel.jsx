import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function DynamicBodyModel({ workoutData = {} }) {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const animationIdRef = useRef(null)
  const modelRef = useRef(null)
  const mountedRef = useRef(false)
  const [isLoading, setIsLoading] = useState(true)

  // Default workout data if none provided
  const defaultWorkoutData = {
    pushups: { count: 0, frequency: 0 },
    armExercises: { count: 0, frequency: 0 },
    chestExercises: { count: 0, frequency: 0 },
    legExercises: { count: 0, frequency: 0 },
    coreExercises: { count: 0, frequency: 0 }
  }

  const data = { ...defaultWorkoutData, ...workoutData }

  // Calculate muscle growth factors based on workout data
  const calculateMuscleGrowth = () => {
    const growthFactors = {
      arms: 1.0,
      chest: 1.0,
      legs: 1.0,
      core: 1.0
    }

    // Arms growth (biceps, triceps)
    const armScore = (data.pushups.count * 0.3) + (data.armExercises.count * 0.7)
    growthFactors.arms = 1.0 + (armScore * 0.002) // Max growth: ~2x at high volume

    // Chest growth
    const chestScore = (data.pushups.count * 0.4) + (data.chestExercises.count * 0.6)
    growthFactors.chest = 1.0 + (chestScore * 0.0025)

    // Legs growth
    const legScore = data.legExercises.count * 0.8
    growthFactors.legs = 1.0 + (legScore * 0.003)

    // Core growth
    const coreScore = data.coreExercises.count * 0.6
    growthFactors.core = 1.0 + (coreScore * 0.002)

    // Clamp growth factors to reasonable limits
    Object.keys(growthFactors).forEach(key => {
      growthFactors[key] = Math.min(Math.max(growthFactors[key], 0.8), 2.0)
    })

    return growthFactors
  }

  const growthFactors = calculateMuscleGrowth()

  useEffect(() => {
    if (!containerRef.current || mountedRef.current) return
    mountedRef.current = true

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 1, 3.5)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.9)
    directionalLight1.position.set(5, 5, 5)
    scene.add(directionalLight1)

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight2.position.set(-5, -5, -5)
    scene.add(directionalLight2)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 2
    controls.maxDistance = 8
    controls.autoRotate = true
    controls.autoRotateSpeed = 1
    controls.enablePan = false

    // Create a simple human body using geometries
    const createBodyModel = () => {
      const bodyGroup = new THREE.Group()

      // Materials with different colors for muscle groups
      const armMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff6b6b,
        emissive: 0xff6b6b,
        emissiveIntensity: 0.1
      })
      const chestMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x4ecdc4,
        emissive: 0x4ecdc4,
        emissiveIntensity: 0.1
      })
      const legMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x45b7d1,
        emissive: 0x45b7d1,
        emissiveIntensity: 0.1
      })
      const coreMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xf9ca24,
        emissive: 0xf9ca24,
        emissiveIntensity: 0.1
      })

      // Head
      const headGeometry = new THREE.SphereGeometry(0.2, 32, 32)
      const head = new THREE.Mesh(headGeometry, new THREE.MeshPhongMaterial({ color: 0xfdbcb4 }))
      head.position.y = 1.6
      bodyGroup.add(head)

      // Chest/Torso
      const chestGeometry = new THREE.BoxGeometry(0.8 * growthFactors.chest, 1.0 * growthFactors.chest, 0.3 * growthFactors.chest)
      const chest = new THREE.Mesh(chestGeometry, chestMaterial)
      chest.position.y = 0.8
      bodyGroup.add(chest)

      // Arms
      // Left arm
      const leftArmGeometry = new THREE.CylinderGeometry(0.12 * growthFactors.arms, 0.08 * growthFactors.arms, 0.8, 32)
      const leftArm = new THREE.Mesh(leftArmGeometry, armMaterial)
      leftArm.position.set(-0.5 * growthFactors.chest, 0.8, 0)
      leftArm.rotation.z = Math.PI / 6
      bodyGroup.add(leftArm)

      // Right arm
      const rightArmGeometry = new THREE.CylinderGeometry(0.12 * growthFactors.arms, 0.08 * growthFactors.arms, 0.8, 32)
      const rightArm = new THREE.Mesh(rightArmGeometry, armMaterial)
      rightArm.position.set(0.5 * growthFactors.chest, 0.8, 0)
      rightArm.rotation.z = -Math.PI / 6
      bodyGroup.add(rightArm)

      // Core/Abdomen
      const coreGeometry = new THREE.BoxGeometry(0.6 * growthFactors.core, 0.6 * growthFactors.core, 0.25 * growthFactors.core)
      const core = new THREE.Mesh(coreGeometry, coreMaterial)
      core.position.y = 0.2
      bodyGroup.add(core)

      // Legs
      // Left leg
      const leftLegGeometry = new THREE.CylinderGeometry(0.15 * growthFactors.legs, 0.1 * growthFactors.legs, 1.0, 32)
      const leftLeg = new THREE.Mesh(leftLegGeometry, legMaterial)
      leftLeg.position.set(-0.2, -0.5, 0)
      bodyGroup.add(leftLeg)

      // Right leg
      const rightLegGeometry = new THREE.CylinderGeometry(0.15 * growthFactors.legs, 0.1 * growthFactors.legs, 1.0, 32)
      const rightLeg = new THREE.Mesh(rightLegGeometry, legMaterial)
      rightLeg.position.set(0.2, -0.5, 0)
      bodyGroup.add(rightLeg)

      return bodyGroup
    }

    const model = createBodyModel()
    modelRef.current = model
    scene.add(model)
    setIsLoading(false)

    // Animation loop
    function animate() {
      animationIdRef.current = requestAnimationFrame(animate)
      controls.update()
      
      // Add subtle pulsing effect to show muscle activity
      if (modelRef.current) {
        const time = Date.now() * 0.001
        modelRef.current.children.forEach((child, index) => {
          if (child.geometry && child.material && index > 0) { // Skip head
            const pulse = Math.sin(time * 2 + index) * 0.01
            child.scale.setScalar(1 + pulse)
          }
        })
      }
      
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    function handleResize() {
      if (!containerRef.current || !camera || !renderer) return
      
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      mountedRef.current = false
      window.removeEventListener('resize', handleResize)
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      
      if (rendererRef.current && containerRef.current && containerRef.current.contains(rendererRef.current.domElement)) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.geometry) object.geometry.dispose()
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose())
            } else {
              object.material.dispose()
            }
          }
        })
      }
    }
  }, [])

  // Update model when workout data changes
  useEffect(() => {
    if (modelRef.current && sceneRef.current) {
      // Remove old model
      sceneRef.current.remove(modelRef.current)
      
      // Create new model with updated growth factors
      const createBodyModel = () => {
        const bodyGroup = new THREE.Group()

        const armMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xff6b6b,
          emissive: 0xff6b6b,
          emissiveIntensity: 0.1
        })
        const chestMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x4ecdc4,
          emissive: 0x4ecdc4,
          emissiveIntensity: 0.1
        })
        const legMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x45b7d1,
          emissive: 0x45b7d1,
          emissiveIntensity: 0.1
        })
        const coreMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xf9ca24,
          emissive: 0xf9ca24,
          emissiveIntensity: 0.1
        })

        // Head
        const headGeometry = new THREE.SphereGeometry(0.2, 32, 32)
        const head = new THREE.Mesh(headGeometry, new THREE.MeshPhongMaterial({ color: 0xfdbcb4 }))
        head.position.y = 1.6
        bodyGroup.add(head)

        // Chest/Torso
        const chestGeometry = new THREE.BoxGeometry(0.8 * growthFactors.chest, 1.0 * growthFactors.chest, 0.3 * growthFactors.chest)
        const chest = new THREE.Mesh(chestGeometry, chestMaterial)
        chest.position.y = 0.8
        bodyGroup.add(chest)

        // Arms
        const leftArmGeometry = new THREE.CylinderGeometry(0.12 * growthFactors.arms, 0.08 * growthFactors.arms, 0.8, 32)
        const leftArm = new THREE.Mesh(leftArmGeometry, armMaterial)
        leftArm.position.set(-0.5 * growthFactors.chest, 0.8, 0)
        leftArm.rotation.z = Math.PI / 6
        bodyGroup.add(leftArm)

        const rightArmGeometry = new THREE.CylinderGeometry(0.12 * growthFactors.arms, 0.08 * growthFactors.arms, 0.8, 32)
        const rightArm = new THREE.Mesh(rightArmGeometry, armMaterial)
        rightArm.position.set(0.5 * growthFactors.chest, 0.8, 0)
        rightArm.rotation.z = -Math.PI / 6
        bodyGroup.add(rightArm)

        // Core
        const coreGeometry = new THREE.BoxGeometry(0.6 * growthFactors.core, 0.6 * growthFactors.core, 0.25 * growthFactors.core)
        const core = new THREE.Mesh(coreGeometry, coreMaterial)
        core.position.y = 0.2
        bodyGroup.add(core)

        // Legs
        const leftLegGeometry = new THREE.CylinderGeometry(0.15 * growthFactors.legs, 0.1 * growthFactors.legs, 1.0, 32)
        const leftLeg = new THREE.Mesh(leftLegGeometry, legMaterial)
        leftLeg.position.set(-0.2, -0.5, 0)
        bodyGroup.add(leftLeg)

        const rightLegGeometry = new THREE.CylinderGeometry(0.15 * growthFactors.legs, 0.1 * growthFactors.legs, 1.0, 32)
        const rightLeg = new THREE.Mesh(rightLegGeometry, legMaterial)
        rightLeg.position.set(0.2, -0.5, 0)
        bodyGroup.add(rightLeg)

        return bodyGroup
      }

      const model = createBodyModel()
      modelRef.current = model
      sceneRef.current.add(model)
    }
  }, [growthFactors])

  return (
    <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading 3D Body Model...</p>
          </div>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Muscle Growth Legend */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200">
        <h4 className="text-xs font-bold text-gray-800 mb-2">Muscle Growth</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <span className="text-gray-600">Arms: {(growthFactors.arms * 100).toFixed(0)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-teal-400"></div>
            <span className="text-gray-600">Chest: {(growthFactors.chest * 100).toFixed(0)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span className="text-gray-600">Legs: {(growthFactors.legs * 100).toFixed(0)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span className="text-gray-600">Core: {(growthFactors.core * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm z-10">
        🖱️ Drag to rotate • Scroll to zoom • Watch muscles grow with workouts!
      </div>
    </div>
  )
}

export default DynamicBodyModel