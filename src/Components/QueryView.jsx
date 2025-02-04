import React from "react";
import cross from "../assets/images/cross.png";

export default function QueryView({ data, isVisible, onClose }) {
  if (!isVisible) return null;
  return (
    <div className="absolute top-0 left-0 right-0 select-none bg-white mt-[40px] sm:mt-[72px] p-4 sm:p-10 flex flex-col md:flex-row">
      {/* Text Section */}
      <div className="px-2 sm:px-[32px] lg:px-[46px] w-full md:w-5/12 text-center md:text-left">
        <div className="text-[36px] md:text-[46px] font-gilroy leading-[1.2]">
          Have questions or need assistance?
        </div>
        <div className="mt-4 text-[18px] sm:text-[20px] font-roboto-regular">
          We're here to help—reach out to us today!
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-7/12 mt-6 md:mt-0">
        <div className="flex justify-end items-end">
          <img
            src={cross}
            alt=""
            className="size-10 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="p-4 sm:p-6 mx-auto">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 px-2">
              <div className="mb-[35px]">
                <p className="text-sm font-roboto-medium text-[#374151]">
                  First Name
                </p>
                <div
                  className={`w-full border-b border-[#8D8D8D] font-roboto-medium outline-none text-sm`}
                >
                  {data?.firstname || ""}
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <div className="mb-[35px]">
                <p className="text-sm font-roboto-medium text-[#374151]">
                  Last Name
                </p>
                <div
                  className={`w-full border-b border-[#8D8D8D] font-roboto-medium outline-none text-sm`}
                >
                  {data?.lastname || ""}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-[35px]">
            <p className="text-sm font-roboto-medium text-[#374151]">
              School Name
            </p>
            <div
              className={`w-full border-b border-[#8D8D8D] font-roboto-medium outline-none text-sm`}
            >
              {data?.schoolName || ""}
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 px-2">
              <div className="mb-[35px]">
                <p className="text-sm font-roboto-medium text-[#374151]">
                  Email
                </p>
                <div
                  className={`w-full border-b border-[#8D8D8D] font-roboto-medium outline-none text-sm`}
                >
                  {data?.email || ""}
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <div className="mb-[35px]">
                <p className="text-sm font-roboto-medium text-[#374151]">
                  Phone
                </p>
                <div
                  className={`w-full border-b border-[#8D8D8D] font-roboto-medium outline-none text-sm`}
                >
                  {data?.phone || ""}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 px-2">
              <div className="mb-[35px]">
                <p className="text-sm font-roboto-medium text-[#374151]">
                  State
                </p>
                <div
                  className={`w-full border-b border-[#8D8D8D] font-roboto-medium outline-none text-sm`}
                >
                  {data?.state || ""}
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <div className="mb-[35px]">
                <p className="text-sm font-roboto-medium text-[#374151]">
                  City
                </p>
                <div
                  className={`w-full border-b border-[#8D8D8D] font-roboto-medium outline-none text-sm`}
                >
                  {data?.city || ""}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 px-2">
              <div className="mb-[35px]">
                <p className="text-sm font-roboto-medium text-[#374151]">
                  No of Teachers
                </p>
                <div
                  className={`w-full border-b border-[#8D8D8D] font-roboto-medium outline-none text-sm`}
                >
                  {data?.teacherCount || ""}
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <div className="mb-[35px]">
                <p className="text-sm font-roboto-medium text-[#374151]">
                  How Did You Get to Know About Us?
                </p>
                <div
                  className={`w-full border-b border-[#8D8D8D] font-roboto-medium outline-none text-sm`}
                >
                  {data?.source || ""}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-[35px]">
            <p className="text-sm font-roboto-medium text-[#374151]">Message</p>
            <div
              className={`w-full border-b border-[#8D8D8D] font-roboto-medium outline-none text-sm`}
            >
              {data?.message || ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
