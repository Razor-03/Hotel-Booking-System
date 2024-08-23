import Card from "../components/Card";
import Filter from "../components/Filter";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

export default function RoomsListPage() {
  const data = useLoaderData();
  return (
    // <div className="flex h-full overflow-hidden">
      <div className="lg:pr-24 flex flex-col gap-20 h-full">
        <Filter />
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
                <Card key={postResponse.id} item={item} />
              ))
            }
          </Await>
        </Suspense>
      </div>
    // </div>
  );
}
