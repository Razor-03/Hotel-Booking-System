import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest";

export default function Register() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const contact = formData.get("contact");
        const email = formData.get("email");
        const password = formData.get("password");
        try {
            await apiRequest.post("/auth/register", { username, email, contact, password });
            navigate("/login");
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {/* Include your flash partial component here */}
                {/* <FlashMessages /> */}

                <form className="space-y-6" action="/login" method="POST" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input id="username" name="username" type="text" autoComplete="off" required className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">E-mail</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="off" required className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="contact" className="block text-sm font-medium leading-6 text-gray-900">Contact</label>
                        <div className="mt-2">
                            <input id="contact" name="contact" type="text" autoComplete="off" required className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={isLoading} className="flex w-full justify-center rounded-md bg-[#1d2d44] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1d1d44] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
                        {error && <p className="text-red-500 text-sm text-center my-2">{error}</p>}
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already a member?
                    <Link to="/login" className="font-semibold leading-6 text-[#1d2d44] hover:text-[#1d1d44]"> Login</Link>
                </p>
            </div>
        </div>
    );
}