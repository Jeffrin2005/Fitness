import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function Simple3DModel({ modelPath = '/models/human.glb', workoutData = {} }) {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const animationIdRef = useRef(null)
  const modelRef = useRef(null)
  const mountedRef = useRef(false)

  // Calculate muscle growth factors based on workout data
  const calculateMuscleGrowth = () => {
    const growthFactors = {
      arms: 1.0,
      chest: 1.0,
      legs: 1.0,
      core: 1.0
    }

    const data = workoutData || {
      pushups: { count: 0, frequency: 0 },
      armExercises: { count: 0, frequency: 0 },
      chestExercises: { count: 0, frequency: 0 },
      legExercises: { count: 0, frequency: 0 },
      coreExercises: { count: 0, frequency: 0 }
    }

    // Arms growth (biceps, triceps)
    const armScore = (data.pushups?.count || 0) * 0.3 + (data.armExercises?.count || 0) * 0.7
    growthFactors.arms = 1.0 + (armScore * 0.002)

    // Chest growth
    const chestScore = (data.pushups?.count || 0) * 0.4 + (data.chestExercises?.count || 0) * 0.6
    growthFactors.chest = 1.0 + (chestScore * 0.0025)

    // Legs growth
    const legScore = (data.legExercises?.count || 0) * 0.8
    growthFactors.legs = 1.0 + (legScore * 0.003)

    // Core growth
    const coreScore = (data.coreExercises?.count || 0) * 0.6
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

    // Camera - positioned closer for larger initial view
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

    // Controls - adjusted for closer view
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 2
    controls.maxDistance = 8
    controls.autoRotate = true
    controls.autoRotateSpeed = 1
    controls.enablePan = false

    // Load 3D Model
    const loader = new GLTFLoader()
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene
        modelRef.current = model

        // Center and scale model - increased scale for larger appearance
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())

        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 2.2 / maxDim  // Reduced from 2.5 to 2.2 for better framing across all pages
        model.scale.multiplyScalar(scale)

        model.position.x = -center.x * scale
        model.position.y = -center.y * scale
        model.position.z = -center.z * scale

        // Apply muscle growth transformations to specific body parts
        let armsScaled = false
        let chestScaled = false
        let legsScaled = false
        let coreScaled = false

        model.traverse((child) => {
          if (child.isMesh) {
            const name = child.name.toLowerCase()
            console.log('Found mesh:', name) // Debug: Log all mesh names

            // Reset scale first, then apply growth
            const originalScale = child.scale.x

            // Scale arms based on workout data
            if (name.includes('arm') || name.includes('bicep') || name.includes('tricep') ||
              name.includes('shoulder') || name.includes('deltoid')) {
              console.log('Scaling arms from', originalScale, 'to', originalScale * growthFactors.arms)
              child.scale.set(originalScale * growthFactors.arms, originalScale * growthFactors.arms, originalScale * growthFactors.arms)
              armsScaled = true
            }

            // Scale chest based on workout data
            if (name.includes('chest') || name.includes('torso') || name.includes('pec') ||
              name.includes('breast') || name.includes('rib')) {
              console.log('Scaling chest from', originalScale, 'to', originalScale * growthFactors.chest)
              child.scale.set(originalScale * growthFactors.chest, originalScale * growthFactors.chest, originalScale * growthFactors.chest)
              chestScaled = true
            }

            // Scale legs based on workout data
            if (name.includes('leg') || name.includes('thigh') || name.includes('calf') ||
              name.includes('quad') || name.includes('hamstring')) {
              console.log('Scaling legs from', originalScale, 'to', originalScale * growthFactors.legs)
              child.scale.set(originalScale * growthFactors.legs, originalScale * growthFactors.legs, originalScale * growthFactors.legs)
              legsScaled = true
            }

            // Scale core based on workout data
            if (name.includes('core') || name.includes('ab') || name.includes('abs') ||
              name.includes('stomach') || name.includes('abdomen') || name.includes('waist')) {
              console.log('Scaling core from', originalScale, 'to', originalScale * growthFactors.core)
              child.scale.set(originalScale * growthFactors.core, originalScale * growthFactors.core, originalScale * growthFactors.core)
              coreScaled = true
            }
          }
        })

        // Fallback: If no specific body parts were found, apply growth to ALL meshes
        if (!armsScaled && !chestScaled && !legsScaled && !coreScaled) {
          console.log('No specific body parts found, applying growth to all meshes')
          model.traverse((child) => {
            if (child.isMesh) {
              // Apply average growth to all meshes
              const avgGrowth = (growthFactors.arms + growthFactors.chest + growthFactors.legs + growthFactors.core) / 4
              const originalScale = child.scale.x
              console.log('Applying average growth from', originalScale, 'to', originalScale * avgGrowth)
              child.scale.set(originalScale * avgGrowth, originalScale * avgGrowth, originalScale * avgGrowth)
            }
          })
        }

        scene.add(model)
      },
      (progress) => {
        console.log('Loading 3D model:', Math.round((progress.loaded / progress.total) * 100) + '%')
      },
      (error) => {
        console.error('Error loading 3D model:', error)
      }
    )

    // Animation loop
    function animate() {
      animationIdRef.current = requestAnimationFrame(animate)
      controls.update()
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
  }, [modelPath, growthFactors])

  return (
    <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200">
      <div ref={containerRef} className="w-full h-full" />

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm z-10">
        🖱️ Drag to rotate • Scroll to zoom
      </div>

      {/* Muscle Growth Legend */}
      {Object.keys(growthFactors).length > 0 && (
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
      )}
    </div>
  )
}

export default Simple3DModel