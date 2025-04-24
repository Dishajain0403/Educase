import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { User } from "@shared/schema";

export default function ProfilePage() {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['/api/users/profile'],
  });

  if (isLoading) {
    return (
      <div className="py-6 md:py-10 max-w-md mx-auto">
        <div className="h-20 w-full animate-pulse bg-gray-200 rounded mb-4"></div>
        <div className="h-12 w-3/4 animate-pulse bg-gray-200 rounded mb-4"></div>
        <div className="h-24 w-full animate-pulse bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center py-10">User not found</div>;
  }

  return (
    <div className="py-6 md:py-10 max-w-md mx-auto">
      <div className="border-b pb-6 mb-6">
        <div className="flex items-start">
          <div className="relative mr-4">
            <Avatar className="h-20 w-20 border-2 border-gray-300">
              <AvatarFallback className="text-lg bg-gray-300 text-white">
                {getInitials(user.fullName || '')}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Camera className="h-4 w-4 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.fullName}</h2>
            <p className="text-muted-foreground">{user.email || user.username}</p>
          </div>
        </div>
      </div>
      
      <div>
        <p className="text-muted-foreground mb-2">
          {user.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-muted-foreground">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
