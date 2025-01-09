import { useState, useEffect } from "react";
import Avatar from "./Avatar";
import Skeleton from './Skeleton';
import axios from "axios";
import Navbar from "./Navbar";
import { Ellipsis } from "lucide-react";
import EllipsePop from "./EllipsePop";

type MyPostsProps = {
  id: string;
  title: string;
  content: string;
  author: string;
  index: number;
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
  onPostDeleted: (id: string) => void;
  onPostUpdated: (id: string, updatedData: string) => void;
};

const MyPosts = ({ id, title, content, author, index, openIndex, setOpenIndex, onPostDeleted }: MyPostsProps) => {
  const isOpen = openIndex === index;

  const togglePopUp = () => {
    setOpenIndex(isOpen ? null : index);
  };

  return (
    <div className="relative">
      <div className="h-auto w-[90vw] mx-5 rounded-lg border border-gray-300 bg-white m-5 p-5 flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-200">
        <div className="flex justify-between items-center mb-3">
          <div className="flex justify-start items-center">
            <div>
              <Avatar initials={author ? author[0].toUpperCase() : "N/A"} />
            </div>
            <div className="text-gray-500 font-semibold pl-4">
              {author || "Unknown Author"}
            </div>
          </div>
          <div className="relative">
            <div className="flex cursor-pointer" onClick={togglePopUp}>
              <Ellipsis color="gray" size={30} />
            </div>
            {isOpen && (
              <div className="absolute right-10 top-full mt-2 z-20">
                <EllipsePop
                  postId={id}
                  onPostDeleted={onPostDeleted}
                  setOpenIndex={setOpenIndex}
                />
              </div>
            )}
          </div>
        </div>
        <div className="font-bold text-3xl text-gray-900 mb-2">
          {title}
        </div>
        <div className="font-medium text-lg text-gray-500 mb-4">
          {content.length > 200 ? `${content.slice(0, 200)}...` : content}
        </div>
        <div className="mt-auto text-gray-500">
          Read time: {Math.ceil(content.length / 100)} minutes
        </div>
      </div>
    </div>
  );
};

interface MyPostsData {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

export function MyPostsArray() {
  const [blogs, setBlogs] = useState<MyPostsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const blogsHandler = async () => {
      try {
        const response = await axios.get(
          "https://backend.golyanhimanshu.workers.dev/api/v1/blog/my-blogs",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    blogsHandler();
  }, []);

  const handlePostDeleted = (deletedPostId: string) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== deletedPostId));
    setOpenIndex(null);
  };

  const handlePostUpdated = (updatedPostId: string, updatedData: any) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === updatedPostId ? { ...blog, ...updatedData } : blog
      )
    );
    setOpenIndex(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div>
        <Navbar />
        <div className="pt-[20vh] mx-[3%]">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} />
            ))
          ) : (
            blogs.map((item, index) => (
              <MyPosts
                key={index}
                id={item.id}
                title={item.title}
                content={item.content}
                author={item.author.name}
                index={index}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
                onPostDeleted={handlePostDeleted} 
                onPostUpdated={handlePostUpdated}  
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
