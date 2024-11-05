import React from 'react'
import BlogCard from "../Components/Blogcard"
import Appbar from '../Components/Appbar'
import {useBlogs} from "../hooks/index"

const Blogs = () => {

  const { loading, blogs } = useBlogs()

  if (loading) {
    return <div>Skeleton...</div>;
  }
  
  return (
    <div>
      <div className='flex justify-center'>
        <Appbar />
      </div>
      <div className="p-4 space-y-4">
        {blogs.map((blog, index) => (
          <div key={index}>
            <BlogCard
            id={blog.id}
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            PublishedDate={"22-OCt-2024"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
