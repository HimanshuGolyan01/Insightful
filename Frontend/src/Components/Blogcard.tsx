import React from 'react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
    id : number,
  authorName: string;
  title: string;
  content: string;
  PublishedDate: string;
}

const Blogcard = ({
    id,
  authorName,
  title,
  content,
  PublishedDate
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}> 
    <div className="max-w-full mx-9 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-5 my-9">
      <div className="flex items-center mb-4">
        <Avatar name={authorName} />
        <div className="ml-3 text-sm text-gray-600">
          <span className="font-semibold">{authorName? authorName : "Anonymous"}</span>
          <span className="mx-1 text-gray-400">•</span>
          <span>{PublishedDate}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2 font-rubik">{title}</h3>
      <p className="text-gray-600 mb-4 font-light">{content.slice(0, 100) + "..."}</p>
      <div className="text-sm text-gray-500">{`${Math.ceil(content.length / 100)} min read`}</div>
      <div className="bg-slate-200 h-1 w-full mt-4 rounded-full"></div>
    </div>
    </Link>
  );
};

export function Avatar({ name }: { name: string }) {
    console.log("name", name)
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
      <span className="font-medium text-gray-700">{name ? name[0] : "A"}</span>
    </div>
  );
}

export default Blogcard;
