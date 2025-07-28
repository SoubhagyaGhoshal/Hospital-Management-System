import React, { useEffect, useState } from "react";
import { SideBarData } from "./SidebarData";
import SidebarItem from "./SidebarItem";
import Logo from "../../../assets/logo.png";
import adminImg from "../../../assets/admin-img.jpg";
import { getAdmin } from "../../../Api/AdminApi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IoMdMenu } from "react-icons/io";
import { setMenu } from "../../../Redux/slices/sidebarSlice";

const Sidebar = () => {
  const [openCategories, setOpenCategories] = useState({ 0: true });
  const [admin, setAdmin] = useState({});
  const Currentmenu = useSelector((state) => state.sidebar.menu);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleCategory = (index) => {
    setOpenCategories((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleToggleMenu = () => {
    dispatch(setMenu(!isOpen));
  };

  return (
    <div
      className={`p-4 text-white h-full overflow-y-auto no-scrollbar bg-[#1a202e]  ${
        Currentmenu ? "max-md:hidden" : "max-md:block"
      }`}>
      {/* Logo Section */}

      <button
        className="cursor-pointer md:hidden"
        onClick={handleToggleMenu}>
        <IoMdMenu fontSize={26} />
      </button>

      <div className="flex items-center justify-center bg-[#1a202e] pb-4">
        <span className="flex items-center gap-2">
          <img
            src={Logo}
            alt="Logo"
          />
          <span
            className={`text-[24px] font-bold ${
              Currentmenu ? "hidden" : "block"
            }`}>
            Cliniva
          </span>
        </span>
      </div>

      {/* Admin Profile */}
      <div
        className={`relative flex flex-col items-center gap-2 py-7 pt-10 ${
          Currentmenu ? "hidden" : "block"
        }`}>
        <img
          className="h-[75px] w-[75px] rounded-2xl border-2 border-white cursor-pointer"
          src={adminImg}
          alt="Admin"
          // Toggle logout button
        />
        <div className="flex flex-col items-center">
          <span className="text-[14px] text-[#e6e6e6] font-bold">
            {admin?.username || "Admin"}
          </span>
          <span className="text-[11px] opacity-95">ADMIN</span>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className={`mt-6 ${Currentmenu ? "hidden" : "block"}`}>
        <span className="text-[12px] ml-3 text-[#9BABF1] font-medium">
          MAIN
        </span>
      </div>

      {SideBarData.map((item, index) => (
        <SidebarItem
          key={index}
          item={item}
          index={index}
          openCategories={openCategories}
          toggleCategory={toggleCategory}
        />
      ))}
    </div>
  );
};

export default Sidebar;
