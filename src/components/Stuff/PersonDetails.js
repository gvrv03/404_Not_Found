import { ThumbsUp } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const PersonDetails = ({staffData}) => {
  return (
    <div className="p-2 border flex-col flex gap-2 h-fit rounded-md" >
        <h2 className="font-semibold text-2xl pb-2" >Contact Us</h2>
      <div className="flex items-center gap-4 ">
        <img
          src="https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"
          alt="user"
          width={40}
          height={40}
          className="rounded-full border p-2"
        />
        <div>
          <p className="font-medium">Gaurav NArnaware</p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <ThumbsUp className="h-3 mr-2 w-3" />
            +91 7796305801
          </div>
        </div>
      </div>
      <Button className="font-semibold" >Send Message</Button>
    </div>
  );
};

export default PersonDetails;
