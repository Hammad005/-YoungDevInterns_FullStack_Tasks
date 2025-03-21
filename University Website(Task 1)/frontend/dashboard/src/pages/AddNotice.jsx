import React, {  useState } from "react";
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
import { ArrowLeft, LoaderPinwheel, LucideGanttChartSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { noticeStore } from "@/store/noticeStore";
import { Link } from "react-router-dom";

const AddNotice = () => {
    const {loading, addNotice} = noticeStore();
  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNotice(data);
    setData({ title: "", content: ""});
  };
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className={"flex flex-col gap-6"}>
            <Card className={"h-fit justify-center"}>
              <CardHeader className="text-center">
              <Link to="/">
                    <ArrowLeft className="size-5 text-gray-900" />
                  </Link>
                <CardTitle className="text-xl">Notices</CardTitle>
                <CardDescription>
                  Share important updates with students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6">
                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Title</Label>
                        <Input
                          id="title"
                          type="text"
                          value={data.title}
                          onChange={(e) =>
                            setData({ ...data, title: e.target.value })
                          }
                          placeholder="University Notice"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Content</Label>
                        <Textarea
                          id="content"
                          value={data.content}
                          onChange={(e) =>
                            setData({ ...data, content: e.target.value })
                          }
                          placeholder="Notice"
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
                            <LucideGanttChartSquare className="h-5 w-5" />
                            {"Add Notice"}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNotice;
