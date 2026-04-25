'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

// The actual rotating globe component
function Globe() {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Create particles
  const particleCount = 1000
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 0.5
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos((Math.random() * 2) - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    return positions
  }, [particleCount])

  useFrame((state) => {
    if (!groupRef.current) return
    
    // Slow rotation
    groupRef.current.rotation.y += 0.002
    
    // Cursor interaction (tilt)
    const targetX = (state.pointer.x * Math.PI) / 4
    const targetY = (state.pointer.y * Math.PI) / 4
    
    // Smooth damping
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.z += (-targetX - groupRef.current.rotation.z) * 0.05
    
    // Floating effect
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1

    if (particlesRef.current) {
      particlesRef.current.rotation.y -= 0.001
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main Wireframe Globe */}
      <Sphere args={[2, 64, 64]}>
        <meshBasicMaterial 
          color="#0066FF" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </Sphere>

      {/* Inner Glowing Core */}
      <Sphere args={[1.9, 32, 32]}>
        <meshStandardMaterial 
          color="#0A1F44" 
          emissive="#0066FF"
          emissiveIntensity={0.5}
          roughness={0.2}
        />
      </Sphere>

      {/* Orbiting Particles */}
      <Points ref={particlesRef} positions={particlesPosition}>
        <PointMaterial
          transparent
          color="#00D4FF"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

export default function CtaGlobe() {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={['#000000']} />
        
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#00D4FF" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#0066FF" />
        
        <Globe />

        {/* Bloom Post-processing for Neon Glow */}
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
