import React, { useEffect, useState } from "react";
import active from "../assets/images/active.png";
import deleteicon from "../assets/images/delete.png";
import view from "../assets/images/view.png";
import { axiosClient } from "../services/axiosClient";
import EndPoints from "../services/EndPoints";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import QueryView from "./QueryView";

export default function CustomerQuery() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("All");
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  const [showQueryPopup, setShowQueryPopup] = useState(false);
  const [currentQuery, setCurrentQuery] = useState([]);
  // const [currentRequest, setCurrentRequest] = useState({});

  // Fetches the admin list from the server
  const getQuery = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(EndPoints.CUSTOMER_QUERY);
      if (response?.statusCode === 200) {
        // console.log(response.result.queries);
        setRequests(response?.result?.queries || []);
      }
    } catch (e) {
      toast.error(e);
    } finally {
      setLoading(false);
    }
  };
  // console.log(requests);

  // Load admins data when component mounts
  useEffect(() => {
    getQuery();
  }, []);

  // const filteredRequests = requests.filter((req) => {
  //   const query = searchQuery.toLowerCase();
  //   return (
  //     (selectedTab === "All" ||
  //       (selectedTab === "Active" &&
  //         req?.isActive &&
  //         req?.statusChangeCount !== 0) ||
  //       (selectedTab === "Inactive" &&
  //         !req?.isActive &&
  //         req?.statusChangeCount !== 0) ||
  //       (selectedTab === "New Requests" &&
  //         !req?.isActive &&
  //         req?.statusChangeCount === 0)) &&
  //     (req?.schoolName?.toLowerCase().includes(query) ||
  //       req?.city?.toLowerCase().includes(query) ||
  //       req?.state?.toLowerCase().includes(query) ||
  //       req?.country?.toLowerCase().includes(query))
  //   );
  // });

  // const handleChangePermission = async (id, status) => {
  //   try {
  //     setLoading(true);
  //     const response = await axiosClient.put(
  //       `${EndPoints.CHANGE_PERMISSION}/${id}`,
  //       { active: !status }
  //     );
  //     if (response?.statusCode === 200) {
  //       toast.success(response?.result);
  //       getAdmins();
  //     }
  //   } catch (e) {
  //     toast.error(e);
  //   } finally {
  //     setLoading(false);
  //     setShowConformationPopup(false);
  //   }
  // };

  return (
    <div className="flex flex-row justify-between pt-4 bg-gray-50">
      <Toaster />
      {/* clients data */}
      <div className="w-full h-[500px] mx-5 bg-white rounded-[14px]">
        <div className="pt-5 px-5 text-[#040320] text-base font-semibold ">
          Customer Query
        </div>

        <div className="flex justify-end items-center mx-2">
          {/* <div className="flex space-x-4 mt-4">
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
          </div> */}
          <div className="pb-3">
            <button
              className="px-4 py-2 text-xs font-semibold border border-black text-black rounded-xl cursor-pointer "
              onClick={() => getQuery()}
            >
              Refresh
            </button>
          </div>
        </div>

        <hr className="border-[#9391A5]/25 -translate-y-[1px]" />

        {/* <section className="flex justify-between gap-2.5 pl-5 mt-2">
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
        </section> */}

        {/* Client Table */}
        {requests.length > 0 ? (
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-600">
                <th className="py-2 text-center px-4 border">School Name</th>
                <th className="py-2 text-center px-4 border">Email</th>
                <th className="py-2 text-center px-4 border">Phone</th>
                <th className="py-2 text-center px-4 border">City</th>
                <th className="py-2 text-center px-4 border">State</th>
                <th className="py-2 text-center px-4 border">Action</th>
                {/* <th className="py-2 text-center px-4 border">Status</th> */}
              </tr>
            </thead>
            <tbody>
              {requests?.map((client, index) => (
                <tr key={index} className="text-sm text-gray-700">
                  <td className="py-2 px-4 text-center border">
                    {client?.schoolName}
                  </td>
                  <td className="py-2 px-4 text-center border">
                    {client?.email}
                  </td>
                  <td className="py-2 px-4 text-center border">
                    {client?.phone}
                  </td>
                  <td className="py-2 px-4 text-center border">
                    {client?.city}
                  </td>
                  <td className="py-2 px-4 text-center border">
                    {client?.state}
                  </td>

                  <td className="py-2 px-4 border">
                    <div className="flex justify-evenly">
                      <img
                        src={view}
                        className="size-5 cursor-pointer"
                        alt=""
                        onClick={() => {
                          setShowQueryPopup(true);
                          setCurrentQuery(client);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex h-[300px] w-full justify-center items-center">
            <div className="text-3xl">No Querys Right Now</div>
          </div>
        )}
      </div>
      <QueryView
        data={currentQuery}
        isVisible={showQueryPopup}
        onClose={() => setShowQueryPopup(false)}
      />
    </div>
  );
}
