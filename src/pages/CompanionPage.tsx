// import React, { useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   OrbitControls,
//   useGLTF,
//   Float,
//   Text,
//   Environment,
//   Sparkles,
// } from "@react-three/drei";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { LogOut, MessageCircle, Heart, ArrowRight } from "lucide-react";
// import { useAuth } from "../contexts/AuthContext";
// import { Button } from "../components/Button";

// // 3D Robot Model
// function RobotModel({ scale = 2.5 }) {
//   const group = useRef<THREE.Group>(null);

//   // Animate the robot
//   useFrame((state) => {
//     if (group.current) {
//       group.current.rotation.y =
//         Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
//       group.current.position.y =
//         Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
//     }
//   });

//   return (
//     <group ref={group}>
//       {/* Simple robot head made with Three.js primitives */}
//       <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
//         <group scale={scale}>
//           {/* Head */}
//           <mesh position={[0, 0, 0]} castShadow>
//             <boxGeometry args={[1, 1, 1]} />
//             <meshStandardMaterial
//               color="#ffffff"
//               metalness={0.8}
//               roughness={0.2}
//             />
//           </mesh>

//           {/* Eyes */}
//           <mesh position={[-0.25, 0.15, 0.51]} castShadow>
//             <circleGeometry args={[0.15, 32]} />
//             <meshStandardMaterial
//               color="#00a2ff"
//               emissive="#00a2ff"
//               emissiveIntensity={2}
//             />
//           </mesh>
//           <mesh position={[0.25, 0.15, 0.51]} castShadow>
//             <circleGeometry args={[0.15, 32]} />
//             <meshStandardMaterial
//               color="#00a2ff"
//               emissive="#00a2ff"
//               emissiveIntensity={2}
//             />
//           </mesh>

//           {/* Mouth */}
//           <mesh position={[0, -0.2, 0.51]} castShadow>
//             <boxGeometry args={[0.4, 0.1, 0.05]} />
//             <meshStandardMaterial color="#333" />
//           </mesh>

//           {/* Antennas */}
//           <mesh position={[-0.3, 0.6, 0]} castShadow>
//             <cylinderGeometry args={[0.03, 0.03, 0.3, 16]} />
//             <meshStandardMaterial
//               color="#999"
//               metalness={0.8}
//               roughness={0.2}
//             />
//           </mesh>
//           <mesh position={[0.3, 0.6, 0]} castShadow>
//             <cylinderGeometry args={[0.03, 0.03, 0.3, 16]} />
//             <meshStandardMaterial
//               color="#999"
//               metalness={0.8}
//               roughness={0.2}
//             />
//           </mesh>

//           {/* Antenna tips */}
//           <mesh position={[-0.3, 0.75, 0]} castShadow>
//             <sphereGeometry args={[0.05, 16, 16]} />
//             <meshStandardMaterial
//               color="#00a2ff"
//               emissive="#00a2ff"
//               emissiveIntensity={1}
//             />
//           </mesh>
//           <mesh position={[0.3, 0.75, 0]} castShadow>
//             <sphereGeometry args={[0.05, 16, 16]} />
//             <meshStandardMaterial
//               color="#00a2ff"
//               emissive="#00a2ff"
//               emissiveIntensity={1}
//             />
//           </mesh>
//         </group>
//       </Float>

//       {/* Text floating above the robot */}
//       <Text
//         position={[0, 2, 0]}
//         fontSize={0.5}
//         color="#ffffff"
//         anchorX="center"
//         anchorY="middle"
//         font="/fonts/Inter-Bold.woff"
//         maxWidth={4}
//         textAlign="center"
//       >
//         MindWave
//       </Text>
//     </group>
//   );
// }

// // Floating particles in the background
// function Particles() {
//   return (
//     <Sparkles
//       count={200}
//       scale={10}
//       size={2}
//       speed={0.3}
//       color="#8b5cf6"
//       opacity={0.5}
//     />
//   );
// }

// // Main component
// export const CompanionPage: React.FC = () => {
//   const { user, signOut } = useAuth();
//   const navigate = useNavigate();
//   const { scrollY } = useScroll();
//   const y = useTransform(scrollY, [0, 500], [0, -100]);
//   const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);
//   const [isSigningOut, setIsSigningOut] = useState(false);

//   const handleSignOut = async () => {
//     try {
//       setIsSigningOut(true);
//       await signOut();
//       navigate("/");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     } finally {
//       setIsSigningOut(false);
//     }
//   };

//   const handleReturnToChat = () => {
//     navigate("/chat");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
//       {/* 3D Canvas */}
//       <div className="absolute inset-0 z-0">
//         <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
//           <ambientLight intensity={0.5} />
//           <spotLight
//             position={[10, 10, 10]}
//             angle={0.15}
//             penumbra={1}
//             intensity={1}
//             castShadow
//           />
//           <RobotModel />
//           <Particles />
//           <Environment preset="city" />
//           <OrbitControls
//             enableZoom={false}
//             enablePan={false}
//             minPolarAngle={Math.PI / 3}
//             maxPolarAngle={Math.PI / 1.5}
//             rotateSpeed={0.5}
//           />
//         </Canvas>
//       </div>

//       {/* Content overlay */}
//       <motion.div
//         style={{ y, opacity }}
//         className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16"
//       >
//         <div className="max-w-3xl w-full space-y-12 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.8 }}
//           >
//             <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
//               Why Leave So Soon?
//             </h1>

//             <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
//               Your AI companion is waiting to continue your conversation
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.4, duration: 0.8 }}
//             className="bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 max-w-xl mx-auto"
//           >
//             <div className="flex flex-col space-y-4">
//               <div className="flex items-center justify-center space-x-2 mb-4">
//                 <Heart className="w-5 h-5 text-pink-500" />
//                 <span className="text-lg font-medium">
//                   Your companion misses you
//                 </span>
//               </div>

//               <p className="text-gray-300">
//                 MindWave learns from every interaction to provide more
//                 personalized and emotionally intelligent responses.
//               </p>

//               <div className="py-4">
//                 <div className="flex items-center justify-between py-3 border-t border-gray-700/50">
//                   <span className="text-gray-400">Emotional intelligence</span>
//                   <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
//                     <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-5/6"></div>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between py-3 border-t border-gray-700/50">
//                   <span className="text-gray-400">Conversation memory</span>
//                   <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
//                     <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-4/6"></div>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between py-3 border-t border-gray-700/50">
//                   <span className="text-gray-400">Personalization</span>
//                   <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
//                     <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-3/6"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6, duration: 0.8 }}
//             className="flex flex-col md:flex-row items-center justify-center gap-4"
//           >
//             <Button
//               onClick={handleReturnToChat}
//               className="text-lg px-8 py-3 transform hover:scale-105 flex items-center gap-2 min-w-[200px]"
//             >
//               <MessageCircle className="w-5 h-5" />
//               Return to Chat
//               <ArrowRight className="w-5 h-5 ml-1" />
//             </Button>

//             <Button
//               onClick={handleSignOut}
//               variant="outline"
//               className="text-lg px-8 py-3 transform hover:scale-105 flex items-center gap-2 min-w-[200px]"
//               disabled={isSigningOut}
//             >
//               {isSigningOut ? (
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                   className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full"
//                 />
//               ) : (
//                 <LogOut className="w-5 h-5" />
//               )}
//               Sign Out
//             </Button>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Background gradient elements */}
//       <div className="absolute top-1/4 -left-20 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-pink-600/20 rounded-full blur-3xl"></div>
//       <div className="absolute top-3/4 left-1/3 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
//     </div>
//   );
// };
