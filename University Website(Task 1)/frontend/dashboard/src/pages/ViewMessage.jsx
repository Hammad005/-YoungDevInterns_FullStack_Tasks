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
import { messageStore } from "@/store/messageStore";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect } from "react";
import {  Link, useNavigate, useParams } from "react-router-dom";

const ViewMessage = () => {
  const { singleMessage, getSingleMessage, loading, deleteMessage, success } = messageStore();
  const { id } = useParams();
  const navigateTo = useNavigate();
  useEffect(() => {
    getSingleMessage(id);
  }, [getSingleMessage, id, deleteMessage]);

  const handleDelete = async () => {
    await deleteMessage(singleMessage._id);
  }
  if (success) {
    return navigateTo('/')
  }
  return (
    <>
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className={"flex flex-col gap-6 "}>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="size-18 animate-spin"/>
            </div>
          ) :
          !singleMessage ? (
            <div className="flex items-center justify-center text-2xl font-bold text-gray-900">
            No message found!
            </div>
          ) :
            <Card className={"h-full justify-center"}>
            <CardHeader className="text-center">
            <Link to="/">
                    <ArrowLeft className="size-5 text-gray-900" />
                  </Link>
              <CardTitle className="text-xl">Message</CardTitle>
              <CardDescription>Message Information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-transparent bg-opacity-50 rounded-lg border border-gray-900">
                <div className="flex flex-row items-center justify-between">
                  <p className="text-gray-900 font-semibold">Name:</p>
                  <span className="text-gray-700 font-normal">
                    {singleMessage?.name}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <p className="text-gray-900 font-semibold">Subject:</p>
                  <span className="text-gray-700 font-normal">
                    {singleMessage?.subject}
                  </span>
                </div>
                <div className="text-gray-700">
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-gray-900 font-semibold">Send At:</p>
                    {new Date(singleMessage?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>

              <div className="p-4 mt-5 bg-transparent bg-opacity-50 rounded-lg border border-gray-900">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Message:
                </h3>
                <div className="flex flex-row items-center justify-between">
                  <Textarea
                        className="text-gray-700 p-0 font-normal first-letter:uppercase border-0 ring-0 focus-visible:ring-0"
                        value={singleMessage?.message}
                        readOnly
                      />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleDelete} className="w-full cursor-pointer">
                Delete
              </Button>
            </CardFooter>
          </Card>}
        </div>
      </div>
    </div>
    </>
  );
};

export default ViewMessage;
