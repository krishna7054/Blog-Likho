
import { BlogCard } from "../components/BlogCard"
// import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useEffect } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom"
import Navbar from "../components/Navbar";



export const Blogs =()=>{
    const {loading, blogs}=useBlogs();
    const navigate= useNavigate();
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("search")?.toLowerCase() || "";

    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
        }
      }, []);

      const filteredBlogs = blogs.filter(blog =>
        
        blog.content.toLowerCase().includes(searchTerm)
      );
    
    if(loading){
        return <div>
            {/* <Appbar />  */}
            <Navbar/>
            <div className="flex justify-center">
            <div>{[...Array(5)].map((_, i) => <BlogSkeleton key={i} />)}</div>
        </div>
        </div>
    }
    return <div>
        {/* <Appbar/> */}
        <Navbar/>
        {/* <Logo/> */}
        
    <div className=" flex justify-center " >
        <div className="mt-10 pt-10">
    {/* <div >
        {blogs.map(blog=> <BlogCard  
        id={blog.id}
        authorName ={blog.author.name || "Anonymous"}
       
        content={blog.content}
        publishedDate={blog.publishedDate}
        />)}
      
    </div> */}
      {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                content={blog.content}
                publishedDate={blog.publishedDate}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">No blogs found.</p>
          )}
    </div>
    </div>
    </div>
}