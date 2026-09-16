"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { Character } from "./Character";

export default function Avatar3D({ introWave }: { introWave: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.05, 5.6], fov: 34 }}
      gl={{ alpha: true, antialias: true }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={1.5} />
      <hemisphereLight args={["#ffffff", "#5b4d40", 1.4]} />
      <directionalLight position={[3.5, 5, 5]} intensity={2.6} />
      <directionalLight position={[-4.5, 2, 1.5]} intensity={1.5} color="#ffd9c4" />
      <directionalLight position={[-1, 3, -4]} intensity={1.6} color="#e8734a" />
      <directionalLight position={[2, 1, -3.5]} intensity={0.9} color="#9ec5d8" />

      <group position={[0, -1.5, 0]}>
        <Character introWave={introWave} hovered={hovered} />
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.4}
          scale={5}
          blur={2.8}
          far={2.2}
          resolution={512}
          color="#000000"
        />
      </group>
    </Canvas>
  );
}
