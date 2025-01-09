import { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Blog from './Blog';
import axios from 'axios';
import Skeleton from '../Skeleton';

interface BlogData {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

function Blogs() {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const blogsHandler = async () => {
      try {
        const response = await axios.get(
          "https://backend.golyanhimanshu.workers.dev/api/v1/blog/bulk",
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

  return (
    <div className="bg-gray-400 min-h-screen overflow-hidden">
      <div>
        <Navbar />
        <div className="pt-[15vh] mx-[1%]">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} />
            ))
          ) : (
            blogs.map((item, index) => (
              <Blog
                key={index}
                id={item.id}
                title={item.title}
                content={item.content}
                author={item.author.name}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
