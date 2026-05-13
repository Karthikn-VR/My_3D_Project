import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onStarted?: () => void;
}

export function LoadingScreen({ onStarted }: LoadingScreenProps) {
  const { progress, active } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      // Add a slight delay before hiding the loading screen
      const timer = setTimeout(() => {
        setShow(false);
        // Notify that the app can start (button can appear)
        if (onStarted) onStarted();
      }, 2700);
      return () => clearTimeout(timer);
    }
  }, [active, progress, onStarted]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#050505",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            color: "white",
            fontFamily: "Inter, system-ui, sans-serif",
            padding: "0 20px",
            boxSizing: "border-box",
          }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ 
              textAlign: "center",
              width: "100%",
              maxWidth: "400px"
            }}
          >
            <h1
              style={{
                fontSize: "clamp(0.9rem, 4vw, 1.2rem)",
                fontWeight: 300,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "2rem",
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: 1.6,
              }}
            >
              welcome to karthikeyan vr 3d project
            </h1>

            <div
              style={{
                width: "100%",
                maxWidth: "200px",
                height: "2px",
                background: "rgba(255, 255, 255, 0.1)",
                margin: "0 auto",
                position: "relative",
                overflow: "hidden",
                borderRadius: "4px",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  background: "white",
                  width: `${progress}%`,
                }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              />
            </div>

            <motion.p
              style={{
                marginTop: "1rem",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                color: "rgba(255, 255, 255, 0.4)",
                textTransform: "uppercase",
              }}
            >
              Loading {Math.round(progress)}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
