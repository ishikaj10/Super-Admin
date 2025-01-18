import React, { useEffect, useState } from "react";
import active from "../assets/images/active.png";
import deleteicon from "../assets/images/delete.png";
import view from "../assets/images/view.png";
import { axiosClient } from "../services/axiosClient";
import EndPoints from "../services/EndPoints";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ConformationPopup from "./ConfirmPopop";

export default function Client() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("All");
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConformationPopup, setShowConformationPopup] = useState(false);
  const [currentRequest, setCurrentRequest] = useState({});

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

  const filteredRequests = requests.filter((req) => {
    const query = searchQuery.toLowerCase();
    return (
      (selectedTab === "All" ||
        (selectedTab === "Active" &&
          req?.isActive &&
          req?.statusChangeCount !== 0) ||
        (selectedTab === "Inactive" &&
          !req?.isActive &&
          req?.statusChangeCount !== 0) ||
        (selectedTab === "New Requests" &&
          !req?.isActive &&
          req?.statusChangeCount === 0)) &&
      (req?.schoolName?.toLowerCase().includes(query) ||
        req?.city?.toLowerCase().includes(query) ||
        req?.state?.toLowerCase().includes(query) ||
        req?.country?.toLowerCase().includes(query))
    );
  });

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
      setShowConformationPopup(false);
    }
  };

  return (
    <div className="flex flex-row justify-between pt-4 bg-gray-50">
      <Toaster />
      {/* clients data */}
      <div className="w-full h-[500px] mx-5 bg-white rounded-[14px]">
        <div className="pt-5 px-5 text-[#040320] text-base font-semibold ">
          Client
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-4 mt-4">
            <div className="text-xs font-semibold w-[75px] text-center">
              Sort by
            </div>
            {["All", "Active", "Inactive", "New Requests"].map((tab) => (
              <div
                key={tab}
                className={`cursor-pointer text-xs font-semibold w-[85px] text-center ${
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
          <div>
            <button
              className="px-4 py-2 text-xs font-semibold border border-black text-black rounded-xl cursor-pointer "
              onClick={() => getAdmins()}
            >
              Refresh
            </button>
          </div>
        </div>

        <hr className="border-[#9391A5]/25 -translate-y-[1px]" />

        <section className="flex justify-between gap-2.5 pl-5 mt-2">
          <div className="flex items-center gap-2.5 py-2 px-4 bg-blue-50 rounded-2xl w-[410px] text-neutral-400">
            <input
              id="clientSearch"
              type="text"
              placeholder="Search by School Name, City, State, or Country"
              className="w-full bg-transparent focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Client Table */}
        {filteredRequests.length > 0 ? (
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-600">
                <th className="py-2 text-center px-4 border">Client</th>
                <th className="py-2 text-center px-4 border">City</th>
                <th className="py-2 text-center px-4 border">State</th>
                <th className="py-2 text-center px-4 border">Country</th>
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
                    {client?.schoolName}
                  </td>
                  <td className="py-2 px-4 text-center border">
                    {client?.city}
                  </td>
                  <td className="py-2 px-4 text-center border">
                    {client?.state}
                  </td>
                  <td className="py-2 px-4 text-center border">
                    {client?.country}
                  </td>
                  <td className="py-2 px-4 text-center border">
                    {client?.statusChangeCount}
                  </td>
                  <td className="py-2 px-4 text-center border">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        client?.isActive
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
                        src={view}
                        className="size-5 cursor-pointer"
                        alt=""
                        onClick={() =>
                          navigate("/adminProfile", {
                            state: client,
                          })
                        }
                      />
                      {client?.isActive ? (
                        <img
                          src={deleteicon}
                          className={`size-5 ${
                            client?.isActive
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
                          }`}
                          alt=""
                          onClick={() => {
                            setShowConformationPopup(true);
                            setCurrentRequest({
                              id: client?._id,
                              status: client?.isActive,
                            });
                          }}
                        />
                      ) : (
                        <img
                          src={active}
                          className={`size-5 ${
                            !client?.isActive
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
                          }`}
                          alt=""
                          onClick={() => {
                            setShowConformationPopup(true);
                            setCurrentRequest({
                              id: client?._id,
                              status: client?.isActive,
                            });
                          }}
                        />
                      )}
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
      <ConformationPopup
        isVisible={showConformationPopup}
        onClose={() => setShowConformationPopup(false)}
        onSubmit={() => {
          handleChangePermission(currentRequest?.id, currentRequest?.status);
        }}
        message={`Are you sure you want to ${
          currentRequest?.status ? "Pause" : "Restart"
        } this school`}
      />
    </div>
  );
}
