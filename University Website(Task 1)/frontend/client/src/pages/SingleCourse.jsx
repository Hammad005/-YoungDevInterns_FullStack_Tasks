import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { clientStore } from "@/store/clientStore";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect } from "react";
import {  Link, useParams } from "react-router-dom";
import Footer from "./sub-comonents/Footer";
const SingleCourse = () => {
    const { singleCourse, getSingleCourse, loading } = clientStore();
    const { id } = useParams();
    useEffect(() => {
      getSingleCourse(id);
    }, [getSingleCourse, id]);
  return (
    <>
    <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className={"flex flex-col gap-6 "}>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="size-18 animate-spin"/>
            </div>
          ) :
          !singleCourse ? (
            <div className="flex items-center justify-center text-2xl font-bold text-gray-900">
            No Course found!
            </div>
          ) :
            <Card className={"h-full w-sm justify-center "}>
            <CardHeader className="text-center">
            <Link to="/courses">
                    <ArrowLeft className="size-5 text-gray-900" />
                  </Link>
              <CardTitle className="text-xl">Course</CardTitle>
              <CardDescription>Course Information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-b-gray-900 pb-6 border-x-0 border-t-0">
                <div className="flex flex-row items-center justify-between">
                  <p className="text-gray-900 font-semibold">Title:</p>
                  <span className="text-gray-700 font-normal">
                    {singleCourse?.title}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <p className="text-gray-900 font-semibold">Faculty:</p>
                  <span className="text-gray-700 font-normal">
                    {singleCourse?.faculty}
                  </span>
                </div>
                <div className="text-gray-700">
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-gray-900 font-semibold">Added At:</p>
                    {new Date(singleCourse?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-5 bg-transparent bg-opacity-50 rounded-lg ">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                Description:
                </h3>
                <div className="flex flex-row items-center justify-between">
                  <Textarea
                        className="text-gray-700 p-0 w-full h-full font-normal first-letter:uppercase border-0 ring-0 focus-visible:ring-0"
                        value={singleCourse?.description}
                        readOnly
                      />
                </div>
              </div>
            </CardContent>
          </Card>}
        </div>
      </div>
      <Footer />
    </div>
    </>
  )
}

export default SingleCourse