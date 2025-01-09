import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://backend.golyanhimanshu.workers.dev/api/v1/blog/create-blog",
                {
                    title,
                    content,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("jwt"),
                    },
                }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            navigate("/blogs");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
                    Create a New Post
                </h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Title Input */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter your post title"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Content Input */}
                    <div>
                        <label
                            htmlFor="content"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your content here..."
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                            rows={6}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
                    >
                        Publish Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
