import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import profile from "../assets/images/profile.png";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const navigate = useNavigate();
  const isTeacher = useSelector((state) => state.appAuth.role) === "teacher";

  const sectionId = useSelector((state) => state.appAuth.section);
  const classId = useSelector((state) => state.appAuth.class);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const { t } = useTranslation();

  const handleToggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleToggleProfileMenu = () => {
    setProfileMenuOpen((prevState) => !prevState);
  };

  const closeMenus = () => {
    setMenuOpen(false);
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
    if (isTeacher) {
      removeItem("class");
      removeItem("section");
      removeItem("firstname");
    } else {
      removeItem("username");
    }
    removeItem(KEY_ACCESS_TOKEN);
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
            <div className="bg-[#4834D4] size-10 rounded-2xl flex justify-center items-center">
              <span className="text-[24px] font-bold">{t("A")}</span>
            </div>
            <span className="font-bold text-[24px] ml-2 text-[#040320]">
              {t("logo")}
            </span>
          </Link>
        </div>

        <div className="flex space-x-12">
          <div
            className="relative items-end z-10"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <div
              onClick={handleToggleMenu}
              className="flex justify-center items-center cursor-pointer"
            >
              <button className="text-[#040320] px-2 py-2 text-base font-bold rounded-md relative">
                {t("setup")}
              </button>
              <img src={dropdown} alt="dropdown" className="w-4 h-4" />
            </div>
            {/* setup menu */}
            {menuOpen && (
              <div
                ref={menuRef}
                className="absolute top-10 w-40 bg-white rounded-[14px] shadow-lg z-10 justify-items-center "
              >
                {isTeacher ? (
                  <div className="py-1" onClick={closeMenus}>
                    <div
                      onClick={() =>
                        navigate("/student-section", {
                          state: { classId, sectionId },
                        })
                      }
                      className="block px-4 py-3 text-[#040320] hover:text-[#4834D4] hover:bg-white"
                    >
                      {t("titles.classRoom")}
                    </div>
                    <Link
                      to="/event"
                      className="flex justify-start items-center gap-4 px-4 py-3 text-[#040320] hover:text-[#4834D4] hover:bg-white"
                    >
                      {t("event")}
                    </Link>
                  </div>
                ) : (
                  <div className="py-1" onClick={closeMenus}>
                    <Link
                      to="/teacher"
                      className="flex justify-start items-center gap-4 px-4 py-3 text-[#040320] hover:text-[#4834D4] hover:bg-white"
                    >
                      <img
                        src={teachericon}
                        alt="teachericon"
                        className="w-5 h-5 relative"
                      />
                      {t("roles.teacher")}
                    </Link>
                    <Link
                      to="/student"
                      className="flex justify-start items-center gap-4 px-4 py-3 text-[#040320] hover:text-[#4834D4] hover:bg-white"
                    >
                      <img
                        src={studenticon}
                        alt="studenticon"
                        className="w-5 h-5 relative"
                      />
                      {t("roles.student")}
                    </Link>
                    <Link
                      to="/class-setup"
                      className="flex justify-start items-center gap-4 px-4 py-3 text-[#040320] hover:text-[#4834D4]  hover:bg-white"
                    >
                      <img
                        src={classroomicon}
                        alt="classroomicon"
                        className="w-5 h-5 relative"
                      />
                      {t("titles.classRoom")}
                    </Link>
                    <Link
                      to="/event"
                      className="flex justify-start items-center gap-4 px-4 py-3 text-[#040320] hover:text-[#4834D4] hover:bg-white"
                    >
                      <img
                        src={calendaricon}
                        alt="calendaricon"
                        className="w-5 h-5 relative"
                      />
                      {t("event")}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
          {!isTeacher && (
            <Link to="/requests" className="py-2">
              <span className="text-[#040320] hover:text-[#4834D4] text-base font-bold">
                {t("titles.requests")}
              </span>
            </Link>
          )}
          <div
            className="relative rounded-xl mr-5"
            onMouseEnter={() => setProfileMenuOpen(true)}
            onMouseLeave={() => setProfileMenuOpen(false)}
          >
            <div
              onClick={handleToggleProfileMenu}
              className="flex items-center justify-center px-3 py-1 cursor-pointer"
            >
              {/* <div>
                <div className="text-white text-base mr-3">
                  {isTeacher ? getItem("firstname") : getItem("username")}
                </div>
                <div className="text-white text-xs">
                  {isTeacher ? t("roles.teacher") : t("roles.admin")}
                </div>
              </div>
              <img src={Down} alt="Dropdown" className="w-4 h-2" /> */}
              <img src={profile} alt="Dropdown" className="size-6" />
            </div>
            {/* profile menu */}
            {profileMenuOpen && (
              <div
                ref={profileMenuRef}
                className="absolute top-full right-0 w-[120px] text-[#040320] hover:text-[#4834D4] hover:bg-white bg-white rounded-xl shadow-lg z-10 justify-items-center"
                onClick={closeMenus}
              >
                <div className="py-1">
                  {!isTeacher && (
                    <Link
                      to="/admin-profile"
                      className="block px-4 py-3 text-[#040320] hover:text-[#4834D4] hover:bg-white"
                    >
                      {t("profile")}
                    </Link>
                  )}
                  <Link
                    onClick={handleLogout}
                    to="/login"
                    className="block px-4 py-3 text-[#040320] hover:text-[#4834D4] hover:bg-white"
                  >
                    {t("logout")}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
