import React from "react";
import Globe from "../assets/images/Globe.png";
import facebook from "../assets/images/facebook.png";
import instagram from "../assets/images/instagram.png";
import linkedin from "../assets/images/linkedin.png";
import twitter from "../assets/images/twitter.png";
import whatsapp from "../assets/images/whatsapp.png";
import youtube from "../assets/images/youtube.png";
import cross from "../assets/images/cross.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminProfile() {
  const navigate = useNavigate();
  const adminData = useLocation().state;
  return (
    <div className="flex flex-col items-center bg-[#93a3b6]/25 p-6">
      {/* Account Setting */}
      <div className="flex flex-col p-10 w-full rounded-2xl bg-white max-md:px-5 max-md:m-10 max-md:max-w-full">
        <div className="flex flex-row justify-between items-center">
          <div className="text-2xl font-bold tracking-tight leading-8 text-neutral-800">
            Account Setting
          </div>
          <img
            src={cross}
            alt=""
            className="size-10 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="flex flex-wrap gap-5 mt-5 w-full">
          {/* School Name and Email */}
          <div className="flex flex-row w-full space-x-5">
            <div className="w-full md:w-4/5">
              <label className="text-sm font-semibold leading-5 text-neutral-800">
                School Name
              </label>
              <input
                name="schoolName"
                value={adminData.schoolName || ""}
                disabled={true}
                className="p-2 mt-1 w-full text-base leading-6 text-black bg-white border border-gray-200"
              />
            </div>

            <div className="w-full md:w-4/5">
              <label className="text-sm font-semibold leading-5 text-neutral-800">
                Email
              </label>
              <input
                name="email"
                value={adminData.email || ""}
                disabled={true}
                className="p-2 mt-1 w-full text-base leading-6 text-black bg-white border border-gray-200"
              />
            </div>
          </div>

          {/* Principal and Admin */}
          <div className="flex flex-row w-full space-x-5">
            <div className="w-full md:w-4/5">
              <label className="text-sm font-semibold leading-5 text-neutral-800">
                Principal
              </label>
              <input
                name="principal"
                value={adminData.principal || ""}
                disabled={true}
                className="p-2 mt-1 w-full text-base leading-6 text-black bg-white border border-gray-200"
              />
            </div>

            <div className="w-full md:w-4/5">
              <label className="text-sm font-semibold leading-5 text-neutral-800">
                Admin Name
              </label>
              <input
                name="username"
                value={adminData.username || ""}
                disabled={true}
                className="p-2 mt-1 w-full text-base leading-6 text-black bg-white border border-gray-200"
              />
            </div>
          </div>

          {/* Affiliation No and School No */}
          <div className="flex flex-row w-full space-x-5">
            <div className="w-full md:w-4/5">
              <label className="text-sm font-semibold leading-5 text-neutral-800">
                Affiliation Number
              </label>
              <input
                name="affiliationNo"
                value={adminData.affiliationNo || ""}
                disabled={true}
                className="p-2 mt-1 w-full text-base leading-6 text-black bg-white border border-gray-200"
              />
            </div>

            <div className="w-full md:w-4/5">
              <label className="text-sm font-semibold leading-5 text-neutral-800">
                School Number
              </label>
              <input
                name="schoolNumber"
                value={adminData.schoolNumber || ""}
                disabled={true}
                className="p-2 mt-1 w-full text-base leading-6 text-black bg-white border border-gray-200"
              />
            </div>
          </div>

          {/* Address and School Board */}
          <div className="flex flex-row w-full space-x-5">
            <div className="w-full md:w-4/5">
              <label className="text-sm font-semibold leading-5 text-neutral-800">
                Address
              </label>
              <input
                name="address"
                value={adminData.address || ""}
                disabled={true}
                className="p-2 mt-1 w-full text-base leading-6 text-black bg-white border border-gray-200"
              />
            </div>

            <div className="w-full md:w-4/5">
              <label className="text-sm font-semibold leading-5 text-neutral-800">
                School Board
              </label>
              <input
                name="schoolBoard"
                value={adminData.schoolBoard || ""}
                disabled={true}
                className="p-2 mt-1 w-full text-base leading-6 text-black bg-white border border-gray-200"
              />
            </div>
          </div>

          {/* Country, State, and District */}
          <div className="flex flex-row w-full space-x-5">
            <div className="w-full md:w-1/3">
              <label className="text-sm font-semibold leading-5 text-neutral-800">
                Country
              </label>
              <input
                name="country"
                value={adminData.country || ""}
                disabled={true}
                className="p-2 mt-1 w-full text-base leading-6 text-black bg-white border border-gray-200"
              />
            </div>

            <div className="w-full md:w-1/3">
              <label className="text-sm font-semibold leading-5 text-neutral-800">
                State
              </label>
              <input
                name="state"
                value={adminData.state || ""}
                disabled={true}
                className="p-2 mt-1 w-full text-base leading-6 text-black bg-white border border-gray-200"
              />
            </div>

            <div className="w-full md:w-1/3">
              <label className="text-sm font-semibold leading-5 text-neutral-800">
                District
              </label>
              <input
                name="district"
                value={adminData.district || ""}
                disabled={true}
                className="p-2 mt-1 w-full text-base leading-6 text-black bg-white border border-gray-200"
              />
            </div>
          </div>

          {/* City and Pincode */}
          <div className="flex flex-row w-full space-x-5">
            <div className="w-full md:w-4/5">
              <label className="text-sm font-semibold leading-5 text-neutral-800">
                City
              </label>
              <input
                name="city"
                value={adminData.city || ""}
                disabled={true}
                className="p-2 mt-1 w-full text-base leading-6 text-black bg-white border border-gray-200"
              />
            </div>

            <div className="w-full md:w-4/5">
              <label className="text-sm font-semibold leading-5 text-neutral-800">
                Pincode
              </label>
              <input
                name="pincode"
                value={adminData.pincode || ""}
                disabled={true}
                className="p-2 mt-1 w-full text-base leading-6 text-black bg-white border border-gray-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Social Profile */}
      <div className="flex flex-col p-10 mx-10 mt-6 rounded-2xl w-full bg-white max-w-[1320px] max-md:px-5">
        <div className="text-4xl font-bold tracking-tight leading-6 text-neutral-800">
          Social Profile
        </div>
        {/* Phone */}
        <div className="mt-7 w-full">
          <div className="text-sm font-semibold leading-6 text-neutral-800">
            Phone Number<span className="text-red-500">*</span>
          </div>
          <div className="flex gap-5 px-5 py-2 mt-1 bg-white border border-gray-200">
            <div className="flex items-center gap-1.5 font-medium text-[#0F4189]">
              <div>+91</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/16ca314b6e5de1ff873da6c3d07ade79f8cd3b3ad3f24ffbb3eae32553811ebf?"
                className="w-3 aspect-square"
              />
            </div>
            <input
              name="phone"
              placeholder="Enter your phone number"
              value={adminData?.phone || ""}
              disabled={true}
              className="flex-auto text-black bg-transparent outline-none"
            />
          </div>
        </div>
        <div className="mt-7 w-full">
          <div className="text-sm font-semibold leading-6 text-neutral-800">
            Website
          </div>
          <div className="flex gap-5 px-5 py-2 mt-1 bg-white border border-gray-200">
            <div className="flex items-center gap-1.5 font-medium text-[#0F4189]">
              <img loading="lazy" src={Globe} className="w-5 aspect-square" />
            </div>
            <input
              name="website"
              placeholder="Enter your website"
              value={adminData?.website || ""}
              disabled={true}
              className="flex-auto text-black bg-transparent outline-none"
            />
          </div>
        </div>
        {/* Social Media Fields */}
        <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          {[
            {
              label: "Facebook",
              icon: facebook,
              name: "facebook",
              placeholder: "Enter your username",
            },
            {
              label: "Instagram",
              icon: instagram,
              name: "instagram",
              placeholder: "Enter your username",
            },
            {
              label: "LinkedIn",
              icon: linkedin,
              name: "linkedin",
              placeholder: "Enter your username",
            },
            {
              label: "Twitter",
              icon: twitter,
              name: "twitter",
              placeholder: "Enter your username",
            },
            {
              label: "WhatsApp",
              icon: whatsapp,
              name: "whatsapp",
              placeholder: "Enter your phone number",
            },
            {
              label: "YouTube",
              icon: youtube,
              name: "youtube",
              placeholder: "Enter your username",
            },
          ].map(({ label, icon, name, placeholder }) => (
            <div key={name}>
              <div className="text-sm font-semibold leading-5 text-neutral-800">
                {label}
              </div>
              <div className="flex gap-3 px-5 py-2 mt-1 w-full text-base leading-6 text-gray-400 bg-white border border-gray-200">
                <img
                  loading="lazy"
                  src={icon}
                  className="w-5 h-5 aspect-square"
                />
                <input
                  name={name}
                  placeholder={placeholder}
                  value={adminData?.[name] || ""}
                  disabled={true}
                  className="flex-auto bg-transparent text-black outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
