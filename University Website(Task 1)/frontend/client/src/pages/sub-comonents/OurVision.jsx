import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";

const OurVision = () => {
  return (
    <>
      <div className="flex items-center justify-center flex-col mt-10">
        <h1 className="text-4xl font-bold uppercase text-gray-900 mb-10">
          Our Vision
        </h1>
        <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        >
        <Card className={'p-5'}>
            <div className="flex items-center justify-between flex-col md:flex-row">
                <img src="/OurVision.png" alt="OurVision" className="size-100" />
                <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Empowering your future with technology education.</h1>
                <p className="text-gray-900 mb-10">We have helped build the careers of 68 lakh professionals in 40 countries.</p>
                <p className="text-gray-900 mb-10">Our University prepares students to be a part of this growing industry through its courses and various placement assistance activities.</p>
                </div>
            </div>
        </Card>
        </motion.div>
      </div>
    </>
  );
};

export default OurVision;
