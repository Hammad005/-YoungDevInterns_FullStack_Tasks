import { Card, CardSkeletonContainer } from "../components/Card";
import { Label } from "../components/Label";
import { Input, TextArea } from "../components/Input";
import { ArrowLeftIcon} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { schoolStore } from "../store/schoolStore";
const SchoolProfile = () => {
    const {singleSchool } = schoolStore();
      const navigateTo = useNavigate();

  return (
   <>
         <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[80%] mt-7">
           <div onClick={() => navigateTo(-1)} className="cursor-pointer">
             <ArrowLeftIcon className="w-4 h-4 text-white" />
           </div>
           <CardSkeletonContainer
             className={"text-center flex justify-center items-center mb-4"}
           >
             <div className="flex flex-col items-center justify-center text-2xl md:text-2xl uppercase font-bold text-white animate-pulse">
               Profile
             </div>
           </CardSkeletonContainer>
           <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
             <div className="flex w-full flex-col space-y-4">
               <Label htmlFor="name">School Name</Label>
               <Input
                 id="name"
                 placeholder="ABCD-School"
                 type="text"
                 required
                 value={singleSchool?.name}
                 disabled
               />
               <Label htmlFor="contact">School Contact</Label>
               <Input
                 id="contact"
                 placeholder="08012345678"
                 type="Number"
                 required
                 value={singleSchool?.contact}
                 disabled
               />
             </div>
             <div className="flex w-full flex-col space-y-4">
               <Label htmlFor="name">School Admin Name</Label>
               <Input
                 id="name"
                 placeholder="John Doe"
                 type="text"
                 required
                 value={singleSchool?.adminId?.name}
                 disabled
               />
               <Label htmlFor="email">School Admin Email</Label>
               <Input
                 id="email"
                 placeholder="johnDoe@gmail.com"
                 type="email"
                 required
                 value={singleSchool?.adminId?.email}
                 disabled
               />
             </div>
           </div>
             <Label htmlFor="address">School Address</Label>
               <TextArea
                 id="address"
                 placeholder="123, Oxford Street, London"
                 type="text"
                 required
                 value={singleSchool?.address}
                 disabled
               />
               
         </Card>
       </>
  )
}

export default SchoolProfile