'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Fix import
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ChatLogs() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [chatLogs, setChatLogs] = useState<any[]>([]); // Specify array type correctly

  const fetchChatLogs = async () => {
    try {
      if (!session || !session.user || !session.user.user_id) {
        // Exit early if session or user_id is not available
        return;
      }
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/user/chat-logs/${session.user.user_id}/`);
      setChatLogs(response.data); // Assuming response is an array of chat logs
    } catch (error) {
      console.error("Error fetching chat logs:", error);
    }
  };

useEffect(() => {
    fetchChatLogs();
}, [session]); // Refetch chat logs when session changes


return (
    <div className="text-center  my-16">
        {chatLogs.map((chatLog: any) => (
            <div key={chatLog.id}>
                <Link href={`/chat-logs/${chatLog.id}`}>{chatLog.prompt}</Link>
            </div>
        ))}
    </div>
);
}
