import axios from "axios";
import { ReactNode, useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog{
    publishedDate: string;
    "content":string,
    "title":string,
    "id":string,
    "author":{
        "name":string
    }  
}

export const useBlog = ({id}: {id:string})=>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    const [error, setError] = useState(null);
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const token = storedToken ? JSON.parse(storedToken).jwt : null;
        console.log("Token:", token);
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: token
            }
        })
        .then(response => {
            setBlog(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.log("Token:", localStorage.getItem("token"));

            console.error("Error fetching blogs:", error);
            setError(error);
            setLoading(false);
        });
    }, [id]);

    return {
        loading,
        blog,
        error
    };
}

export const useBlogs=()=>{
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const token = storedToken ? JSON.parse(storedToken).jwt : null;
        console.log("Token:", token);
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: token
            }
        })
        .then(response => {
            setBlogs(response.data.posts);
            setLoading(false);
        })
        .catch(error => {
            console.log("Token:", localStorage.getItem("token"));

            console.error("Error fetching blogs:", error);
            setError(error);
            setLoading(false);
        });
    }, []);

    return {
        loading,
        blogs,
        error
    };
}
   
export interface User {
    [x: string]: ReactNode;
    name: string;
    email: string;
  }
  
  export const useUsers = () => {
    const [Users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      const token = storedToken ? JSON.parse(storedToken).jwt : null;
  
      axios
        .get(`${BACKEND_URL}/api/v1/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUsers([response.data]); // Store user data as an array
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          setError("Failed to load user data");
          setLoading(false);
        });
    }, []);
    return { Users, loading, error };
};
