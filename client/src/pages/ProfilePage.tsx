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
      <div className="w-full">
        <div className="h-20 w-full animate-pulse bg-gray-200 mb-4"></div>
        <div className="h-12 w-3/4 animate-pulse bg-gray-200 mb-4"></div>
        <div className="h-24 w-full animate-pulse bg-gray-200"></div>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center py-10">User not found</div>;
  }

  return (
    <div className="w-full">
      {/* Header with Account Settings */}
      <div className="w-full bg-[#f7f8f8] p-4 border-b border-gray-200">
        <h2 className="text-lg text-gray-700">Account Settings</h2>
      </div>
      
      {/* User Profile Section */}
      <div className="p-6">
        <div className="flex items-start mb-4">
          <div className="relative mr-4">
            <Avatar className="h-16 w-16 border border-gray-300">
              <AvatarFallback className="text-lg text-white" style={{ backgroundImage: 'url(https://source.unsplash.com/random/80x80/?portrait)', backgroundSize: 'cover' }}>
                {getInitials(user.fullName || '')}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#6C25FF] rounded-full flex items-center justify-center">
              <Camera className="h-3 w-3 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-base font-medium">{user.fullName || 'Marry Doe'}</h2>
            <p className="text-gray-500 text-sm">{user.email || user.username || 'Marry@Gmail.Com'}</p>
          </div>
        </div>
        
        <div className="pt-2 pb-8 border-b border-dashed border-gray-300 mb-6">
          <p className="text-gray-600 text-sm">
            Lorem Ipsum Dolor Sit Amet, Consetetuir Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
          </p>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-xs text-gray-500">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
