import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    roomType: searchParams.get("type") || "",
    floor: searchParams.get("city") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || 10000000,
  });

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleFiltering = () => {
    setSearchParams(query);
  };
  return (
    <div className="flex flex-col gap-y-2.5">
      <h1 className="text-3xl font-light">
        Search results for <b>{searchParams.get("floor")} floor</b>
      </h1>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <label htmlFor="floor" className="text-sm">
            Floor
          </label>
          <input
            id="floor"
            name="floor"
            type="number"
            min={1}
            max={5}
            className="w-24 p-2 border border-[#a5abb4] rounded-sm"
            onChange={handleChange}
            defaultValue={query.floor}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="type" className="text-sm">
            Room Type
          </label>
          <select
            id="type"
            name="type"
            className="p-2 w-24 border border-[#a5abb4] rounded-sm"
            onChange={handleChange}
            defaultValue={query.roomType}
          >
            <option value="">any</option>
            <option value="buy">Single</option>
            <option value="rent">Double</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="minPrice" className="text-sm">
            Min Price
          </label>
          <input
            className="w-24 p-2 border border-[#a5abb4] rounded-sm"
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="maxPrice" className="text-sm">
            Max Price
          </label>
          <input
            className="w-24 p-2 border border-[#a5abb4] rounded-sm"
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>
        <button
          className="p-1 flex justify-center items-center text-3xl rounded-md text-[#f0ebd8] bg-[#1d2d44] w-28"
          onClick={handleFiltering}
        >
          <BsSearch />
        </button>
      </div>
    </div>
  );
}
