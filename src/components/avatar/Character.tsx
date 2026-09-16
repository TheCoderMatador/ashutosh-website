"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const C = {
  skin: "#f0c49b",
  skinShade: "#e0a97f",
  hair: "#6d4a30",
  cap: "#7a6750",
  tunic: "#5c7c91",
  tunicDark: "#4b6675",
  shawl: "#e8734a",
  belt: "#8b4a32",
  hose: "#dcb59b",
  shoe: "#6b3f2a",
  white: "#ffffff",
  iris: "#3f7fa6",
  dark: "#2b1d14",
};

const damp = THREE.MathUtils.damp;

export function Character({
  introWave,
  hovered,
}: {
  introWave: number;
  hovered: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const waveArm = useRef<THREE.Group>(null);
  const waveForearm = useRef<THREE.Group>(null);
  const hipArm = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);

  const pointer = useRef({ x: 0, y: 0 });
  const blink = useRef({ next: 2.5, closed: false, until: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.08);
    const px = pointer.current.x;
    const py = pointer.current.y;

    const periodic = t > introWave + 4 && t % 11 > 9;
    const waving = t < introWave || hovered || periodic;

    if (root.current) {
      const entrance = Math.min(t / 0.9, 1);
      const ease = 1 - Math.pow(1 - entrance, 3);
      root.current.scale.setScalar(0.82 + ease * 0.18);
      root.current.position.y = damp(
        root.current.position.y,
        Math.sin(t * 1.15) * 0.04 - (1 - ease) * 0.5,
        5,
        dt
      );
      root.current.rotation.y = damp(
        root.current.rotation.y,
        px * 0.16 + Math.sin(t * 0.4) * 0.07,
        3,
        dt
      );
    }

    if (body.current) {
      body.current.scale.y = 1 + Math.sin(t * 1.7) * 0.014;
      body.current.rotation.z = damp(
        body.current.rotation.z,
        Math.sin(t * 0.72) * 0.018,
        3,
        dt
      );
    }

    if (head.current) {
      head.current.rotation.y = damp(head.current.rotation.y, px * 0.34, 5, dt);
      head.current.rotation.x = damp(
        head.current.rotation.x,
        py * 0.16 + Math.sin(t * 0.9) * 0.015,
        5,
        dt
      );
      head.current.rotation.z = damp(
        head.current.rotation.z,
        px * 0.07 + Math.sin(t * 1.3) * 0.012,
        5,
        dt
      );
    }

    if (waveArm.current && waveForearm.current) {
      const armTarget = waving
        ? 2.26 + Math.sin(t * 3.6) * 0.07
        : 0.26 + Math.sin(t * 1.15) * 0.03;
      const foreTarget = waving
        ? 0.66 + Math.sin(t * 7.6) * 0.42
        : 0.16 + Math.sin(t * 1.15 + 0.4) * 0.02;
      waveArm.current.rotation.z = damp(
        waveArm.current.rotation.z,
        armTarget,
        waving ? 7 : 3.5,
        dt
      );
      waveArm.current.rotation.x = damp(
        waveArm.current.rotation.x,
        waving ? -0.22 : 0.06,
        5,
        dt
      );
      waveForearm.current.rotation.z = damp(
        waveForearm.current.rotation.z,
        foreTarget,
        waving ? 7 : 3.5,
        dt
      );
    }

    if (hipArm.current) {
      hipArm.current.rotation.z = damp(
        hipArm.current.rotation.z,
        -0.52 + Math.sin(t * 1.15 + 1.1) * 0.02,
        3,
        dt
      );
    }

    if (eyes.current) {
      const b = blink.current;
      if (!b.closed && t > b.next) {
        b.closed = true;
        b.until = t + 0.11;
      } else if (b.closed && t > b.until) {
        b.closed = false;
        b.next = t + 2.4 + Math.random() * 3.4;
      }
      eyes.current.scale.y = damp(
        eyes.current.scale.y,
        b.closed ? 0.08 : 1,
        28,
        dt
      );
    }
  });

  return (
    <group ref={root}>
      <group ref={body}>
        {/* tunic */}
        <mesh position={[0, 1.48, 0]}>
          <cylinderGeometry args={[0.4, 0.54, 0.9, 28, 1]} />
          <meshStandardMaterial color={C.tunic} roughness={0.85} />
        </mesh>
        {/* tunic hem */}
        <mesh position={[0, 1.03, 0]}>
          <torusGeometry args={[0.54, 0.035, 10, 28]} />
          <meshStandardMaterial color={C.tunicDark} roughness={0.85} />
        </mesh>
        {/* shoulders */}
        <mesh position={[0, 1.86, 0]} scale={[1.04, 0.82, 0.94]}>
          <sphereGeometry args={[0.4, 24, 18]} />
          <meshStandardMaterial color={C.tunic} roughness={0.85} />
        </mesh>

        {/* belt */}
        <mesh position={[0, 1.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.482, 0.052, 12, 32]} />
          <meshStandardMaterial color={C.belt} roughness={0.7} />
        </mesh>

        {/* shawl / cowl */}
        <mesh position={[0, 1.84, 0]} scale={[1, 1, 0.95]}>
          <cylinderGeometry args={[0.27, 0.56, 0.42, 32, 1, true]} />
          <meshStandardMaterial
            color={C.shawl}
            roughness={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 2.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.245, 0.095, 14, 28]} />
          <meshStandardMaterial color={C.shawl} roughness={0.9} />
        </mesh>

        {/* neck */}
        <mesh position={[0, 2.04, 0]}>
          <cylinderGeometry args={[0.14, 0.155, 0.22, 16]} />
          <meshStandardMaterial color={C.skinShade} roughness={0.8} />
        </mesh>

        {/* waving arm (screen right) */}
        <group ref={waveArm} position={[0.42, 1.88, 0]} rotation={[-0.22, 0, 2.26]}>
          <mesh position={[0, -0.28, 0]}>
            <capsuleGeometry args={[0.115, 0.34, 6, 18]} />
            <meshStandardMaterial color={C.tunic} roughness={0.85} />
          </mesh>
          <group ref={waveForearm} position={[0, -0.55, 0]} rotation={[0, 0, 0.66]}>
            <mesh position={[0, -0.25, 0]}>
              <capsuleGeometry args={[0.1, 0.3, 6, 18]} />
              <meshStandardMaterial color={C.tunic} roughness={0.85} />
            </mesh>
            <mesh position={[0, -0.47, 0]}>
              <sphereGeometry args={[0.135, 20, 16]} />
              <meshStandardMaterial color={C.skin} roughness={0.8} />
            </mesh>
          </group>
        </group>

        {/* hand-on-hip arm (screen left) */}
        <group ref={hipArm} position={[-0.42, 1.88, 0]} rotation={[0, 0, -0.52]}>
          <mesh position={[0, -0.28, 0]}>
            <capsuleGeometry args={[0.115, 0.34, 6, 18]} />
            <meshStandardMaterial color={C.tunic} roughness={0.85} />
          </mesh>
          <group position={[0, -0.55, 0]} rotation={[-0.15, 0, 1.45]}>
            <mesh position={[0, -0.25, 0]}>
              <capsuleGeometry args={[0.1, 0.3, 6, 18]} />
              <meshStandardMaterial color={C.tunic} roughness={0.85} />
            </mesh>
            <mesh position={[0, -0.46, 0]}>
              <sphereGeometry args={[0.13, 20, 16]} />
              <meshStandardMaterial color={C.skin} roughness={0.8} />
            </mesh>
          </group>
        </group>

        {/* head */}
        <group ref={head} position={[0, 2.44, 0]} scale={1.16}>
          <mesh scale={[1, 1.04, 0.97]}>
            <sphereGeometry args={[0.4, 32, 26]} />
            <meshStandardMaterial color={C.skin} roughness={0.8} />
          </mesh>

          {/* beard */}
          <mesh position={[0, -0.175, 0.01]} scale={[1.01, 0.96, 1]}>
            <sphereGeometry args={[0.383, 30, 24]} />
            <meshStandardMaterial color={C.hair} roughness={0.95} />
          </mesh>
          {/* moustache */}
          <mesh position={[0, -0.048, 0.375]} scale={[1.6, 0.42, 0.4]}>
            <sphereGeometry args={[0.108, 18, 14]} />
            <meshStandardMaterial color={C.hair} roughness={0.95} />
          </mesh>

          {/* mouth + teeth */}
          <mesh position={[0, -0.142, 0.372]} scale={[1.15, 0.66, 0.4]}>
            <sphereGeometry args={[0.108, 18, 14]} />
            <meshStandardMaterial color={C.dark} roughness={0.9} />
          </mesh>
          <mesh position={[0, -0.108, 0.392]} scale={[1, 0.32, 0.3]}>
            <sphereGeometry args={[0.096, 18, 14]} />
            <meshStandardMaterial color={C.white} roughness={0.6} />
          </mesh>

          {/* nose */}
          <mesh position={[0, 0.005, 0.375]}>
            <sphereGeometry args={[0.062, 18, 14]} />
            <meshStandardMaterial color={C.skinShade} roughness={0.8} />
          </mesh>

          {/* eyes */}
          <group ref={eyes}>
            {[-1, 1].map((s) => (
              <group key={s} position={[s * 0.152, 0.085, 0.3]}>
                <mesh scale={[1, 1.12, 0.62]}>
                  <sphereGeometry args={[0.087, 20, 16]} />
                  <meshStandardMaterial color={C.white} roughness={0.5} />
                </mesh>
                <mesh position={[s * 0.012, 0, 0.05]}>
                  <sphereGeometry args={[0.042, 16, 14]} />
                  <meshStandardMaterial color={C.iris} roughness={0.45} />
                </mesh>
                <mesh position={[s * 0.012, 0, 0.073]}>
                  <sphereGeometry args={[0.021, 14, 12]} />
                  <meshStandardMaterial color={C.dark} roughness={0.4} />
                </mesh>
                <mesh position={[s * 0.032, 0.028, 0.082]}>
                  <sphereGeometry args={[0.011, 10, 8]} />
                  <meshStandardMaterial
                    color={C.white}
                    emissive={C.white}
                    emissiveIntensity={0.5}
                  />
                </mesh>
              </group>
            ))}
          </group>

          {/* brows */}
          {[-1, 1].map((s) => (
            <mesh
              key={s}
              position={[s * 0.158, 0.192, 0.315]}
              rotation={[0, 0, s * -0.16]}
              scale={[1, 0.32, 0.4]}
            >
              <sphereGeometry args={[0.088, 16, 12]} />
              <meshStandardMaterial color={C.hair} roughness={0.95} />
            </mesh>
          ))}

          {/* flat cap */}
          <mesh position={[0, 0.2, -0.015]} scale={[1.03, 0.56, 1.04]}>
            <sphereGeometry args={[0.402, 30, 22]} />
            <meshStandardMaterial color={C.cap} roughness={0.95} />
          </mesh>
          <mesh
            position={[0, 0.165, 0.315]}
            rotation={[-0.34, 0, 0]}
            scale={[1, 0.17, 0.62]}
          >
            <sphereGeometry args={[0.3, 22, 16]} />
            <meshStandardMaterial color={C.cap} roughness={0.95} />
          </mesh>
        </group>
      </group>

      {/* legs */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.19, 1.14, 0]} rotation={[0, 0, s * -0.03]}>
          <mesh position={[0, -0.3, 0]}>
            <capsuleGeometry args={[0.135, 0.32, 6, 18]} />
            <meshStandardMaterial color={C.hose} roughness={0.85} />
          </mesh>
          <mesh position={[0, -0.85, 0]}>
            <capsuleGeometry args={[0.112, 0.3, 6, 18]} />
            <meshStandardMaterial color={C.hose} roughness={0.85} />
          </mesh>
          <group position={[s * 0.01, -1.07, 0.02]} rotation={[0, s * 0.18, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.07]} scale={[1, 1, 0.78]}>
              <capsuleGeometry args={[0.115, 0.19, 6, 16]} />
              <meshStandardMaterial color={C.shoe} roughness={0.6} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}
