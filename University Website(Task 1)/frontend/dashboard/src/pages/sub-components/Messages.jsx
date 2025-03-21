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
import { messageStore } from "@/store/messageStore";
import { LucideMenuSquare } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const { messages } = messageStore();
  const navigateTo = useNavigate();
  const [viewAll, setViewAll] = useState(false);
  return (
    <>
      <div className="p-6">
        <Card className="p-4">
          <CardContent>
            <div className="flex justify-between items-center">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                Messages:
              </h3>
              <p className=" text-gray-900 font-semibold text-[0.75rem] lg:text-xl md:text-xl">
                Total Messages: {messages?.length}
              </p>
            </div>
            <Table className="w-full">
              <TableHeader>
                <TableRow className={"hover:bg-transparent"}>
                  <TableHead className={"hidden md:table-cell"}>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead className={"hidden md:table-cell"}>
                    Message
                  </TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages?.length === 0 ? (
                  <TableRow className={"hover:bg-transparent"}>
                    <TableCell
                      colSpan={4}
                      className="text-center text-2xl font-bold text-gray-900"
                    >
                      No messages found
                    </TableCell>
                  </TableRow>
                ) : !viewAll ? (
                  messages?.slice(0, 5).map((msg) => (
                    <TableRow key={msg._id} className={"hover:bg-transparent"}>
                      <TableCell className={"hidden md:table-cell"}>{msg.name}</TableCell>
                      <TableCell>
                        {msg.subject?.length > 31
                          ? msg.subject.slice(0, 31) + "..."
                          : msg.subject}
                      </TableCell>
                      <TableCell className={"hidden md:table-cell"}>
                        {msg.message?.length > 100
                          ? msg.message.slice(0, 100) + "..."
                          : msg.message}
                      </TableCell>
                      <TableCell>
                        <Button
                          className={"cursor-pointer"}
                          onClick={() => navigateTo(`/viewMessage/${msg._id}`)}
                        >
                          <LucideMenuSquare/>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  messages?.map((msg) => (
                    <TableRow key={msg._id} className={"hover:bg-transparent"}>
                      <TableCell className={"hidden md:table-cell"}>{msg.name}</TableCell>
                      <TableCell>
                        {msg.subject?.length > 31
                          ? msg.subject.slice(0, 31) + "..."
                          : msg.subject}
                      </TableCell>
                      <TableCell className={"hidden md:table-cell"}>
                        {msg.message?.length > 100
                          ? msg.message.slice(0, 100) + "..."
                          : msg.message}
                      </TableCell>
                      <TableCell>
                        <Button
                          className={"cursor-pointer"}
                          onClick={() => navigateTo(`/viewMessage/${msg._id}`)}
                        >
                          <LucideMenuSquare/>
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
                  {messages?.length > 5 && (
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

export default Messages;
