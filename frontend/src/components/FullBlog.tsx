import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"
import DOMPurify from "dompurify";
import Navbar from "./Navbar"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FullBlog=({blog}:{blog:Blog})=>{

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, []);
    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleDateString("en-GB"); // dd/mm/yyyy
      };

      const extractTitleAndContent = (htmlContent: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");
        
        const firstH1 = doc.querySelector("h1"); // Get the first <h1> tag
        let title = firstH1 ? firstH1.innerHTML : "Untitled"; // Extract title text
    
        // Remove the first <h1> tag from content
        if (firstH1) {
          firstH1.remove();
        }
        
        const remainingContent = doc.body.innerHTML; // Get the remaining HTML content
    
        return {
          title,
          content: remainingContent
        };
      };
    
      const { title, content: filteredContent } = extractTitleAndContent(blog.content);
   
    return <div>
    
    <Navbar/>
    <div className="flex justify-center ">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12 mt-10">
            <div className="col-span-8">
           

     {/* Title extracted from first <h1> */}
     <div className="text-5xl font-bold pt-2">
          {title}
        </div>

        {/* Remaining content after removing first <h1> */}
        <div
          className="mt-5 text-2xl text-gray-700"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(filteredContent),
          }}
        />
                <div className="text-slate-500 pt-2">
                   <span className="text-lg">Post on</span>   {formatDate(blog.publishedDate)}
                </div>
               
            </div>
            <div className="ml-20 mt-10 col-span-4 cursor-pointer transition-all duration-500 hover:translate-y-2 w-full h-fit bg-neutral-50 rounded-lg shadow-xl flex  items-center justify-evenly gap-4 px-4">
                
                <div className="  flex flex-col ">
                        <div className="bg-amber-400 rounded-full w-10 h-10 justify-center flex">
                        <Avatar  name={blog.author.name || "Anonymous"} size={"small"} />
                        </div>
                        
                    </div>
                <div className="flex flex-col w-full">
                <div className="text-slate-600 text-xl border-b-4">
                    Author
                </div>
                    <div>
                        <div className="text-xl font-bold">
                            {blog.author.name.toUpperCase() || "Anonymous"}
                        </div>
                        <div className="pt-2 text-slate-500">
                            Random catch phrase about the author's ability to grab the user's attention
                        </div>
                    </div>
                </div>  
            </div>
            
        </div>
    </div>
</div>
}