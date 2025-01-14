import React, { useEffect, useState } from "react";
import active from "../assets/images/active.png";
import inactive from "../assets/images/inactive.png";
import edit from "../assets/images/edit.png";
import deleteicon from "../assets/images/delete.png";
import view from "../assets/images/view.png";
import FilterContainer from "./filter/filter";
import { axiosClient } from "../services/axiosClient";
import EndPoints from "../services/EndPoints";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Client() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("All");
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  // Fetches the admin list from the server
  const getAdmins = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(EndPoints.ADMINS);
      if (response?.statusCode === 200) {
        setRequests(response?.result?.admins);
      }
    } catch (e) {
      toast.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Load admins data when component mounts
  useEffect(() => {
    getAdmins();
  }, []);

  const filteredRequests =
    selectedTab === "All"
      ? requests
      : selectedTab === "Active"
      ? requests.filter((req) => req?.isActive === true)
      : selectedTab === "Inactive"
      ? requests.filter((req) => req?.isActive === false)
      : selectedTab === "New Requests"
      ? requests.filter((req) => req?.disableCount === 0)
      : requests;

  const handleChangePermission = async (id, status) => {
    try {
      setLoading(true);
      const response = await axiosClient.put(
        `${EndPoints.CHANGE_PERMISSION}/${id}`,
        { active: !status }
      );
      if (response?.statusCode === 200) {
        toast.success(response?.result);
        getAdmins();
      }
    } catch (e) {
      toast.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row justify-between pt-4 bg-gray-50">
      <Toaster />
      {/* filter */}
      {/* <div className="w-[20%] h-[500px] bg-white">
        <FilterContainer />
      </div> */}

      {/* clients data */}
      <div className="w-full h-[500px] mx-5 bg-white rounded-[14px]">
        <div className="pt-5 px-5 text-[#040320] text-base font-semibold ">
          Client
        </div>

        <div className="flex space-x-4 mt-4">
          <div className="text-xs font-semibold w-[75px] text-center">
            Sort by
          </div>
          {["All", "Active", "Inactive", "New Requests"].map((tab) => (
            <div
              key={tab}
              className={`cursor-pointer text-xs font-semibold w-[80px] text-center ${
                selectedTab === tab
                  ? "pb-3 border-b-[3px] border-[#4834d4]"
                  : ""
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        <hr className="border-[#9391A5]/25 -translate-y-[1px]" />

        <section className="flex justify-between gap-2.5 pl-5 mt-2">
          <div className="flex items-center gap-2.5 py-2 px-4 bg-blue-50 rounded-2xl w-[410px] text-neutral-400">
            {/* <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/397260c6dace147fe4b2545df7c423ddfb04a53f39978afd337c8774f24443b2?placeholderIfAbsent=true&apiKey=a8cc6c1bf626485c842deb8f5c2a2105"
              alt="Client Search Icon"
              className="w-3.5 aspect-square"
            /> */}
            <input
              id="clientSearch"
              type="text"
              placeholder="Search for clients"
              className="w-[125px] bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex space-x-2 mx-2">
            <button className="flex items-center gap-2.5 px-5 py-2 text-base font-medium text-indigo-800 border border-indigo-800 rounded-md">
              {/* <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/513ae235eac2c3f950de7e74df2607570e50304e941a5805e851e39d1faf75a1?placeholderIfAbsent=true&apiKey=a8cc6c1bf626485c842deb8f5c2a2105"
                alt="Export Icon"
                className="w-3 aspect-[0.6]"
              /> */}
              Export
            </button>
            <button className="px-4 py-2.5 text-base font-medium text-white bg-indigo-700 rounded-md">
              Add School
            </button>
          </div>
        </section>

        {/* Client Table */}
        {filteredRequests.length > 0 ? (
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-600">
                <th className="py-2 text-center px-4 border">Client</th>
                <th className="py-2 text-center px-4 border">Country</th>
                <th className="py-2 text-center px-4 border">State</th>
                <th className="py-2 text-center px-4 border">City</th>
                <th className="py-2 text-center px-4 border">Status Change</th>
                <th className="py-2 text-center px-4 border">Status</th>
                <th className="py-2 text-center px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((client, index) => (
                <tr key={index} className="text-sm text-gray-700">
                  <td className="py-2 px-4 text-center border">
                    {/* Client {index + 1} */}
                    {client.username}
                  </td>
                  <td className="py-2 px-4 text-center border">
                    {client.country}
                  </td>
                  <td className="py-2 px-4 text-center border">
                    {client.state}
                  </td>
                  <td className="py-2 px-4 text-center border">
                    {client.city}
                  </td>
                  <td className="py-2 px-4 text-center border">
                    {client?.disableCount}
                  </td>
                  <td className="py-2 px-4 text-center border">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        client.status === "Active"
                          ? "bg-indigo-200 text-[#4834d4]"
                          : "bg-red-100 text-[#d91111]"
                      }`}
                    >
                      {client?.isActive ? "ACTIVE" : "IN-ACTIVE"}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">
                    <div className="flex justify-evenly">
                      <img
                        src={deleteicon}
                        className="size-5 cursor-not-allowed"
                        alt=""
                      />
                      <img
                        src={view}
                        className="size-5 cursor-pointer"
                        alt=""
                        onClick={() =>
                          navigate("/adminProfile", {
                            state: client,
                          })
                        }
                      />
                      <img
                        src={client?.isActive ? active : inactive}
                        className="size-5 cursor-pointer"
                        alt=""
                        onClick={() =>
                          handleChangePermission(client?._id, client?.isActive)
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex h-[300px] w-full justify-center items-center">
            <div className="text-3xl">No Admins Right Now</div>
          </div>
        )}
      </div>
    </div>
  );
}
