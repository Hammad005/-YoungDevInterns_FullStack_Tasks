import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import { clientStore } from "@/store/clientStore";
import { BookA, BookCopyIcon, Code2, FileCodeIcon, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CoursesSlider = () => {
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
      <div className="relative w-full max-w-4xl mx-auto">
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent>
            {courses?.slice(0, 5).map((course, index) => (
              <CarouselItem
                className="basis-full md:basis-1/2 lg:basis-1/3"
                key={course._id}
              >
                <Link to={`/singleCourse/${course._id}`} className={'hover:underline'}>
                <Card >
                  <CardContent>
                    <div className="flex items-center justify-between">
                      {getIcon(index + 1)}
                      <p className="text-gray-900 font-bold text-xl ">
                        {course.title}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                </Link>
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
        <Link to={'/courses'}>
        <Button className={'cursor-pointer'}>View All</Button>
        </Link>
        </div>
      </div>
    </>
  );
};

export default CoursesSlider;
