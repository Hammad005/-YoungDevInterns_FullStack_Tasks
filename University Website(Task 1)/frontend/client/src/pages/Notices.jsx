import { Card } from "@/components/ui/card";
import { clientStore } from "@/store/clientStore";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "./sub-comonents/Footer";
import { motion } from "framer-motion";

const Notices = () => {
  const { notices } = clientStore();
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Main content area */}
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold uppercase text-gray-900 pt-20">
            Notices
          </h1>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-6 p-6">
            {notices?.map((notice) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                key={notice.id}
              >
                <Card className="p-5">
                  <Link to={`/singleNotice/${notice._id}`}>
                    <h1 className="text-[0.55rem] text-center md:text-start md:text-lg font-bold text-gray-900">
                      {notice.title}
                    </h1>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </>
  );
};

export default Notices;
