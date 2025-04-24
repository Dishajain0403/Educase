import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  const [_, setLocation] = useLocation();

  return (
    <div className="flex flex-col justify-end min-h-screen p-6">
      <div className="w-full mt-auto">
        <h1 className="text-2xl font-bold mb-1">Welcome to PopX</h1>
        <p className="text-gray-500 text-sm mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        
        <div className="space-y-3">
          <Button 
            onClick={() => setLocation("/signup")}
            className="w-full bg-[#6C25FF] text-white py-3 h-auto font-medium rounded-md"
          >
            Create Account
          </Button>
          <Button 
            onClick={() => setLocation("/login")}
            className="w-full bg-[#ECECFD] text-[#6C25FF] py-3 h-auto border-none font-medium rounded-md"
          >
            Already Registered? Login
          </Button>
        </div>
      </div>
    </div>
  );
}
