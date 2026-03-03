import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows, OrbitControls } from '@react-three/drei'
import { useRef, useEffect, Suspense } from 'react'
import * as THREE from 'three'

function HumanModel({ mouse }) {
    const { scene } = useGLTF('/models/human.glb')
    const neckRef = useRef()
    const spineRef = useRef()
    const groupRef = useRef()

    useEffect(() => {
        scene.traverse((child) => {
            const name = child.name.toLowerCase()

            // Bone References for Tracking
            if (child.isBone) {
                if (name.includes('neck')) neckRef.current = child
                if (name.includes('spine') && !spineRef.current) spineRef.current = child
            }

            // MESH TRANSFORMATIONS (MUSCLE SIMULATION)
            if (child.isMesh) {
                // Apply defined Bodybuilder Material
                child.material = new THREE.MeshStandardMaterial({
                    color: '#f8fafc',
                    metalness: 0.1,
                    roughness: 0.6,
                    transparent: true,
                    opacity: 1,
                    emissive: new THREE.Color('#334155'),
                    emissiveIntensity: 0.1
                })

                // INFLATE MUSCLES: Scale X/Z axes for thickness without adding height
                // Chest / Upper Torso
                if (name.includes('chest') || name.includes('pec') || name.includes('torso')) {
                    child.scale.x *= 1.35
                    child.scale.z *= 1.25
                }

                // Arms (Biceps/Triceps/Shoulders)
                if (name.includes('arm') || name.includes('bicep') || name.includes('shoulder') || name.includes('deltoid')) {
                    child.scale.x *= 1.5
                    child.scale.z *= 1.5
                }

                // Legs (Quadriceps/Calves)
                if (name.includes('leg') || name.includes('quad') || name.includes('thigh')) {
                    child.scale.x *= 1.4
                    child.scale.z *= 1.4
                }

                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }, [scene])

    useFrame((state) => {
        if (!neckRef.current || !mouse.current) return

        // Head follows mouse
        const targetY = mouse.current.x * 0.8
        const targetX = -mouse.current.y * 0.4
        const targetSpineY = mouse.current.x * 0.2

        neckRef.current.rotation.y = THREE.MathUtils.lerp(neckRef.current.rotation.y, targetY, 0.1)
        neckRef.current.rotation.x = THREE.MathUtils.lerp(neckRef.current.rotation.x, targetX, 0.1)

        if (spineRef.current) {
            spineRef.current.rotation.y = THREE.MathUtils.lerp(spineRef.current.rotation.y, targetSpineY, 0.05)
        }

        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
        }
    })

    return (
        <group ref={groupRef}>
            <primitive object={scene} scale={2.5} position={[0, -2.8, 0]} />
        </group>
    )
}

export default function Interactive3DHuman() {
    const mouse = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (event) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = (event.clientY / window.innerHeight) * 2 - 1
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className="w-full h-full min-h-[600px] relative bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-inner">
            <Canvas shadows camera={{ position: [0, 1, 5], fov: 40 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <Suspense fallback={null}>
                    <HumanModel mouse={mouse} />
                    <ContactShadows position={[0, -2.8, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#000000" />
                    <Environment preset="city" />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 1.8} />
            </Canvas>

            <div className="absolute top-8 left-8 pointer-events-none">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Elite Athletic Model</h2>
                <p className="text-slate-500 font-medium">Peak Condition • Mouse Tracking Active</p>
            </div>
        </div>
    )
}
