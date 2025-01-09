import { useState, useEffect, useRef } from "react";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";

interface BlogProps {
  id: string;
  title: string;
  content: string;
  author: string;
}

const Blog = ({ id, title, content, author }: BlogProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const blogRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    if (blogRef.current) {
      observer.observe(blogRef.current);
    }

    return () => {
      if (blogRef.current) {
        observer.unobserve(blogRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={blogRef}
      className={`w-full  mx-auto my-6 rounded-lg shadow-lg bg-gray-200 transition-transform duration-700 ease-out transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
     
      <div className="flex items-center p-4 border-b border-gray-700">
        <Avatar initials={author ? author[0].toUpperCase() : "N/A"} />
        <div className="ml-4">
          <p className="text-lg font-medium text-black">{author || "Unknown Author"}</p>
          <p className="text-sm text-gray-600">Published on: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

     
      <div className="p-6">
        <h2 className="text-2xl font-bold text-black mb-4">{title}</h2>
        <div>
          
        </div>
        <p className="text-black text-sm leading-relaxed">
          {content.length > 200 ? `${content.substr(0, 200)}...` : content}
        </p>
        <p className="mt-4 text-black">Read time: {Math.ceil(content.length / 100)} minutes</p>
      </div>

      
      <div className="p-4 bg-gray-200">
        <Link to={`/blog/${id}`}>
          <button className="w-25 py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-center transition-colors duration-200">
            ReadMore
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Blog;
