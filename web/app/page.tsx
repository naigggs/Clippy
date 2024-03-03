'use client';

import Image from "next/image";
import { useState } from "react";

export default function Home() {
    const [response, setResponse] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const link_id = (event.target as HTMLFormElement).link_id.value;
      const prompt = (event.target as HTMLFormElement).prompt.value;

      const response = await fetch("http://127.0.0.1:8000/api/v1/chats/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link_id, prompt }),
      });

      const data = await response.json();
      setResponse(data.response);
    };

    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="bg-white w-1/2 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="link_id" className="block text-gray-700 text-sm font-bold mb-2">Link ID:</label>
            <input type="text" id="link_id" name="link_id" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>

          <div className="mb-4">
            <label htmlFor="prompt" className="block text-gray-700 text-sm font-bold mb-2">Prompt:</label>
            <input type="text" id="prompt" name="prompt" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
          </div>
        </form>

        {response && <div className="text-center text-gray-700">{response}</div>}
      </div>
    );
  }
