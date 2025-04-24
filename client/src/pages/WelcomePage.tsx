import { useLocation } from "wouter";

export default function WelcomePage() {
  const [_, setLocation] = useLocation();

  return (
    <div className="flex flex-col justify-end min-h-screen p-6">
      <div className="w-full mt-auto">
        <h1 className="text-2xl font-bold mb-1 text-[#1D2226]">Welcome to PopX</h1>
        <p className="text-[#6D7D8B] text-sm mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        
        <div className="space-y-3">
          <button 
            onClick={() => setLocation("/signup")}
            className="w-full bg-[#6C25FF] text-white py-3 h-auto font-medium rounded text-base"
          >
            Create Account
          </button>
          <button 
            onClick={() => setLocation("/login")}
            className="w-full bg-[#ECECFD] text-[#6C25FF] py-3 h-auto border-none font-medium rounded text-base"
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
}
