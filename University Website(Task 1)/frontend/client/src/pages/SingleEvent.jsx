import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { clientStore } from "@/store/clientStore";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "./sub-comonents/Footer";
import { ArrowLeft, Loader2 } from "lucide-react";

const SingleEvent = () => {
  const { id } = useParams();
  const { getSingleEvent, singleEvent, loading } = clientStore();
  useEffect(() => {
    getSingleEvent(id);
  }, [getSingleEvent, id]);

  function convertTo12Hour(time) {
    let [hours, minutes] = time.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM case
    return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
  }
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Main content area */}
        <div className="flex-grow flex flex-col items-center justify-center">
          {/* <h1 className="text-4xl font-bold uppercase text-gray-900 pt-20">
            Notices
          </h1> */}
          <div className="flex flex-col gap-6 p-2 pt-20">
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="size-18 animate-spin" />
              </div>
            ) : !singleEvent ? (
              <div className="flex items-center justify-center text-2xl font-bold text-gray-900">
                No events found!
              </div>
            ) : (
              <Card className={"h-fit w-full max-w-full"}>
                <CardHeader className="text-center">
                  <Link to="/events">
                    <ArrowLeft className="size-5 text-gray-900" />
                  </Link>
                  <CardTitle className="text-xl">Event</CardTitle>
                  <CardDescription>Event Information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-2">
                    <span className="text-gray-700 font-bold text-2xl">
                      {singleEvent?.name}
                    </span>
                  </div>
                  <div className="p-4 mt-5 bg-transparent bg-opacity-50">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Event Description:
                    </h3>
                    <div className="flex flex-row items-center justify-between">
                      <Textarea
                        className="text-gray-700 p-0 font-normal first-letter:uppercase border-0 ring-0 focus-visible:ring-0"
                        value={singleEvent?.description}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="p-4 mt-5 bg-transparent bg-opacity-50 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 ">
                        Event Date:
                      </h3>
                      <div className="flex flex-row items-center justify-between">
                        <span className="text-gray-700 font-normal">
                          {singleEvent?.date}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 ">
                        Event Time:
                      </h3>
                      <div className="flex flex-row items-center justify-between">
                        <span className="text-gray-700 font-normal">
                          {convertTo12Hour(singleEvent?.time)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 ">
                        Event Location:
                      </h3>
                      <div className="flex flex-row items-center justify-between">
                        <span className="text-gray-700 font-normal">
                          {singleEvent?.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </>
  );
};

export default SingleEvent;
