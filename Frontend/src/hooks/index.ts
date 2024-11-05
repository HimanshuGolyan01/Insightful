import { useEffect, useState } from "react";
import axios from 'axios';

export interface Blogs {
    content: string;
    title: string;
    id: string;
    author: {
      name: string;
    };
}

export const useBlogs = () => {
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("https://backend.golyanhimanshu.workers.dev/api/v1/blog/bulk", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setBlogs(response.data.posts);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return { loading, blogs };
};
