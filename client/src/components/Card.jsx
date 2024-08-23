import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";

export default function Card({ item }) {
    return (
        <div className="flex gap-x-6">
            <Link to={`/${item.id}`} className="basis-2/5 h-48">
                <img src={item.images[0]} alt="" className="w-full h-full object-cover rounded-md" />
            </Link>
            <div className="basis-3/5 flex flex-col justify-between gap-2">
                <h2 className="text-lg font-semibold text-[#253344] transition ease-linear duration-100 hover:text-[#0d1b2a] hover:scale-105">
                    <Link to={`/${item.id}`}>{item.roomNo}</Link>
                </h2>
                <p className="flex items-center gap-1 text-[#778da9]">
                    <IoLocationOutline />
                    <span className="">{item.floor}</span>
                </p>
                <p className="text-lg font-light p-1 px-2 bg-[#ffe6a7] rounded-md w-max">
                    <span>$ {item.pricePerNight}</span>
                </p>
            </div>
        </div>
    );
}