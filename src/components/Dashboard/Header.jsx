

import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";


export const Header = () => {

  const { user } = useAuth()
  const { role } = useRole()
  console.log(role)
  
  // Helper to get title based on path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("participated")) return "My Participated Contests";
    if (path.includes("winning")) return "My Winning Contests";
    if (path.includes("profile")) return "My Profile";
    return "Dashboard Overview";
  };

  return (
    <header className="z-40 bg-[#f7f6f9]/80 backdrop-blur-md sticky top-0 px-8 py-4 border-b border-gray-200/50">
      <div className="flex flex-row items-center gap-4 sm:justify-between">
        {/* Search Bar */}
        {/* <div className="flex items-center w-full sm:max-w-md bg-white border border-gray-200 rounded-full shadow-sm px-4 py-2.5 transition-shadow focus-within:shadow-md focus-within:border-blue-300">
          <Search className="w-4 h-4 mr-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search dashboard..."
            className="w-full text-sm bg-transparent outline-0 placeholder:text-gray-400 text-slate-700"
          />
        </div> */}
        <div className="">
          <h1 className="text-2xl font-bold text-slate-800">
            {getPageTitle()}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your activities and update your information.
          </p>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center justify-end gap-4 ml-auto sm:gap-6">
          {/* <div className="flex items-center space-x-3 sm:space-x-4">
            
            <HeaderIcon icon={Mail} badge={21} color="blue" />
            <HeaderIcon icon={Bell} badge={4} color="indigo" />
            <HeaderIcon icon={LogOut} badge={3} color="red" />
          </div> */}

          <div className="w-1 h-8 bg-gray-300 "></div>

          {/* Profile Dropdown */}
         
            <div className="flex items-center gap-3 p-1 pr-3 transition-all rounded-full cursor-pointer hover:bg-white hover:shadow-sm">
              <img
                src={user?.photoURL}
                alt="profile"
                className="object-cover border-2 border-white rounded-full shadow-sm w-9 h-9"
              />
              <div className="hidden text-left md:block">
                <p className="text-sm font-semibold leading-tight text-slate-700">
                  {user?.displayName}
                </p>
                <p className="text-xs text-slate-500">{role}</p>
              </div>
            </div>

            {/* Dropdown Content */}
            {/* <div className="absolute right-0 z-50 invisible w-56 mt-2 overflow-hidden transition-all duration-200 origin-top-right transform bg-white border border-gray-100 shadow-xl opacity-0 top-full rounded-xl group-hover:opacity-100 group-hover:visible">
              <div className="p-2 space-y-1">
                <DropdownItem icon={User} text="My Profile" />
                <DropdownItem icon={Settings} text="Settings" />
                <div className="h-1 mx-2 my-1 bg-gray-100"></div>
                <DropdownItem icon={LogOut} text="Logout" isDestructive />
              </div>
            </div> */}
        
        </div>
      </div>
    </header>
  );
}
