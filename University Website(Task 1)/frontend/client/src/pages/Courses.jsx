import { Card } from "@/components/ui/card";
import { clientStore } from "@/store/clientStore";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "./sub-comonents/Footer";
import { motion } from "framer-motion";
import { BookA, BookCopyIcon, Code2, FileCodeIcon, QrCode } from "lucide-react";

const Courses = () => {
      const { courses } = clientStore();
      const icons = [
        <BookA className="size-10 text-gray-950" />,
        <Code2 className="size-10 text-gray-950" />,
        <QrCode className="size-10 text-gray-950" />,
        <FileCodeIcon className="size-10 text-gray-950" />,
        <BookCopyIcon className="size-10 text-gray-950" />,
      ];
      const getIcon = (index) => {
        return icons[index % icons.length];
      };
  return (
    <>
          <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Main content area */}
            <div className="flex-grow flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold uppercase text-gray-900 pt-20">
                Courses
              </h1>
              <div className="grid md:grid-cols-4 grid-cols-3 gap-8 p-6">
                {courses?.map((course, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                    key={course.id}
                  >
                    <Card className="p-5">
                      <Link to={`/singleCourse/${course._id}`} className="flex flex-col items-center justify-center">
                      {getIcon(index + 1)}
                        <h1 className="text-[0.55rem] text-center md:text-start md:text-lg font-bold text-gray-900">
                          {course.title}
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
  )
}

export default Courses