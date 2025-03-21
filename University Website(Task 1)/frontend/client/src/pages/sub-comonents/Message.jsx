import { Loader2, SendHorizonal, University } from "lucide-react";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { clientStore } from "@/store/clientStore";

const Message = () => {
  const {sendMessage, loading} = clientStore();
  const [data, setData] = useState({name: '', subject: '', message: ''})
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(data);
    setData({name: '', subject: '', message: ''});
  }
  return (
    <>
      <div className="md:w-[40%] min-h-[75vh] sticky top-0 md:h-screen bg-gray-100">
        <div className=" flex-col items-center justify-center pt-25">
          <div className="text-center ">
            <div className="flex items-center justify-center">
              <span className="flex size-15 items-center justify-center rounded-md bg-white text-gray-900 animate-bounce">
                <University />
              </span>
            </div>
            <h1 className="text-2xl font-bold uppercase text-gray-900">
              University Website
            </h1>
          </div>
          <Card className={"p-0 shadow-none border-none bg-transparent"}>
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold text-gray-900">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email" className={'text-gray-900'}>Name</Label>
                      <Input
                        id="title"
                        type="text"
                        value={data.name}
                        onChange={(e) =>
                          setData({ ...data, name: e.target.value })
                        }
                        placeholder="Enter Your Name"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email" className={'text-gray-900'}>Subject</Label>
                      <Input
                        id="title"
                        type="text"
                        value={data.subject}
                        onChange={(e) =>
                          setData({ ...data, subject: e.target.value })
                        }
                        placeholder="Write your message subject"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email" className={'text-gray-900'}>Message</Label>
                      <Textarea
                        id="content"
                        value={data.message}
                        onChange={(e) =>
                          setData({ ...data, message: e.target.value })
                        }
                        className={'md:h-30 h-43'}
                        placeholder="Write your message"
                        maxLength={200}
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
                          <Loader2 className="h-5 w-5 animate-spin" />
                          {"Sending..."}
                        </>
                      ) : (
                        <>
                          {"Send"}
                          <SendHorizonal className="h-5 w-5" />
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
    </>
  );
};

export default Message;
