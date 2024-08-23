import { useLoaderData } from "react-router-dom";
// import Reviews from "../components/Reviews";
import RoomInfo from "../components/RoomInfo";
import Slider from "../components/Slider";

export default function RoomDetailsPage() {
    const room = useLoaderData();
    console.log(room);
    return (
        <div className="flex flex-col h-full lg:flex-row mt-4">
            <div className="basis-8/12 details block lg:flex">
                <div className="flex flex-row justify-center gap-y-12 h-full">
                    <div className="basis-11/12">
                        <Slider images={room.roomImages} />
                        <RoomInfo room={room} />
                    </div>
                    {/* <div className="basis-1/5"></div> */}
                </div>
                <div className="">
                    
                </div>
            </div>
            <div className="basis-4/12 bg-[#f0ebd8] rounded-sm lg:mt-0 py-4">
                <div className="flex flex-col px-6 gap-y-12 h-full">
                    {/* <Reviews room={room}/> */}
                </div>
            </div>
        </div>
    )
}