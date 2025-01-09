import { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import { UserRoundIcon, ArrowRight, PlusIcon, BookIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Profile = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const logOutHandler = () => {
        localStorage.removeItem("jwt");
        navigate("/signin");
    };

    const createPostHandler = () => {
        navigate("/create-post");
    };

    const closeProfileHandler = () => {
        setIsVisible(false);
        setTimeout(() => navigate("/blogs"), 300);
    };

    return (
        <>
            {isVisible && (
                <div className="fixed inset-0 z-30 bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        className={`relative h-auto w-[80vw] sm:w-[60vw] md:w-[50vw] p-6 bg-white z-40 rounded-3xl shadow-2xl transform transition-transform duration-500 ${
                            isVisible ? "translate-y-0" : "-translate-y-full"
                        }`}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 transition-all"
                            onClick={closeProfileHandler}
                        >
                            <X size={25} />
                        </button>

                        {/* Profile Header */}
                        <div className="flex justify-center items-center bg-gradient-to-r from-cyan-400 to-blue-500 p-6 rounded-2xl shadow-lg mb-6">
                            <UserRoundIcon className="text-black text-6xl" />
                            <div className="ml-6 text-black font-semibold text-2xl">
                                {user?.name.toUpperCase()}
                            </div>
                        </div>

                        {/* Create a Blog Card */}
                        <div
                            className="flex flex-col justify-between items-center p-6 rounded-2xl bg-white shadow-lg mb-6 cursor-pointer hover:shadow-xl transition-shadow"
                            onClick={createPostHandler}
                        >
                            <div className="text-3xl text-blue-500">
                                <PlusIcon />
                            </div>
                            <div className="font-semibold text-lg mt-4">Create a Blog</div>
                            <div className="text-gray-500 text-sm mt-2">
                                Start writing a new post and share it with the world.
                            </div>
                        </div>

                        {/* Your Posts Card */}
                        <div
                            className="flex flex-col justify-between items-center p-6 rounded-2xl bg-white shadow-lg mb-6 cursor-pointer hover:shadow-xl transition-shadow"
                            onClick={() => navigate("/my-posts")}
                        >
                            <div className="text-3xl text-green-500">
                                <BookIcon />
                            </div>
                            <div className="font-semibold text-lg mt-4">Your Posts</div>
                            <div className="text-gray-500 text-sm mt-2">
                                View and manage all the posts you've written.
                            </div>
                        </div>

                        {/* Log Out Card */}
                        <div
                            className="flex flex-col justify-between items-center p-6 rounded-2xl bg-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                            onClick={logOutHandler}
                        >
                            <div className="text-3xl text-red-500">
                                <ArrowRight />
                            </div>
                            <div className="font-semibold text-lg mt-4">Log Out</div>
                            <div className="text-gray-500 text-sm mt-2">
                                Log out from your account and return to the sign-in page.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
