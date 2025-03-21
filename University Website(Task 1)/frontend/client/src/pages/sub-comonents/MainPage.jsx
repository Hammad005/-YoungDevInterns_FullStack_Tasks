import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { University } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CoursesSlider from "./CoursesSlider";
import OurVision from "./OurVision";
import NoticesSlider from "./NoticesSlider";
import Footer from "./Footer";

const MainPage = () => {
  return (
    <div className="w-full min-h-svh relative bg-gray-50">
      <div className="flex items-center justify-center">
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2500,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent className="p-0 m-0">
            <CarouselItem className="p-0 m-0">
              <div className="relative">
                <img
                  src={"/1.jpg"}
                  alt="1"
                  className="h-screen w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 gap-2">
                  <span className="flex size-10 items-center justify-center rounded-md bg-white text-gray-900">
                    <University />
                  </span>
                  <h1 className="text-white text-2xl md:text-4xl font-bold">
                    Welcome to Our University
                  </h1>
                  <p className="text-gray-300 text-center px-2">
                    A place of knowledge, innovation, and excellence. Explore
                    opportunities, engage in discovery, and shape your future
                    with us. 🚀
                  </p>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem className="p-0 m-0">
              <div className="relative">
                <img
                  src={"/2.jpg"}
                  alt="2"
                  className="h-screen w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65">
                  <h1 className="text-white text-2xl md:text-4xl font-bold">
                    Explore Our Advance Courses
                  </h1>
                  <p className="text-gray-300 text-center px-2">
                    Enhance your skills with our cutting-edge courses designed
                    for future leaders and innovators. Learn from experts, gain
                    hands-on experience, and stay ahead in your field. 🚀
                  </p>
                  <Link to={"/courses"}>
                    <Button
                      className={
                        "mt-2 cursor-pointer bg-white text-gray-900 hover:bg-gray-200 font-semibold"
                      }
                    >
                      View Courses
                    </Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem className="p-0 m-0">
              <div className="relative">
                <img
                  src={"/3.jpg"}
                  alt="3"
                  className="h-screen w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65">
                  <h1 className="text-white text-2xl md:text-4xl font-bold">
                    Join Our Community
                  </h1>
                  <p className="text-gray-300 text-center px-2">
                    Be part of a vibrant and diverse community where learning,
                    collaboration, and growth thrive. Connect with like-minded
                    peers, engage in enriching experiences, and build a future
                    of success. 🚀
                  </p>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex flex-col items-center justify-center p-2 md:p-10">
        <OurVision/>
      </div>
      <div className="flex flex-col items-center justify-center p-20 pt-0 mt-10">
        <div className="flex mb-10 ">
          <span className="flex absolute pb-15  text-md font-bold text-red-900 animate-pulse -rotate-45">
            New
          </span>
          <h1 className="text-4xl font-bold uppercase text-gray-900 pt-4">
            Courses
          </h1>
        </div>
        <CoursesSlider />

        <div className="flex mb-10 mt-20">
        <span className="flex absolute text-md font-bold text-red-900 ">
            Recent
          </span>
          <h1 className="text-4xl font-bold uppercase text-gray-900 pt-4">
            Notices
          </h1>
        </div>
        <NoticesSlider />
      </div>
      <div className="hidden md:flex">
    <Footer/>
      </div>
    </div>
  );
};

export default MainPage;
