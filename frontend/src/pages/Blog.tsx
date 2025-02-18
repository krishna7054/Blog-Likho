import { useEffect } from "react";
import { FullBlog } from "../components/FullBlog";
import Navbar from "../components/Navbar";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Blog =()=>{

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
        }
      }, []);
    const {id}=useParams();
    const {loading,blog}= useBlog({
        id:id || ""
    });
    if(loading){
        return <div>
            
            <Navbar/>
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
            <Spinner/>
        </div>
        </div>
        </div>
    }

    if (!blog) {
        return <div className="flex justify-center font-semibold text-xl">No blog found</div>;
    }
   
    return <div>
       <FullBlog blog={blog} />
    </div>
}