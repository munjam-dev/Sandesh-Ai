'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Plane } from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

function FloatingCards() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    
    // Slow continuous rotation
    groupRef.current.rotation.y += 0.001
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    
    // Cursor-based interaction
    const targetX = (state.pointer.x * Math.PI) / 8
    const targetY = (state.pointer.y * Math.PI) / 8
    
    // Smooth damping
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.z += (-targetX - groupRef.current.rotation.z) * 0.05
  })

  return (
    <group ref={groupRef}>
      {/* Central glowing core abstract shape */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial 
          color="#0A1F44" 
          emissive="#0066FF" 
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      {/* Floating Card 1 */}
      <Plane args={[1.5, 2]} position={[-1.5, 0.5, 1]} rotation={[0.2, 0.4, -0.1]}>
        <meshPhysicalMaterial 
          color="#00D4FF" 
          transmission={0.9} 
          opacity={0.3} 
          transparent 
          roughness={0.1}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </Plane>
      {/* Border for Card 1 */}
      <lineSegments position={[-1.5, 0.5, 1]} rotation={[0.2, 0.4, -0.1]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.5, 2)]} />
        <lineBasicMaterial color="#00D4FF" transparent opacity={0.5} />
      </lineSegments>

      {/* Floating Card 2 */}
      <Plane args={[2, 1.2]} position={[1.5, -0.5, 0.5]} rotation={[-0.1, -0.3, 0.2]}>
        <meshPhysicalMaterial 
          color="#0066FF" 
          transmission={0.9} 
          opacity={0.3} 
          transparent 
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </Plane>
      <lineSegments position={[1.5, -0.5, 0.5]} rotation={[-0.1, -0.3, 0.2]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(2, 1.2)]} />
        <lineBasicMaterial color="#0066FF" transparent opacity={0.5} />
      </lineSegments>

      {/* Floating Card 3 */}
      <Plane args={[1, 1]} position={[0, 1.5, -1]} rotation={[0.5, 0.1, 0.3]}>
        <meshPhysicalMaterial 
          color="#ffffff" 
          transmission={0.9} 
          opacity={0.1} 
          transparent 
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </Plane>
      <lineSegments position={[0, 1.5, -1]} rotation={[0.5, 0.1, 0.3]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(1, 1)]} />
        <lineBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </lineSegments>
    </group>
  )
}

function ParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particleCount = 500
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [particleCount])

  useFrame((state) => {
    if (!particlesRef.current) return
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
    particlesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5
  })

  return (
    <Points ref={particlesRef} positions={particlesPosition}>
      <PointMaterial
        transparent
        color="#00D4FF"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export default function Hero3D() {
  return (
    <div className="w-[400px] h-[300px] pointer-events-none relative flex justify-center items-center">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#00D4FF" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#0066FF" />
        
        <FloatingCards />
        <ParticleSystem />

        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2} 
            mipmapBlur 
            intensity={1.5} 
            radius={0.4}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
