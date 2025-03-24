// import React, { useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Text, useTexture, Stars } from "@react-three/drei";
// import { useSpring, animated } from "@react-spring/three";
// import { LogOut, ArrowRight } from "lucide-react";
// import { useAuth } from "../contexts/AuthContext";

// // Animated floating companion
// const Companion = () => {
//   const mesh = useRef<THREE.Mesh>(null!);
//   const [active, setActive] = React.useState(false);

//   // Animation with react-spring
//   const { scale, position, rotation } = useSpring({
//     scale: active ? [1.2, 1.2, 1.2] : [1, 1, 1],
//     position: active ? [0, 0.2, 0] : [0, 0, 0],
//     rotation: active ? [0, Math.PI * 2, 0] : [0, 0, 0],
//     config: { mass: 1, tension: 170, friction: 26 },
//   });

//   // Continuous floating animation
//   useFrame((state) => {
//     if (!active) {
//       mesh.current.position.y =
//         Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
//       mesh.current.rotation.y += 0.005;
//     }
//   });

//   // Load texture for the companion
//   const texture = useTexture(
//     "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop"
//   );

//   return (
//     <animated.mesh
//       ref={mesh}
//       position={position as any}
//       rotation={rotation as any}
//       scale={scale as any}
//       onClick={() => setActive(!active)}
//     >
//       <sphereGeometry args={[1, 32, 32]} />
//       <meshStandardMaterial
//         map={texture}
//         emissive="#5000ff"
//         emissiveIntensity={0.5}
//         metalness={0.8}
//         roughness={0.2}
//       />
//     </animated.mesh>
//   );
// };

// // Floating text with glow
// const FloatingText = ({ text, position, size = 0.2, color = "#ffffff" }) => {
//   const textRef = useRef<THREE.Mesh>(null!);

//   useFrame((state) => {
//     textRef.current.position.y +=
//       Math.sin(state.clock.getElapsedTime() * 0.5) * 0.001;
//   });

//   return (
//     <Text
//       ref={textRef}
//       position={position}
//       fontSize={size}
//       color={color}
//       font="/fonts/Inter-Bold.woff"
//       anchorX="center"
//       anchorY="middle"
//     >
//       {text}
//       <meshStandardMaterial
//         color={color}
//         emissive={color}
//         emissiveIntensity={0.6}
//       />
//     </Text>
//   );
// };

// // Particle system for background
// const ParticleField = () => {
//   const particles = useRef<THREE.Points>(null!);

//   useFrame(() => {
//     particles.current.rotation.y += 0.0005;
//     particles.current.rotation.x += 0.0002;
//   });

//   return (
//     <points ref={particles}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={1000}
//           array={new Float32Array(3000).map(() => (Math.random() - 0.5) * 20)}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial size={0.05} color="#8a2be2" sizeAttenuation transparent />
//     </points>
//   );
// };

// export const BackNavigationPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { signOut } = useAuth();

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       navigate("/");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   const handleContinue = () => {
//     navigate("/chat");
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
//       {/* 3D Canvas */}
//       <div className="absolute inset-0 z-0">
//         <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
//           <ambientLight intensity={0.3} />
//           <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
//           <pointLight
//             position={[-10, -10, -10]}
//             intensity={0.5}
//             color="#5000ff"
//           />

//           <Companion />

//           <FloatingText
//             text="Why leave your companion?"
//             position={[0, 2, 0]}
//             size={0.3}
//             color="#ffffff"
//           />

//           <FloatingText
//             text="We're just getting started..."
//             position={[0, 1.5, 0]}
//             size={0.2}
//             color="#a78bfa"
//           />

//           <ParticleField />
//           <Stars
//             radius={100}
//             depth={50}
//             count={5000}
//             factor={4}
//             saturation={0}
//             fade
//             speed={1}
//           />

//           <OrbitControls
//             enableZoom={false}
//             enablePan={false}
//             rotateSpeed={0.5}
//             autoRotate
//             autoRotateSpeed={0.5}
//           />
//         </Canvas>
//       </div>

//       {/* UI Overlay */}
//       <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
//         <div className="w-full max-w-md backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20">
//           <h1 className="text-3xl font-bold text-center mb-6 text-white">
//             We'll Miss You
//           </h1>

//           <p className="text-lg text-center text-purple-200 mb-8">
//             Your AI companion is always here for you. Would you like to continue
//             your conversation or take a break?
//           </p>

//           <div className="flex flex-col gap-4">
//             <button
//               onClick={handleContinue}
//               className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105"
//             >
//               Continue Conversation <ArrowRight size={18} />
//             </button>

//             <button
//               onClick={handleSignOut}
//               className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-transparent border border-purple-500/50 text-white rounded-lg font-medium transition-all hover:bg-purple-500/10"
//             >
//               Sign Out <LogOut size={18} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Decorative elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 -left-20 w-40 h-40 bg-purple-600/30 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-pink-600/20 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
//       </div>
//     </div>
//   );
// };
