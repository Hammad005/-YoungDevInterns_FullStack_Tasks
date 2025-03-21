import { Card } from "@/components/ui/card";
import { clientStore } from "@/store/clientStore";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "./sub-comonents/Footer";
import { motion } from "framer-motion";

const Events = () => {
    const { events } = clientStore();
    return (
      <>
        <div className="flex flex-col min-h-screen bg-gray-50">
          {/* Main content area */}
          <div className="flex-grow flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold uppercase text-gray-900 pt-20">
              Events
            </h1>
            <div className="flex flex-col w-full md:w-fit gap-6 p-6">
              {events?.map((event) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9 }}
                  key={event.id}
                >
                  <Card className="p-5">
                    <Link to={`/singleEvent/${event._id}`}>
                      <h1 className="text-[0.7rem] text-center md:text-start md:text-lg font-bold text-gray-900">
                        {event.name}
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
}

export default Events