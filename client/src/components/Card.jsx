import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Card({ item }) {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="flex flex-wrap">
      <div className="max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow">
        <Link to={`/${item._id}`}>
          <img
            className="w-full h-48 object-cover"
            src={item.roomImages[0]}
            alt=""
          />
        </Link>
        <div className="p-5">
          <Link to={`/${item._id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 relative">
              Room #{item.roomNo}
              <span className="font-light text-base absolute right-0">
                {item.roomType}
              </span>
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700">{item.description}</p>
          <Link
            to={`/${item._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#1d2d44] rounded-lg hover:bg-[#2d2f44]"
          >
            Details
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
          {(currentUser && currentUser.role === "admin") && (
            <Link
              to={`/updateEmployee/${item._id}`}
              className="ms-8 inline-flex items-center px-3 py-2 mt-2 text-sm font-medium text-center text-white bg-[#1a9234] rounded-lg hover:bg-[#1b5e29]"
            >
              Update
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
