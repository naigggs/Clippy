"use client";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Chat() {
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    async function checkAuth() {
      const session = await getSession();
      if (!session) {
        router.push("/login");
      }
    }
    checkAuth();
  }, []); 

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const link_id = (event.target as HTMLFormElement).link_id.value;
  const promptValue = (event.target as HTMLFormElement).prompt.value;
  const session = await getSession();

  if (session) {
    const token = session.access;
    setLoading(true); // Show loader
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/chats/create/`,
        { link_id, prompt: promptValue },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
          },
        }
      );
      setPrompt(promptValue);
      setResponse(response.data.response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Hide loader regardless of success or failure
    }
  } else {
    console.error("User not authenticated");
  }
};
  return (
    <div className="flex justify-center mt-10 ">
      <div className="container mx-auto px-4">
        {" "}
        {/* Adding padding */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-3 ">
            <div className="w-full">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <h2 className="text-lg font-bold">USER</h2>
                    <Badge>User</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 text-sm">
                  {loading ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <p className="rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
                      {prompt ? prompt : "What is the song all about?"}
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    2 minutes ago
                  </p>
                </CardFooter>
              </Card>
              <div className="h-4"></div> {/* Adding space */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <h2 className="text-lg font-bold">Clippy.AI</h2>
                    <Badge>AI</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 text-sm">
                  {loading ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <p className="rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
                      {response
                        ? response
                        : `The song is about a person who is deeply in love with someone and is committed to never letting them down, no matter what. They know that the other person has been feeling the same way, but is too shy to say it. The singer wants to express their love and commitment to the other person, and to let them know that they will always be there for them. The song is a classic love song that expresses the depth of love and commitment that one person can have for another.`}
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    2 minutes ago
                  </p>
                </CardFooter>
              </Card>
            </div>
            <div className="w-1/2">
              <Card>
                <CardHeader>
                  <CardTitle>Ask Clippy Now!</CardTitle>
                  <CardDescription>
                    Replace the Video ID with your specific video identifier and
                    provide your prompt.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Video ID</Label>
                        <Input
                          id="link_id"
                          name="link_id"
                          placeholder="dQw4w9WgXcQ"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="prompt">Prompt</Label>
                        <Textarea
                          id="prompt"
                          name="prompt"
                          placeholder="What is the song all about?"
                        />
                      </div>
                    </div>
                    <CardFooter className="mt-4 flex justify-between">
                      {loading ? (
                        <Button disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </Button>
                      ) : (
                        <Button variant="outline" type="reset">
                          Clear
                        </Button>
                      )}
                      {loading ? (
                        <Button disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting
                        </Button>
                      ) : (
                        <Button type="submit">Submit</Button>
                      )}
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
