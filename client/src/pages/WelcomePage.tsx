import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  const [_, setLocation] = useLocation();

  return (
    <div className="py-10 md:py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">Welcome to PopX</h1>
        <p className="text-muted-foreground text-center mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={() => setLocation("/signup")}
            className="w-full bg-primary text-white py-6 h-auto font-medium"
          >
            Create Account
          </Button>
          <Button 
            onClick={() => setLocation("/login")}
            variant="outline"
            className="w-full bg-accent text-primary py-6 h-auto border-none font-medium"
          >
            Already Registered? Login
          </Button>
        </div>
      </div>
    </div>
  );
}
