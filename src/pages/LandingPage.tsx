// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Brain, Zap, RefreshCw } from "lucide-react";
// import { Button } from "../components/Button";

// export const LandingPage: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
//       <div className="container mx-auto px-4 py-16">
//         <div className="flex flex-col items-center text-center animate-fade-in">
//           <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mb-8">
//             <Brain className="w-12 h-12" />
//           </div>
//           <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
//             MindWave
//           </h1>
//           <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl">
//             Experience the next generation of emotional intelligence in
//             conversation
//           </p>

//           <Button
//             onClick={() => navigate("/login")}
//             className="text-lg px-8 py-3 mb-16 transform hover:scale-105"
//           >
//             Get Started
//           </Button>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
//             <FeatureCard
//               icon={<Brain className="w-8 h-8" />}
//               title="Smart Responses"
//               description="Intelligent and context-aware conversations"
//             />
//             <FeatureCard
//               icon={<Zap className="w-8 h-8" />}
//               title="Fast & Reliable"
//               description="Quick responses with high accuracy"
//             />
//             <FeatureCard
//               icon={<RefreshCw className="w-8 h-8" />}
//               title="Always Learning"
//               description="Continuously improving interactions"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const FeatureCard: React.FC<{
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }> = ({ icon, title, description }) => (
//   <div className="bg-gray-800 p-6 rounded-xl transform hover:scale-105 transition-all duration-300">
//     <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//       {icon}
//     </div>
//     <h3 className="text-xl font-semibold mb-2">{title}</h3>
//     <p className="text-gray-400">{description}</p>
//   </div>
// );

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Brain, Zap, RefreshCw, ChevronDown } from "lucide-react";
// import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { Button } from "../components/Button";

// export const LandingPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { scrollY } = useScroll();
//   const y = useTransform(scrollY, [0, 300], [0, -100]);
//   const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

//   // Scroll indicator animation
//   const scrollIndicatorControls = useAnimation();

//   useEffect(() => {
//     const animateScrollIndicator = async () => {
//       while (true) {
//         await scrollIndicatorControls.start({
//           y: [0, 10, 0],
//           transition: { duration: 2, repeat: Infinity },
//         });
//       }
//     };

//     animateScrollIndicator();
//   }, [scrollIndicatorControls]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
//       {/* Hero Section with Parallax */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         <motion.div
//           style={{ y, opacity }}
//           className="container mx-auto px-4 py-16 relative z-10"
//         >
//           <div className="flex flex-col items-center text-center">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1, rotate: 360 }}
//               transition={{
//                 type: "spring",
//                 stiffness: 260,
//                 damping: 20,
//                 duration: 1.5,
//               }}
//               className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mb-8 relative"
//             >
//               <div className="absolute inset-0 rounded-full bg-purple-500 opacity-50 blur-xl"></div>
//               <Brain className="w-12 h-12 relative z-10" />

//               {/* Orbiting particles */}
//               <motion.div
//                 animate={{
//                   rotate: 360,
//                 }}
//                 transition={{
//                   duration: 8,
//                   repeat: Infinity,
//                   ease: "linear",
//                 }}
//                 className="absolute inset-0"
//               >
//                 {[...Array(3)].map((_, i) => (
//                   <motion.div
//                     key={i}
//                     className="absolute w-3 h-3 bg-pink-500 rounded-full"
//                     style={{
//                       top: "50%",
//                       left: "50%",
//                       x: `calc(${Math.cos(
//                         i * ((Math.PI * 2) / 3)
//                       )} * 60px - 50%)`,
//                       y: `calc(${Math.sin(
//                         i * ((Math.PI * 2) / 3)
//                       )} * 60px - 50%)`,
//                     }}
//                   />
//                 ))}
//               </motion.div>
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.8 }}
//               className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
//             >
//               MindWave
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.8 }}
//               className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl"
//             >
//               Experience the next generation of emotional intelligence in
//               conversation
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.6, duration: 0.8 }}
//             >
//               <Button
//                 onClick={() => navigate("/login")}
//                 className="text-lg px-10 py-4 mb-16 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
//               >
//                 Get Started
//               </Button>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Floating 3D grid background */}
//         <div className="absolute inset-0 z-0">
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,50,255,0.15),transparent_70%)]"></div>
//           <svg
//             className="absolute inset-0 w-full h-full opacity-30"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <defs>
//               <pattern
//                 id="grid"
//                 width="40"
//                 height="40"
//                 patternUnits="userSpaceOnUse"
//               >
//                 <path
//                   d="M 40 0 L 0 0 0 40"
//                   fill="none"
//                   stroke="rgba(120, 50, 255, 0.3)"
//                   strokeWidth="0.5"
//                 />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#grid)" />
//           </svg>
//         </div>

//         {/* Scroll indicator - centered */}
//         <motion.div
//           animate={scrollIndicatorControls}
//           className="absolute bottom-10 left-0 right-0 mx-auto w-full text-center text-white/70 flex flex-col items-center justify-center"
//         >
//           <span className="text-sm mb-2">Scroll to explore</span>
//           <ChevronDown className="w-6 h-6 mx-auto" />
//         </motion.div>
//       </section>

