import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { eventStore } from "@/store/eventStore";
import { userStore } from "@/store/userStore";
import { CalendarDays, LucideMenuSquare } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const { events } = eventStore();
  const { user } = userStore();
  const navigateTo = useNavigate();
  const [viewAll, setViewAll] = useState(false);
  return (
    <>
      <div className="p-6">
        <Card className="p-4">
          <CardContent>
            <div className="flex items-center justify-between">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Events:
              </h3>
              <p className=" text-gray-700 font-semibold text-[0.75rem] mb-2">
                (Total Events: {events?.length})
              </p>
            </div>
            {user?.role === "admin" && (
                  <Button
                    className={"cursor-pointer"}
                    onClick={() => navigateTo("/addEvent")}
                  >
                    <CalendarDays />
                    Add Event
                  </Button>
                )}
            </div>
            <Table className="w-full">
              <TableHeader>
                <TableRow className={"hover:bg-transparent"}>
                  <TableHead>Name</TableHead>
                  <TableHead className={"hidden md:table-cell"}>
                    Description
                  </TableHead>
                  <TableHead className={"hidden md:table-cell"}>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events?.length === 0 ? (
                  <TableRow className={"hover:bg-transparent"}>
                    <TableCell
                      colSpan={5}
                      className="text-center text-2xl font-bold text-gray-900"
                    >
                      No events found!
                    </TableCell>
                  </TableRow>
                ) : !viewAll ? (
                  events?.slice(0, 5).map((event) => (
                    <TableRow
                      key={event._id}
                      className={"hover:bg-transparent"}
                    >
                      <TableCell>
                        {event.name?.length > 21
                          ? event.name.slice(0, 21) + "..."
                          : event.name}
                      </TableCell>
                      <TableCell className={"hidden md:table-cell"}>
                        {event.description?.length > 100
                          ? event.description.slice(0, 100) + "..."
                          : event.description}
                      </TableCell>
                      <TableCell className={"hidden md:table-cell"}>{event.date}</TableCell>
                      <TableCell>
                        <Button
                          className={"cursor-pointer"}
                          onClick={() =>
                            navigateTo(`/viewEvent/${event._id}`)
                          }
                        >
                          <LucideMenuSquare />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  events?.map((event) => (
                    <TableRow
                      key={event._id}
                      className={"hover:bg-transparent"}
                    >
                      <TableCell>
                        {event.name}
                      </TableCell>
                      <TableCell className={"hidden md:table-cell"}>
                        {event.description?.length > 100
                          ? event.description.slice(0, 100) + "..."
                          : event.description}
                      </TableCell>
                      <TableCell>{event.time}</TableCell>
                      <TableCell className={"hidden md:table-cell"}>
                        {event.locaiton}
                      </TableCell>
                      <TableCell>
                        <Button
                          className={"cursor-pointer"}
                          onClick={() =>
                            navigateTo(`/viewEvent/${event._id}`)
                          }
                        >
                          <LucideMenuSquare />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
                <TableCell
                  colSpan={4}
                  className="text-center text-2xl font-bold text-gray-900"
                >
                  {events?.length > 5 && (
                    <Button
                      className={"cursor-pointer w-full"}
                      onClick={() => setViewAll(!viewAll)}
                    >
                      {viewAll ? "View Less" : "View All"}
                    </Button>
                  )}
                </TableCell>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Events;
