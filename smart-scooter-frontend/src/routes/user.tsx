import * as THREE from 'three'
import { useLayoutEffect, useRef, useState } from 'react'
import { Canvas, applyProps, useFrame } from '@react-three/fiber'
import { PerformanceMonitor, AccumulativeShadows, RandomizedLight, Environment, Lightformer, Float, useGLTF, Text3D } from '@react-three/drei'
import { LayerMaterial, Color, Depth } from 'lamina'
import { useOutlet } from "react-router-dom";
import UserNav from "../lib/user-nav"

export default function User() {
    const outlet = useOutlet();
    return (
        <>
            <UserNav></UserNav>
            <main className="container">
                {outlet || <Showcase></Showcase>}
            </main>
        </>
    )
}

function Showcase() {
    const [degraded, degrade] = useState(false)
    return (
        <>

            <section>
                <div style={{ "aspectRatio": 2.4 }}>
                    <Canvas shadows camera={{ position: [5, 0, 15], fov: 30 }}>
                        <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} />
                        <ambientLight intensity={0.5} />
                        <Text3D position={[-4.8, 0, 2]} font="./font/tech_font.json">
                            Start Your Journey
                        </Text3D>
                        <Porsche scale={3.4} position={[-0.5, -2, 0]} rotation={[0, Math.PI / 5, 0]} />
                        <AccumulativeShadows position={[0, -1.16, 0]} frames={100} alphaTest={0.9} scale={10}>
                            <RandomizedLight amount={8} radius={10} ambient={0.5} position={[1, 5, -1]} />
                        </AccumulativeShadows>
                        {/** PerfMon will detect performance issues */}
                        <PerformanceMonitor onDecline={() => degrade(true)} />
                        {/* Renders contents "live" into a HDRI environment (scene.environment). */}
                        <Environment frames={degraded ? 1 : Infinity} preset="forest" resolution={256} background blur={1}>
                            <Lightformers />
                        </Environment>

                        <CameraRig />
                    </Canvas>
                </div>
            </section >
        </>
    )
}

/*
Author: Karol Miklas (https://sketchfab.com/karolmiklas)
License: CC-BY-SA-4.0 (http://creativecommons.org/licenses/by-sa/4.0/)
Source: https://sketchfab.com/3d-models/free-porsche-911-carrera-4s-d01b254483794de3819786d93e0e1ebf
Title: (FREE) Porsche 911 Carrera 4S
*/

//"125cc Scooter - Motorcycle" (https://skfb.ly/osvZw) by Diego G. is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

function Porsche(props) {
    const { scene, nodes, materials } = useGLTF('/3d/scooter.glb')

    return <primitive object={scene} {...props} />
}

function CameraRig({ v = new THREE.Vector3() }) {
    return useFrame((state) => {
        const t = state.clock.elapsedTime
        state.camera.position.lerp(v.set(Math.sin(t / 5), 0, 12 + Math.cos(t / 5) / 2), 0.05)
        state.camera.lookAt(0, 0, 0)
    })
}

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
    const group = useRef()
    useFrame((state, delta) => (group.current.position.z += delta * 10) > 20 && (group.current.position.z = -60))
    return (
        <>
            {/* Ceiling */}
            <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <group rotation={[0, 0.5, 0]}>
                <group ref={group}>
                    {positions.map((x, i) => (
                        <Lightformer key={i} form="circle" intensity={2} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[3, 1, 1]} />
                    ))}
                </group>
            </group>
            {/* Sides */}
            <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
            <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
            <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
            {/* Accent (red) */}
            <Float speed={5} floatIntensity={2} rotationIntensity={2}>
                <Lightformer form="ring" color="red" intensity={1} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
            </Float>
            {/* Background */}
            <mesh scale={100}>
                <sphereGeometry args={[1, 64, 64]} />
                <LayerMaterial side={THREE.BackSide}>
                    <Color color="#444" alpha={1} mode="normal" />
                    <Depth colorA="blue" colorB="black" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
                </LayerMaterial>
            </mesh>
        </>
    )
}
