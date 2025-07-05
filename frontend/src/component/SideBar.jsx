import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gettask } from '../redux/action/Sidebar'
import { setSelectedUser } from "../redux/action/Selectuser";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/action/Login";
import { userAuth } from "../context/Authcontext";
import { useSocketContext } from "../context/SocketContext";

export const SideBar = () => {
  const { authuser } = userAuth();
  const users = useSelector((state) => state.sidebar.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState(""); 
  const { socket, onlineUsers } = useSocketContext();

  useEffect(() => {
    if (authuser?._id) {
      dispatch(gettask(authuser._id));
    }
  }, [authuser]);

  const filteredUsers = users
    ?.filter((curUser) => curUser._id !== authuser?._id)
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  

  const handleSearch = (value) => {
    setSearch(value);
  };



  const handleLogout = () => {
    dispatch(logout());
    if (socket) {
      socket.disconnect();
    }
    navigate("/");
    window.location.reload();
  };

  const handleUserSelect = (user) => {
    dispatch(setSelectedUser(user));
    setSidebarOpen(false);
  };

  const isUserOnline = (userId) => {
    return onlineUsers?.includes(String(userId));
  };

  return (
    <>

      <button
        className="md:hidden fixed top-4 left-0 text-[12px] z-50 p-2 bg-[#F0F2F5] text-black rounded-lg"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >

      </button>


      <div
        className={`sidebar fixed top-0 left-0 max-h-screen bg-[#FFFFFF] z-10 shadow-lg transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:static md:translate-x-0 md:block w-70 overflow-y-scroll h-screen py-6 px-4`}
      >
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between md:mt-0 mt-11">

          <input
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
            type="text"
            placeholder="Search users..."
            className="w-full md:w-2/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


          <div className="relative font-[sans-serif] mt-4 md:mt-0 md:ml-4">
            <button
              type="button"
              className="flex items-center rounded-full text-[#333] text-sm outline-none"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              {authuser?.profile && (
                <img
                  src={authuser.profile}
                  className="w-9 h-9 rounded-full"
                  alt="Profile"
                />
              )}

            </button>

            <ul
              className={`absolute right-0 mt-2 shadow-lg bg-white py-2 z-[1000] min-w-24 w-15 rounded-lg max-h-60 overflow-x-hidden ${isDropdownOpen ? "block" : "hidden"
                }`}
            >
              <li className="py-2.5 px-5 gap-[8px] flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">

                Home
              </li>
              <li
                onClick={handleLogout}
                className="py-2.5 px-5 flex gap-[8px] items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>


        <div className="my-8 flex-1">
          <h6 className="text-sm text-gray-700 font-semibold mb-6">Teams</h6>
          <ul className="space-y-6">
            {filteredUsers.map((curUser) => (
              <li
                key={curUser._id}
                onClick={() => handleUserSelect(curUser)}
                className="flex items-center text-sm text-black hover:text-blue-500 cursor-pointer"
              >
                <span className="relative inline-block mr-4">
                  <img
                    src={curUser.profile}
                    className="ml-[13px] rounded-full w-[50px] h-[50px] object-cover"
                    alt="Profile"
                  />

                  {isUserOnline(curUser._id) && (
                    <span className="h-2.5 w-2.5 rounded-full bg-green-600 block absolute bottom-1 right-0"></span>
                  )}  
                </span>
                <span className="font-medium">{curUser.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
