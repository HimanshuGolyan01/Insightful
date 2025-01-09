import axios from "axios";
import React, { useState, useEffect } from "react";

interface UpdatePostProps {
    postId: string,
    onClose: () => void,
}

const UpdatePost = ({ postId, onClose }: UpdatePostProps) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`https://backend.golyanhimanshu.workers.dev/api/v1/blog/get-blog/${postId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("jwt"),
                    },
                });
                const postData = response.data;
                setTitle(postData.title);
                setContent(postData.content);
            } catch (error) {
                console.log("Error fetching post data:", error);
            }
        };

        fetchPostData();
    }, [postId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const jwt = localStorage.getItem("jwt");
            if (!jwt) {
                throw new Error("No JWT found, please sign in.");
            }

            const response = await axios.put(
                "https://backend.golyanhimanshu.workers.dev/api/v1/blog/update-blog",
                {
                    id: postId,
                    title: title,
                    content: content,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log(response);
        } catch (error) {
            console.error("Error updating post:", error);
        } finally {
            onClose();
        }
    };

    return (
        <div className="bg-white min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Update the Post</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                <div>
                    <label className="block font-bold mb-2 text-gray-700">Title</label>
                    <textarea
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border-2 rounded-lg bg-white text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your post title"
                        required
                    />
                </div>
                <div>
                    <label className="block font-bold mb-2 text-gray-700">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-3 border-2 rounded-lg h-32 bg-white text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your content here"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default UpdatePost;
