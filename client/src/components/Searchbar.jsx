import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Searchbar() {
  const [query, setQuery] = useState({
    minPrice: 0,
    maxPrice: 0,
    floor: 1,
  });

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="">
      <form
        action=""
        className="flex flex-col gap-y-2 mt-2 md:mt-0 md:flex-row justify-between md:border md:border-[#a5abb4] md:h-16"
      >
        <input
          type="number"
          name="floor"
          min={1}
          max={5}
          placeholder="Floor #"
          className="p-2 border border-x-0 border-t-0 border-b-[#a5abb4] md:border-0 md:flex-auto md:w-40 md:px-2"
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          min={0}
          max={1000000000}
          className="p-2 border border-x-0 border-t-0 border-b-[#a5abb4] md:border-0 md:w-20 md:flex-auto md:px-2"
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          min={10}
          max={1000000000}
          className="p-2 border border-x-0 border-t-0 border-b-[#a5abb4] md:border-0 md:w-20 md:flex-auto md:px-2"
          onChange={handleChange}
        />
        <Link
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
          className="flex justify-center items-center bg-[#1d2d44]"
        >
          <button className="px-4 text-3xl p-2 text-[#f0ebd8] flex-1 md:max-w-20">
            <BsSearch />
          </button>
        </Link>
      </form>
    </div>
  );
}
