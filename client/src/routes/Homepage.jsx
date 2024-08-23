import Searchbar from "../components/Searchbar";

export default function Homepage() {
    return (
        <main className="flex flex-col md:flex-row h-screen">
            <div className="basis-3/5">
                <div className="lg:pr-24 flex flex-col justify-center gap-y-12 h-full">
                    <h1 className="text-5xl md:text-6xl font-semibold">Make Our Hotel Your Getaway</h1>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. At sapiente tempora
                        modi dolore nisi laudantium cupiditate non deserunt quis consequatur! 
                        Dolore consectetur cumque fugiat soluta sunt fuga nulla dicta eaque.
                    </p>
                    <Searchbar />
                    <div className="hidden md:flex justify-between">
                        <div className="">
                            <h1 className="text-3xl font-semibold">30+</h1>
                            <h2 className="text-xl font-light">Years of Service</h2>
                        </div>
                        <div className="">
                            <h1 className="text-3xl font-semibold">6000+</h1>
                            <h2 className="text-xl font-light">Happy Customers</h2>
                        </div>
                        <div className="">
                            <h1 className="text-3xl font-semibold">40+</h1>
                            <h2 className="text-xl font-light">Lavish Rooms</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="basis-2/5 items-center bg-[#f0ebd8] relative hidden lg:flex">
                <img className="rounded-md absolute right-0" src="/houses.jpg" alt="" />
            </div>
        </main>
    )
}