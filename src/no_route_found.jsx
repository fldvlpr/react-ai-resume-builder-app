import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Button } from "./components/ui/button";

export const NoRouteFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-white px-6 py-12">
      <AlertTriangle className="w-16 h-16 text-[#9f5bff] mb-4" />
      <h1 className="text-6xl font-bold text-[#9f5bff] mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page not found
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Button
        onClick={() => navigate("/")}
        size="sm"
        className=" bg-[#9f5bff] text-white "
      >
        Back to Home
      </Button>
    </div>
  );
};
