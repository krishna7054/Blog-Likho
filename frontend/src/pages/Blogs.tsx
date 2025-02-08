
import { BlogCard } from "../components/BlogCard"
// import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useEffect } from "react";
import {  useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";



export const Blogs =()=>{
    const {loading, blogs}=useBlogs();

    const navigate= useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
        }
      }, []);
    
    if(loading){
        return <div>
            {/* <Appbar />  */}
            <Navbar/>
            <div className="flex justify-center">
            <div>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            </div>
        </div>
        </div>
    }
    return <div>
        {/* <Appbar/> */}
        <Navbar/>
        {/* <Logo/> */}
        
    <div className=" flex justify-center" >
        <div>
    <div >
        {blogs.map(blog=> <BlogCard  
        id={blog.id}
        authorName ={blog.author.name || "Anonymous"}
        title={blog.title}
        content={blog.content}
        publishedDate={"2024-08-02"}
        />)}
      
    </div>
    </div>
    </div>
    </div>
}