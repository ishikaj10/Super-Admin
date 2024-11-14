import React, { useState } from "react";
import edit from "../assets/images/edit.png";
import deleteicon from "../assets/images/delete.png";
import view from "../assets/images/view.png";
import FilterContainer from "./filter/filter";

export default function Client() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [requests, setRequests] = useState([
    {
      id: 1,
      country: "USA",
      state: "California",
      city: "Los Angeles",
      status: "Active",
    },
    {
      id: 2,
      country: "Canada",
      state: "Ontario",
      city: "Toronto",
      status: "Inactive",
    },
    { id: 3, country: "UK", state: "London", city: "London", status: "Active" },
  ]);

  const filteredRequests =
    selectedTab === "All"
      ? requests
      : selectedTab === "Active"
      ? requests.filter((req) => req.status === "Active")
      : selectedTab === "Inactive"
      ? requests.filter((req) => req.status === "Inactive")
      : requests;

  return (
    <div className="flex flex-row justify-between pt-4 bg-gray-50">
      {/* filter */}
      <div className="w-[20%] h-[500px] bg-white">
        <FilterContainer />
      </div>

      {/* clients data */}
      <div className="w-[78%] h-[500px] bg-white">
        <div className="pt-2 pl-4">Client</div>

        <div className="flex space-x-4 mt-4">
          <div className="text-xs font-semibold w-[75px] text-center">
            Sort by
          </div>
          {["All", "Active", "Inactive"].map((tab) => (
            <div
              key={tab}
              className={`cursor-pointer text-xs font-semibold w-[75px] text-center ${
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
          <div className="flex items-center gap-2.5 py-2 pr-4 bg-blue-50 rounded-2xl w-[410px] text-neutral-400">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/397260c6dace147fe4b2545df7c423ddfb04a53f39978afd337c8774f24443b2?placeholderIfAbsent=true&apiKey=a8cc6c1bf626485c842deb8f5c2a2105"
              alt="Client Search Icon"
              className="w-3.5 aspect-square"
            />
            <input
              id="clientSearch"
              type="text"
              placeholder="Search for clients"
              className="w-[125px] bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex space-x-2 mx-2">
            <button className="flex items-center gap-2.5 px-5 py-2 text-base font-medium text-indigo-800 border border-indigo-800 rounded-md">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/513ae235eac2c3f950de7e74df2607570e50304e941a5805e851e39d1faf75a1?placeholderIfAbsent=true&apiKey=a8cc6c1bf626485c842deb8f5c2a2105"
                alt="Export Icon"
                className="w-3 aspect-[0.6]"
              />
              Export
            </button>
            <button className="px-4 py-2.5 text-base font-medium text-white bg-indigo-700 rounded-md">
              Add School
            </button>
          </div>
        </section>

        {/* Client Table */}
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="py-2 text-center px-4 border">Client</th>
              <th className="py-2 text-center px-4 border">Country</th>
              <th className="py-2 text-center px-4 border">State</th>
              <th className="py-2 text-center px-4 border">City</th>
              <th className="py-2 text-center px-4 border">Status</th>
              <th className="py-2 text-center px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((client) => (
              <tr key={client.id} className="text-sm text-gray-700">
                <td className="py-2 px-4 text-center border">
                  Client {client.id}
                </td>
                <td className="py-2 px-4 text-center border">
                  {client.country}
                </td>
                <td className="py-2 px-4 text-center border">{client.state}</td>
                <td className="py-2 px-4 text-center border">{client.city}</td>
                <td className="py-2 px-4 text-center border">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      client.status === "Active"
                        ? "bg-indigo-200 text-[#4834d4]"
                        : "bg-red-100 text-[#d91111]"
                    }`}
                  >
                    {client.status}
                  </span>
                </td>
                <td className="py-2 px-4 border">
                  <div className="flex justify-evenly">
                    <img src={deleteicon} className="size-5" alt="" />
                    <img src={view} className="size-5" alt="" />
                    <img src={edit} className="size-5" alt="" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
