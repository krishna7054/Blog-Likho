// import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import Navbar from "../components/Navbar";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
export const Blog =()=>{
    const {id}=useParams();
    const {loading,blog}= useBlog({
        id:id || ""
    });
    if(loading){
        return <div>
            {/* <Appbar/> */}
            <Navbar/>
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
            <Spinner/>
        </div>
        </div>
        </div>
    }

    if (!blog) {
        return <div>No blog found</div>;
    }
   
    return <div>
       <FullBlog blog={blog} />
    </div>
}