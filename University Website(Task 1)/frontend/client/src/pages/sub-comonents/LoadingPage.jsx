import { motion } from "framer-motion";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center">
      <div className="flex space-x-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={index}
            className="h-10 w-10 bg-gray-700 rounded-full"
            initial={{ y: 0, opacity: 0.5 }}
            animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingPage;
