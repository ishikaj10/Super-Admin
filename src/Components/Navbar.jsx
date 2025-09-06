import { useEffect, useRef, useState } from "react";
import profile from "../assets/images/profile.png";
import logo from "../assets/images/deerlogo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const profileMenuRef = useRef(null);

  const handleToggleProfileMenu = () => {
    setProfileMenuOpen((prevState) => !prevState);
  };

  const closeMenus = () => {
    setProfileMenuOpen(false);
  };

  // close menu when click outside
  const handleOutsideClick = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target)
    ) {
      closeMenus();
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("access_token");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="bg-white border-b border-gray-100 px-10 py-6 text-white sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center ml-3">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="logo" className="size-9" />
          </Link>
        </div>

        <div className="flex space-x-12">
          <Link to='/subjects' className="text-[#040320] hover:text-[#4834D4] cursor-pointer px-2 py-2 text-base font-bold rounded-md relative">
            Subjects
          </Link>
          <Link to='/query' className="text-[#040320] hover:text-[#4834D4] cursor-pointer px-2 py-2 text-base font-bold rounded-md relative">
            Customer Query
          </Link>
          {/* <div className="py-2">
            <span className="text-[#040320] hover:text-[#4834D4] cursor-pointer text-base font-bold">
              analysis
            </span>
          </div> */}
          <div
            className="relative rounded-xl mr-5"
            onMouseEnter={() => setProfileMenuOpen(true)}
            onMouseLeave={() => setProfileMenuOpen(false)}
          >
            <div
              onClick={handleToggleProfileMenu}
              className="flex items-center justify-center px-3 py-1 cursor-pointer"
            >
              <img src={profile} alt="Dropdown" className="size-6" />
            </div>
            {/* profile menu */}
            {profileMenuOpen && (
              <div
                ref={profileMenuRef}
                className="absolute top-full right-0 w-[120px] text-[#040320] hover:text-[#4834D4] hover:bg-white bg-white rounded-xl shadow-lg z-10 justify-items-center"
                onClick={closeMenus}
              >
                <Link to="/login" className="py-1" onClick={handleLogout}>
                  <div className="block px-4 py-3 text-[#040320] hover:text-[#4834D4] hover:bg-white">
                    Logout
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
