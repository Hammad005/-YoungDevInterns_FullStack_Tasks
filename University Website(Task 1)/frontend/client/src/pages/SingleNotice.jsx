import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { clientStore } from "@/store/clientStore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "./sub-comonents/Footer";
import { Loader2 } from "lucide-react";

const SingleNotice = () => {
  const { id } = useParams();
  const { getSingleNotice, singleNotice, loading } = clientStore();
  useEffect(() => {
    getSingleNotice(id);
  }, [getSingleNotice, id]);

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
            ) : !singleNotice ? (
              <div className="flex items-center justify-center text-2xl font-bold text-gray-900">
                No notice found!
              </div>
            ) :(<Card className={"p-10"}>
              <CardHeader>
                <CardTitle className="text-3xl text-center font-bold uppercase text-gray-900">
                  Notice
                </CardTitle>
              </CardHeader>

              <h1 className="text-[0.75rem] text-center md:text-start md:text-lg font-bold text-gray-900">
                {singleNotice?.title}
              </h1>
              <Textarea
                className="w-full  border-none shadow-none p-4 text-gray-600 text-sm flex ring-0 focus-visible:ring-0"
                value={singleNotice?.content}
                readOnly
              />
            </Card>)}
          </div>
        </div>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </>
  );
};

export default SingleNotice;
