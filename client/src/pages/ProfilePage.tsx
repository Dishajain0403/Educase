import { useQuery } from "@tanstack/react-query";
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
        <div className="h-14 w-full animate-pulse bg-gray-200"></div>
        <div className="p-6 space-y-4">
          <div className="flex items-start">
            <div className="h-16 w-16 rounded-full animate-pulse bg-gray-200 mr-4"></div>
            <div className="space-y-2">
              <div className="h-5 w-32 animate-pulse bg-gray-200"></div>
              <div className="h-4 w-40 animate-pulse bg-gray-200"></div>
            </div>
          </div>
          <div className="h-20 w-full animate-pulse bg-gray-200"></div>
          <div className="h-4 w-16 animate-pulse bg-gray-200"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center py-10">User not found</div>;
  }

  return (
    <div className="w-full">
      {/* Header with Account Settings */}
      <div className="w-full bg-[#F7F8F8] py-4 px-6 border-b border-[#E8E8E8]">
        <h2 className="text-base font-medium text-[#1D2226]">Account Settings</h2>
      </div>
      
      {/* User Profile Section */}
      <div className="p-6">
        <div className="flex items-start mb-6">
          <div className="relative mr-3">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-[#D8D8D8]">
              {user.fullName ? (
                <span className="text-lg font-semibold text-white bg-[#BBBBBB] w-full h-full flex items-center justify-center">
                  {getInitials(user.fullName)}
                </span>
              ) : (
                <span className="text-lg font-semibold text-white bg-[#BBBBBB] w-full h-full flex items-center justify-center">
                  S
                </span>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#6C25FF] rounded-full flex items-center justify-center">
              <Camera className="h-3 w-3 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-base font-medium text-[#1D2226]">{user.fullName || 'Sophia Johnson'}</h2>
            <p className="text-[#686868] text-sm">{user.email || user.username || 'sophia.johnson@gmail.com'}</p>
          </div>
        </div>
        
        <div className="border-b border-dashed border-[#E2E2E2] pb-6 mb-6">
          <p className="text-[#686868] text-sm">
            {user.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'}
          </p>
        </div>
        
        <div className="flex items-center">
          <div className="w-2 h-2 bg-[#2EDC76] rounded-full mr-2"></div>
          <span className="text-xs text-[#686868]">Active</span>
        </div>
      </div>
    </div>
  );
}
