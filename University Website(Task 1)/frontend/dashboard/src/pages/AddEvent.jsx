import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CalendarDays, LoaderPinwheel } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { eventStore } from "@/store/eventStore";

const AddEvent = () => {
  const { loading, addEvent } = eventStore();
  const [data, setData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(data);
    setData({
      name: "",
      description: "",
      date: "",
      time: "",
      location: "",
    });
  };
  return (
    <>
      <div className="min-h-svh grid place-items-center bg-muted p-6 md:p-10">
            <Card className={"h-fit w-full max-w-full"}>
              <CardHeader className="text-center">
                <Link to="/">
                  <ArrowLeft className="size-5 text-gray-900" />
                </Link>
                <CardTitle className="text-xl">Event</CardTitle>
                <CardDescription>
                  Only admins can add any type of event.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6">
                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Event Name</Label>
                        <Input
                          id="name"
                          type="text"
                          value={data.name}
                          onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                          }
                          placeholder="Sports Gala"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Event Description</Label>
                        <Textarea
                          id="content"
                          value={data.description}
                          onChange={(e) =>
                            setData({ ...data, description: e.target.value })
                          }
                          placeholder="Event Description..."
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Event Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={data.date}
                          onChange={(e) =>
                            setData({ ...data, date: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Event Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={data.time}
                          onChange={(e) =>
                            setData({ ...data, time: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Event Location</Label>
                        <Textarea
                          id="location"
                          value={data.location}
                          onChange={(e) =>
                            setData({ ...data, location: e.target.value })
                          }
                          placeholder="Karachi, pakistan"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full cursor-pointer"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <LoaderPinwheel className="h-5 w-5 animate-spin" />
                            {"Loading..."}
                          </>
                        ) : (
                          <>
                            <CalendarDays className="h-5 w-5" />
                            {"Add Event"}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
      </div>
    </>
  );
};

export default AddEvent;
