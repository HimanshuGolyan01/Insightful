import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LoaderCircle } from "lucide-react"; // Import LoaderCircle
import Navbar from "../Navbar";
import Avatar from "../Avatar";

interface BlogData {
  title: string;
  content: string;
  author: {
    name: string;
  };
}

function BlogDetail() {
  const { id } = useParams<{ id: string }>(); // Get the blog post ID from the URL
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://backend.golyanhimanshu.workers.dev/api/v1/blog/get-blog/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen text-gray-200 min-w-full flex justify-center items-center">
        <LoaderCircle className="animate-spin text-cyan-700" size={48} />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200 text-white">
        Blog post not found
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-gray-200 max-w-full max-h-full mb-10">
      <Navbar />
      <div className="flex justify-center pt-[5rem]">
        <div className="bg-gray-200 w-full w-[75rem] rounded-lg shadow-lg overflow-hidden mt-5"> 
         
          <div className="bg-gradient-to-r from-purple-700 to-blue-700 p-6 text-center">
            <h1 className="text-3xl font-bold text-white">{blog.title}</h1>
            <p className="text-sm text-gray-300 mt-2">
              Written by{" "}
              <span className="font-medium">
                {blog.author?.name || "Unknown Author"}
              </span>
            </p>
          </div>

          {/* Blog Content */}
          <div className="p-6">
            <div className="flex items-center mb-6">
              <Avatar
                initials={
                  blog.author?.name ? blog.author.name[0].toUpperCase() : "N/A"
                }
              />
              <p className="ml-4 text-sm text-black">
                Author: {blog.author?.name || "Unknown"}
              </p>
            </div>
            <p className="text-lg leading-relaxed text-black whitespace-pre-wrap">
              {blog.content}
            </p>
          </div>

          {/* Footer */}
          <div className="bg-gray-700 p-4 text-sm text-gray-400">
            Estimated read time:{" "}
            <span className="text-black font-semibold">
              {Math.ceil(blog.content.length / 100)} minutes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
