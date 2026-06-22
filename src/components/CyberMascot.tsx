import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MathUtils, Group } from 'three';
import { Float, Sphere, MeshDistortMaterial, Sparkles } from '@react-three/drei';

export function CyberMascot() {
  const groupRef = useRef<Group>(null!);
  const coreRef = useRef<Mesh>(null!);
  const ringRef = useRef<Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Mouse tracking with lerp for smooth parallax (applied only to the world group, not sparkles)
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;
    
    if (groupRef.current) {
        groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
        groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    }

    // Core pulsing and rotation
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.5;
      coreRef.current.rotation.y = t * 0.8;
      coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.2;
      ringRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          {/* The Cyber Core */}
          <mesh ref={coreRef}>
            <icosahedronGeometry args={[1.5, 2]} />
            <MeshDistortMaterial 
              color="#c026d3" 
              emissive="#c026d3" 
              emissiveIntensity={2} 
              wireframe 
              distort={0.4} 
              speed={2} 
            />
          </mesh>

          {/* Inner Solid Core */}
          <Sphere args={[1.2, 32, 32]}>
            <meshStandardMaterial 
              color="#000000" 
              emissive="#22d3ee"
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>

          {/* Outer Ring */}
          <mesh ref={ringRef}>
            <torusGeometry args={[2.5, 0.05, 16, 100]} />
            <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2} />
          </mesh>
          
          <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.8, 0.02, 16, 100]} />
            <meshStandardMaterial color="#d946ef" emissive="#d946ef" emissiveIntensity={1.5} />
          </mesh>
        </Float>
      </group>

      {/* Background Star field slowly floating (does not jump with mouse) */}
      <Sparkles count={150} scale={15} size={3} speed={0.05} opacity={0.4} color="#22d3ee" noise={0.2} />
    </>
  );
}