//       {/* Features Section with Staggered Animation */}
//       <FeatureSection />
//     </div>
//   );
// };

// const FeatureSection: React.FC = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const features = [
//     {
//       icon: <Brain className="w-8 h-8" />,
//       title: "Smart Responses",
//       description: "Intelligent and context-aware conversations",
//     },
//     {
//       icon: <Zap className="w-8 h-8" />,
//       title: "Fast & Reliable",
//       description: "Quick responses with high accuracy",
//     },
//     {
//       icon: <RefreshCw className="w-8 h-8" />,
//       title: "Always Learning",
//       description: "Continuously improving interactions",
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   return (
//     <section className="py-24 relative overflow-hidden">
//       <div className="container mx-auto px-4">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
//         >
//           Discover the Power of Emotional AI
//         </motion.h2>

//         <motion.div
//           ref={ref}
//           variants={containerVariants}
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//           className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
//         >
//           {features.map((feature, index) => (
//             <FeatureCard
//               key={index}
//               icon={feature.icon}
//               title={feature.title}
//               description={feature.description}
//               index={index}
//             />
//           ))}
//         </motion.div>
//       </div>

//       {/* Background elements */}
//       <div className="absolute top-1/4 -left-20 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-pink-600/20 rounded-full blur-3xl"></div>
//     </section>
//   );
// };

// const FeatureCard: React.FC<{
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   index: number;
// }> = ({ icon, title, description, index }) => {
//   const variants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         type: "spring",
//         stiffness: 100,
//       },
//     },
//   };

//   return (
//     <motion.div
//       variants={variants}
//       whileHover={{
//         scale: 1.05,
//         boxShadow:
//           "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//       }}
//       className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 relative overflow-hidden group"
//     >
//       {/* Glow effect on hover */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//       <div className="relative z-10">
//         <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-600/20">
//           {icon}
//         </div>
//         <h3 className="text-2xl font-semibold mb-3">{title}</h3>
//         <p className="text-gray-400 text-lg">{description}</p>
//       </div>

//       {/* Decorative corner */}
//       <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 opacity-30 rounded-tl-xl"></div>
//     </motion.div>
//   );
// };

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Zap, RefreshCw, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "../components/Button";

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Scroll indicator animation
  const scrollIndicatorControls = useAnimation();

  useEffect(() => {
    const animateScrollIndicator = async () => {
      while (true) {
        await scrollIndicatorControls.start({
          y: [0, 10, 0],
          transition: { duration: 2, repeat: Infinity },
        });
      }
    };

    animateScrollIndicator();
  }, [scrollIndicatorControls]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* AI Robot Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop')",
              backgroundBlendMode: "overlay",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-purple-900/50 to-gray-900/90"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,50,255,0.25),transparent_70%)]"></div>
        </div>

        <motion.div
          style={{ y, opacity }}
          className="container mx-auto px-4 py-16 relative z-10"
        >
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 1.5,
              }}
              className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mb-8 relative"
            >
              <div className="absolute inset-0 rounded-full bg-purple-500 opacity-50 blur-xl"></div>
              <Brain className="w-12 h-12 relative z-10" />

              {/* Orbiting particles */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-pink-500 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      x: `calc(${Math.cos(
                        i * ((Math.PI * 2) / 3)
                      )} * 60px - 50%)`,
                      y: `calc(${Math.sin(
                        i * ((Math.PI * 2) / 3)
                      )} * 60px - 50%)`,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            >
              MindWave
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl"
            >
              Experience the next generation of emotional intelligence in
              conversation
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button
                onClick={onStart}
                className="text-lg px-10 py-4 mb-16 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating 3D grid background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,50,255,0.15),transparent_70%)]"></div>
          <svg
            className="absolute inset-0 w-full h-full opacity-30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(120, 50, 255, 0.3)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-500 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: Math.random() * 0.5 + 0.3,
                scale: Math.random() * 2 + 1,
              }}
              animate={{
                y: [null, Math.random() * -100 - 50],
                opacity: [null, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Scroll indicator - centered */}
        <motion.div
          animate={scrollIndicatorControls}
          className="absolute bottom-10 left-0 right-0 mx-auto w-full text-center text-white/70 flex flex-col items-center justify-center"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="w-6 h-6 mx-auto" />
        </motion.div>
      </section>

      {/* Features Section with Staggered Animation */}
      <FeatureSection />
    </div>
  );
};

const FeatureSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Smart Responses",
      description: "Intelligent and context-aware conversations",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast & Reliable",
      description: "Quick responses with high accuracy",
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Always Learning",
      description: "Continuously improving interactions",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Discover the Power of Emotional AI
        </motion.h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-pink-600/20 rounded-full blur-3xl"></div>
    </section>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}> = ({ icon, title, description, index }) => {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      whileHover={{
        scale: 1.05,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 relative overflow-hidden group"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10">
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-600/20">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-400 text-lg">{description}</p>
      </div>

      {/* Decorative corner */}
      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 opacity-30 rounded-tl-xl"></div>
    </motion.div>
  );
};
