import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { clientStore } from "@/store/clientStore";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const NoticesSlider = () => {
  const { notices } = clientStore();
  return (
    <>
      <div className="relative w-full max-w-4xl mx-auto">
        <Carousel
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {notices?.length > 3
              ? notices?.slice(0, 3).map((notice) => (
                  <CarouselItem key={notice._id}>
                      <Card className={"p-10"}>
                    <Link
                      to={`/singleNotice/${notice._id}`}
                    >
                        <h1 className="text-[0.75rem] text-center md:text-start md:text-lg font-bold text-gray-900 md:underline">
                          {notice.title}
                        </h1>
                        </Link>
                        <Textarea
                          className="w-full h-86 border-none shadow-none p-4 text-gray-600 text-sm hidden md:flex ring-0 focus-visible:ring-0"
                          value={notice.content}
                          readOnly
                        />
                      </Card>
                  </CarouselItem>
                ))
              : notices?.map((notice) => (
                  <CarouselItem key={notice._id}>
                      <Card className={"p-10"}>
                    <Link
                      to={`/singleNotice/${notice._id}`}
                    >
                        <h1 className="text-[0.75rem] text-center md:text-start md:text-lg font-bold text-gray-900 md:underline">
                          {notice.title}
                        </h1>
                        </Link>
                        <Textarea
                          className="w-full h-86 border-none shadow-none p-4 text-gray-600 text-sm hidden md:flex ring-0 focus-visible:ring-0"
                          value={notice.content}
                          readOnly
                        />
                      </Card>
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious
            className={
              "bg-gray-900 text-white cursor-pointer border-2 border-gray-900"
            }
          />
          <CarouselNext
            className={
              "bg-gray-900 text-white cursor-pointer border-2 border-gray-900"
            }
          />
        </Carousel>
        <div className="flex items-center justify-center mt-10">
          <Link to={"/notices"}>
            <Button className={"cursor-pointer"}>View All</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NoticesSlider;
