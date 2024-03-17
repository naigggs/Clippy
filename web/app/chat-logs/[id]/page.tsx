import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge";

export default function page({
  params,
}: {
  params: { id: string};
}) {
const fetchData = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/chats/chat/${params.id}`
        );
        if (response.ok) {
           const data = await response.json();
           console.log(data);
            
        } else {
            throw new Error("Request failed");
        }
    } catch (error) {
        // Handle the error here
    }
};
 fetchData();

  return (
    <div className="flex justify-center mt-36 ">

    </div>
  );
}
