import React, { useEffect, useState } from "react";
import { FaUserInjured } from "react-icons/fa";
import adminImg from "../../../assets/admin-img.jpg";
import { getAdmin } from "../../../Api/AdminApi";
import { IoMdMenu } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMenu } from "../../../Redux/slices/SidebarSlice";

function Navbar() {
  const [admin, setAdmin] = useState({});
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await getAdmin();
        setAdmin(response);
      } catch (error) {
        console.error("Error fetching admin:", error);
      }
    };
    fetchAdmin();
  }, []);

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
    dispatch(setMenu(!isOpen));
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
    setShowLogout(false);
  };

  return (
    <div className="flex justify-between items-center bg-[#1a202e] text-white p-4 shadow-md">
      {/* Sidebar Toggle Button */}
      <button
        className="cursor-pointer"
        onClick={handleToggleMenu}>
        <IoMdMenu fontSize={26} />
      </button>

      {/* Admin Info */}
      <div className="flex gap-3 items-center">
        <FaUserInjured className="text-lg" />
        <span className="text-sm font-semibold">
          {admin?.username || "Admin"}
        </span>
        <img
          src={adminImg}
          className="w-8 h-8 rounded-full border-2 border-white cursor-pointer"
          alt="Admin"
          onClick={() => setShowLogout(!showLogout)}
        />
        {/* Logout Button (Fixed Visibility) */}
        {showLogout && (
          <button
            onClick={handleLogout}
            className="absolute top-[60px] right-[10px] bg-black text-white px-4 py-2 text-sm rounded-md shadow-lg transition-all duration-300 hover:bg-red-700 flex gap-2">
            <FaUserInjured className="text-lg" />
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
