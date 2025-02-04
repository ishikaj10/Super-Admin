import React, { useState, useEffect } from "react";
import Countries from "../../utils/Countries.json";
import StatesAndDistricts from "../../utils/StatesAndDistricts.json";

export default function FilterContainer() {
  const [filters, setFilters] = useState({
    Countries: [],
    State: [],
    District: [],
  });
  const [searchTerms, setSearchTerms] = useState({
    Countries: "",
    State: "",
    District: "",
  });
  const [showAll, setShowAll] = useState({
    Countries: false,
    State: false,
    District: false,
  });

  const handleClearAll = () => {
    setFilters({ Countries: [], State: [], District: [] });
    setSearchTerms({ Countries: "", State: "", District: "" });
    setShowAll({ Countries: false, State: false, District: false });
  };

  const getStatesByCountry = (country) =>
    country === "India"
      ? StatesAndDistricts.states.map((state) => state.state)
      : [];

  const getDistrictsByStates = (states) => {
    const validStates = Array.isArray(states) ? states : [];
    const districts = validStates.flatMap((state) => {
      const stateData = StatesAndDistricts.states.find(
        (s) => s.state === state
      );
      return stateData ? stateData.districts : [];
    });

    return [...new Set(districts)];
  };

  const handleCheckboxChange = (title, item) => {
    setFilters((prevFilters) => {
      const currentItems = prevFilters[title] || [];
      return {
        ...prevFilters,
        [title]: currentItems.includes(item)
          ? currentItems.filter((i) => i !== item)
          : [...currentItems, item],
      };
    });
  };

  useEffect(() => {
    if (filters.Countries.length === 0) {
      setFilters((prev) => ({ ...prev, State: [], District: [] }));
    }
  }, [filters.Countries]);

  useEffect(() => {
    if (filters.State.length === 0) {
      setFilters((prev) => ({ ...prev, District: [] }));
    }
  }, [filters.State]);

  const renderFilter = (
    title,
    items,
    term,
    onChange,
    selectedItems,
    showMore,
    setShowMore
  ) => (
    <div className="flex flex-col px-5 mt-3 w-full text-xs text-slate-950 max-h-48 overflow-y-auto scrollbar-custom">
      <h3 className="text-sm font-bold">{title}</h3>
      <input
        type="text"
        placeholder={`Search ${title.toLowerCase()}`}
        value={term}
        onChange={(e) => onChange(e.target.value)}
        className="border-b focus:outline-none text-xs text-zinc-400 mt-2.5"
      />
      {items
        .filter((item) => item.toLowerCase().includes(term.toLowerCase()))
        .slice(0, showMore ? items.length : 5)
        .map((item, idx) => (
          <label
            key={idx}
            className="flex items-center gap-2 mt-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() => handleCheckboxChange(title, item)}
              className="mr-2"
            />
            <span>{item}</span>
          </label>
        ))}
      {items.length > 5 && (
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="mt-2 text-indigo-700"
        >
          {showMore ? "Show less" : "+ more"}
        </button>
      )}
    </div>
  );

  return (
    <section className="flex flex-col pt-5 bg-white rounded-2xl max-w-[261px] h-screen overflow-hidden">
      <header className="flex gap-5 justify-between w-full px-5">
        <h2 className="text-base font-bold text-slate-950">Filters</h2>
        <button
          onClick={handleClearAll}
          className="text-sm font-semibold text-indigo-700"
        >
          Clear all
        </button>
      </header>
      <hr className="mt-5 border-zinc-400" />

      {/* Country Filter */}
      {renderFilter(
        "Countries",
        Countries.map((country) => country.name),
        searchTerms.Countries,
        (term) => setSearchTerms((prev) => ({ ...prev, Countries: term })),
        filters.Countries,
        showAll.Countries,
        (show) => setShowAll((prev) => ({ ...prev, Countries: show }))
      )}

      {/* State Filter */}
      {filters.Countries.length > 0 &&
        renderFilter(
          "State",
          getStatesByCountry(filters.Countries[0] || ""),
          searchTerms.State,
          (term) => setSearchTerms((prev) => ({ ...prev, State: term })),
          filters.State,
          showAll.State,
          (show) => setShowAll((prev) => ({ ...prev, State: show }))
        )}

      {/* District Filter */}
      {filters.State.length > 0 &&
        renderFilter(
          "District",
          getDistrictsByStates(filters.State),
          searchTerms.District,
          (term) => setSearchTerms((prev) => ({ ...prev, District: term })),
          filters.District,
          showAll.District,
          (show) => setShowAll((prev) => ({ ...prev, District: show }))
        )}
    </section>
  );
}
