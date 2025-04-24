import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location] = useLocation();
  
  // Hide navigation on profile page
  if (location === "/profile") {
    return null;
  }

  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm hidden md:block">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">PopX</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="link" className="text-primary font-medium">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-primary text-white px-4 py-2 rounded">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
