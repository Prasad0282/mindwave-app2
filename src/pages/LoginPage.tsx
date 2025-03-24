// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Github, Mail } from "lucide-react";
// import { motion } from "framer-motion";
// import { useAuth } from "../contexts/AuthContext";
// import Mindwave from "../MindWave.png";

// export const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [error, setError] = useState("");
//   const { signIn, signUp, signInWithProvider } = useAuth();
//   const navigate = useNavigate();

//   const validateEmail = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters long");
//       return;
//     }

//     try {
//       if (isSignUp) {
//         await signUp(email, password);
//       } else {
//         await signIn(email, password);
//       }
//       navigate("/chat");
//     } catch (err) {
//       if (err instanceof Error) {
//         if (err.message.includes("email_address_invalid")) {
//           setError("Please enter a valid email address");
//         } else if (err.message.includes("invalid_credentials")) {
//           setError("Invalid email or password");
//         } else {
//           setError(err.message);
//         }
//       } else {
//         setError("An error occurred. Please try again.");
//       }
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 flex items-center justify-center px-4"
//     >
//       <div className="max-w-md w-full space-y-8 bg-gray-800/80 backdrop-blur-lg p-8 rounded-xl shadow-2xl">
//         <motion.div
//           initial={{ y: -20 }}
//           animate={{ y: 0 }}
//           className="flex flex-col items-center"
//         >
//           <img src={Mindwave} alt="Mindwave Logo" className="w-12 h-12" />
//           <h2 className="mt-6 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
//             {isSignUp ? "Create an account" : "Welcome back"}
//           </h2>
//         </motion.div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm"
//             >
//               {error}
//             </motion.div>
//           )}

//           <div className="space-y-4">
//             <div>
//               <label
//                 htmlFor="email"
//                 className="text-sm font-medium text-gray-300"
//               >
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 required
//                 className="appearance-none rounded-lg relative block w-full px-3 py-2 mt-1 border border-gray-700 bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="text-sm font-medium text-gray-300"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-lg relative block w-full px-3 py-2 mt-1 border border-gray-700 bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 minLength={6}
//               />
//             </div>
//           </div>

//           <div className="space-y-4">
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
//             >
//               {isSignUp ? "Sign up" : "Sign in"}
//             </button>

//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-700"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-gray-800 text-gray-400">
//                   Or continue with
//                 </span>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 onClick={() => signInWithProvider("github")}
//                 className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-sm font-medium text-white transition-colors"
//               >
//                 <Github className="h-5 w-5" />
//               </button>
//               <button
//                 type="button"
//                 onClick={() => signInWithProvider("google")}
//                 className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-sm font-medium text-white transition-colors"
//               >
//                 <Mail className="h-5 w-5" />
//               </button>
//             </div>
//           </div>

//           <div className="text-center">
//             <button
//               type="button"
//               className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
//               onClick={() => setIsSignUp(!isSignUp)}
//             >
//               {isSignUp
//                 ? "Already have an account? Sign in"
//                 : "Don't have an account? Sign up"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </motion.div>
//   );
// };
import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom"; // Still needed for back navigation

// Define the props interface
interface LoginPageProps {
  onAuthSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, signInWithProvider } = useAuth();
  const navigate = useNavigate();

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, -50]);
  const backgroundOpacity = useTransform(scrollY, [0, 300], [1, 0.5]);
  const formScale = useTransform(scrollY, [0, 300], [1, 0.98]);
  const formY = useTransform(scrollY, [0, 300], [0, 20]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      // Replace navigation with onAuthSuccess callback
      onAuthSuccess();
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("email_address_invalid")) {
          setError("Please enter a valid email address");
        } else if (err.message.includes("invalid_credentials")) {
          setError("Invalid email or password");
        } else {
          setError(err.message);
        }
      } else {
        setError("An error occurred. Please try again.");
      }
      setIsLoading(false);
    }
  };

  // Animation variants remain unchanged
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
      <motion.div
        style={{ y: backgroundY, opacity: backgroundOpacity }}
        className="absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,50,255,0.15),transparent_70%)]"></div>
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
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
        {/* Rest of the background animations unchanged */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-500 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#9333EA" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            {[...Array(20)].map((_, i) => (
              <motion.line
                key={i}
                x1={`${Math.random() * 100}%`}
                y1={`${Math.random() * 100}%`}
                x2={`${Math.random() * 100}%`}
                y2={`${Math.random() * 100}%`}
                stroke="url(#lineGradient)"
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 5 + Math.random() * 7,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </svg>
        </div>
        <motion.div
          className="absolute top-1/4 -left-20 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-60 h-60 bg-pink-600/20 rounded-full blur-3xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-2/3 left-1/4 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>

      <motion.div
        style={{ scale: formScale, y: formY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full space-y-8 bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700/50 relative z-10"
      >
        <motion.button
          variants={itemVariants}
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-300" />
        </motion.button>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1.5,
            }}
            className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-purple-600/20 relative"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-pink-500 rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                    x: `calc(${Math.cos(
                      i * ((Math.PI * 2) / 3)
                    )} * 30px - 50%)`,
                    y: `calc(${Math.sin(
                      i * ((Math.PI * 2) / 3)
                    )} * 30px - 50%)`,
                  }}
                />
              ))}
            </motion.div>
            <div className="text-white text-2xl font-bold relative z-10">
              MW
            </div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mt-4 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
          >
            {isSignUp ? "Create an account" : "Welcome back"}
          </motion.h2>

          <motion.p variants={itemVariants} className="mt-2 text-gray-400">
            {isSignUp
              ? "Join MindWave and experience emotional AI"
              : "Sign in to continue your journey with MindWave"}
          </motion.p>
        </motion.div>

        <motion.form
          variants={itemVariants}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-5">
            <motion.div variants={itemVariants}>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  type="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-700 bg-gray-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 mt-1 border border-gray-700 bg-gray-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
              />
            </motion.div>
          </div>

          <div className="space-y-5">
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-70"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : isSignUp ? (
                "Create account"
              ) : (
                "Sign in"
              )}
            </motion.button>

            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800/60 text-gray-400">
                  Or continue with
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-3"
            >
              <button
                type="button"
                onClick={() => signInWithProvider("github")}
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-700 rounded-lg bg-gray-700/30 hover:bg-gray-700 text-sm font-medium text-white transition-colors"
              >
                <Github className="h-5 w-5 mr-2" />
                <span>GitHub</span>
              </button>
              <button
                type="button"
                onClick={() => signInWithProvider("google")}
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-700 rounded-lg bg-gray-700/30 hover:bg-gray-700 text-sm font-medium text-white transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                <span>Google</span>
              </button>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="text-center">
            <button
              type="button"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};
