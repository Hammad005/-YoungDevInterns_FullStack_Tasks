import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { eventStore } from "@/store/eventStore";
import { userStore } from "@/store/userStore";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewEvent = () => {
  const { getSingleEvent, event, loading, success, deleteEvent } = eventStore();
  const {user} = userStore()
  const { id } = useParams();
  const navigateTo = useNavigate();
  useEffect(() => {
    getSingleEvent(id);
  }, [getSingleEvent, id, deleteEvent]);

  const handleDelete = async () => {
    await deleteEvent(event._id);
  };
  if (success) {
    return navigateTo("/");
  }
  function convertTo12Hour(time) {
    let [hours, minutes] = time.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM case
    return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
  }
  return (
    <>
      <div className="min-h-svh grid place-items-center bg-muted p-6 md:p-10">
        {loading ? (
          <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="size-18 animate-spin" />
          </div>
        ) : !event ? (
          <div className="flex items-center justify-center text-2xl font-bold text-gray-900">
            No event found!
          </div>
        ) : (
          <Card className={"h-fit w-full max-w-full"}>
            <CardHeader className="text-center">
              <Link to="/">
                <ArrowLeft className="size-5 text-gray-900" />
              </Link>
              <CardTitle className="text-xl">Event</CardTitle>
              <CardDescription>Event Information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-2">
                <span className="text-gray-700 font-bold text-2xl">
                  {event?.name}
                </span>
              </div>
              <div className="p-4 mt-5 bg-transparent bg-opacity-50 rounded-lg border border-gray-900">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Event Description:
                </h3>
                <div className="flex flex-row items-center justify-between">
                  <Textarea
                    className="text-gray-700 p-0 font-normal first-letter:uppercase border-0 ring-0 focus-visible:ring-0"
                    value={event?.description}
                    readOnly
                  />
                </div>
              </div>
              <div className="p-4 mt-5 bg-transparent bg-opacity-50 rounded-lg border border-gray-900 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 ">
                    Event Date:
                  </h3>
                  <div className="flex flex-row items-center justify-between">
                    <span className="text-gray-700 font-normal">
                      {event?.date}
                    </span>
                  </div>
                </div>
                <div>
                <h3 className="text-xl font-bold text-gray-900 ">
                    Event Time:
                  </h3>
                  <div className="flex flex-row items-center justify-between">
                    <span className="text-gray-700 font-normal">
                      {convertTo12Hour(event?.time)}
                    </span>
                  </div>
                </div>
                <div>
                <h3 className="text-xl font-bold text-gray-900 ">
                    Event Location:
                  </h3>
                  <div className="flex flex-row items-center justify-between">
                    <span className="text-gray-700 font-normal">
                      {event?.location}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            {user?.role === "admin" &&<CardFooter className={"flex justify-center lg:justify-end"}>
              <Button onClick={handleDelete} className="w-full lg:w-[10%] cursor-pointer">
                Delete
              </Button>
            </CardFooter>}
          </Card>
        )}
      </div>
    </>
  );
};

export default ViewEvent;
