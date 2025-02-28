"use client";
import StuffAdd from "@/components/Stuff/StuffAdd";
import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";
import React from "react";

const AddStuff = () => {
  const { user } = useAuth();
const router = useRouter()
  if (user?.isLogin) {
    return (
      <div>
        <StuffAdd />
      </div>
    );
  } else {
    return (
      <div className="h-[90vh] flex items-center justify-center flex-col gap-2 ">
        <p>You need to Login</p>
        <button onClick={()=>{
          router.push("/Auth")
        }} className="border p-2 rounded-md" >Login Now</button>
      </div>
    );
  }
};

export default AddStuff;
