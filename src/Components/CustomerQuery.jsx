import React, { useEffect, useState } from "react";
import refresh from "../assets/images/refresh.png";
import view from "../assets/images/view.png";
import { axiosClient } from "../services/axiosClient";
import EndPoints from "../services/EndPoints";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import QueryView from "./QueryView";
import Breadcrumbs from "./BreadCrumbs";

export default function CustomerQuery() {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [showQueryPopup, setShowQueryPopup] = useState(false);
  const [currentQuery, setCurrentQuery] = useState([]);

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

  // Load admins data when component mounts
  useEffect(() => {
    getQuery();
  }, []);

  return (
    <div className="flex flex-row justify-between pt-4 bg-gray-50">
      <Toaster />
      {/* clients data */}
      <div className="w-full h-[500px] mx-5 bg-white rounded-[14px]">
        <div className="pt-5 px-5 text-[#040320] text-base font-semibold ">
          <Breadcrumbs />
          Customer Query
        </div>

        <div className="flex justify-end items-center mx-2">
          <div className="pb-3">
            <button
              className="flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => getQuery()}
            >
              Refresh
              <img src={refresh} alt="Refresh" className="w-3 h-3 ml-2" />
            </button>
          </div>
        </div>

        <hr className="border-[#9391A5]/25 -translate-y-[1px]" />

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
