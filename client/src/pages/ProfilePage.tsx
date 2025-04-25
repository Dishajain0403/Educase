import { Camera } from "lucide-react";

export default function ProfilePage() {
  // This is a static design page - no need for backend data
  
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
            <div className="w-16 h-16 rounded-full overflow-hidden border border-[#D8D8D8]">
              <img 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="Marry Doe" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#6C25FF] rounded-full flex items-center justify-center">
              <Camera className="h-3 w-3 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-base font-medium text-[#1D2226]">Marry Doe</h2>
            <p className="text-[#686868] text-sm">Marry@Gmail.Com</p>
          </div>
        </div>
        
        <div className="border-b border-dashed border-[#E2E2E2] pb-6 mb-6">
          <p className="text-[#686868] text-sm">
            Lorem Ipsum Dolor Sit Amet, Consetetuir Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
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
