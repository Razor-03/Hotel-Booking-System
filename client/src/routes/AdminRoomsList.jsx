import Card from "../components/Card";
import { Await, useLoaderData } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Suspense, useState } from "react";

export default function AdminRoomsList() {
  const data = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({roomNo: searchParams.get("roomNo")});

  const handleChange = (e) => {
    setQuery({ roomNo: e.target.value });
  };

  const handleFiltering = () => {
    setSearchParams(query);
  };

  return (
    <div className="lg:pr-24 flex flex-col gap-20 h-full">
      <div className="flex items-center flex-col">
          <label htmlFor="roomNo" className="text-base font-semibold">
            Room Number
          </label>
          <input
            id="roomNo"
            name="roomNo"
            type="number"
            className="w-64 p-2 border border-[#a5abb4] rounded-sm"
            onChange={handleChange}
            defaultValue={query.roomNo}
          />
            <button
                onClick={handleFiltering}
                className="mt-4 px-4 py-2 text-white bg-[#1d2d44] rounded-lg"
            >Search</button>
        </div>
      <div className="flex h-full">
        <div className="flex gap-12 lg:gap-32 flex-wrap justify-center">
          <Suspense fallback={<div className="">Loading...</div>}>
            <Await
              resolve={data.postResponse}
              errorElement={
                <div className="font-bold text-red-500">
                  Error loading posts...
                </div>
              }
            >
              {(postResponse) =>
                postResponse.data.map((item) => (
                  <Card key={postResponse._id} item={item} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
