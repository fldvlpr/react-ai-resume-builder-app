import Header from "@/components/custom/Header";
import { HomeIcon } from "lucide-react";
import React from "react";

const Home = () => {
  return (
    <div>
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-white px-6 py-12">
        <HomeIcon className="w-16 h-16 text-[#9f5bff] mb-4" />
        <h1 className="text-4xl font-bold text-[#9f5bff] mb-2">Welcome Home</h1>
        <p className="text-gray-600 text-center max-w-md">
          This is your home page. Start exploring your app from here.
        </p>
      </div>
    </div>
  );
};

export default Home;
