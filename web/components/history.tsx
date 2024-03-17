import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Fix import
import axios from "axios";
import React, { useEffect, useState } from "react";

export function History({}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [chatLogs, setChatLogs] = useState<any[]>([]); // Specify array type correctly

  const fetchChatLogs = async () => {
    try {
      if (!session || !session.user || !session.user.user_id) {
        // Exit early if session or user_id is not available
        return;
      }
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/user/chat-logs/${session.user.user_id}/`
      );
      setChatLogs(response.data); // Assuming response is an array of chat logs
    } catch (error) {
      console.error("Error fetching chat logs:", error);
    }
  };

  const fetchChat = async (chatId: string) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/chats/chat/${chatId}`
      );
      // Handle the response data here
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  useEffect(() => {
    if (chatLogs.length > 0) {
      const chatId = chatLogs[0].id; // Assuming you want to fetch the chat with the first chat log
      fetchChat(chatId);
    }
  }, [chatLogs]);

  useEffect(() => {
    fetchChatLogs();
  }, [session]); // Refetch chat logs when session changes

  const [selectedChat, setSelectedChat] = useState<any | null>(null); // State to hold selected chat data

  const handleChatClick = async (chatId: string) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/chats/chat/${chatId}`
      );
      setSelectedChat(response.data); // Update state with selected chat data
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Chat Logs</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Chat Logs</SheetTitle>
          <SheetDescription>
            This is where we store your chats!
            {selectedChat && ( // Render chat details if a chat is selected
              <div>
                <h3>Prompt: {selectedChat.prompt}</h3>
                <p>Message: {selectedChat.message}</p>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-row-4 items-center gap-4">
            {chatLogs.map((chat) => (
              <div key={chat.id}>
                <Button variant="link" onClick={() => handleChatClick(chat.id)}>
                  {chat.prompt}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
