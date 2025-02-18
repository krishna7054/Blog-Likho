import {  useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Navbar from "../components/Navbar";
import TextEditor from "../components/TextEditor";
import { toast } from "react-toastify";

export const Publish =()=>{
    const location = useLocation();
    const blogData = location.state?.blog || null;
    const [title] = useState(blogData?.title || "");
    const [description, setDescription] = useState(blogData?.content || "");
    const navigate = useNavigate();

     useEffect(() => {
            const token = localStorage.getItem("token");
            if (!token) {
              navigate("/signin");
            }
          }, []);


    const handlePublish = async () => {
        try {
            const storedToken = localStorage.getItem("token");
            const token = storedToken ? JSON.parse(storedToken).jwt : null;

            if (blogData) {
                // Update existing blog
                await axios.put(`${BACKEND_URL}/api/v1/blog/${blogData.id}`, {
                    title,
                    content: description
                }, {
                    headers: { Authorization: token }
                });
            }else{
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description
            }, {
                headers: {
                    Authorization: token
                }
            });
            navigate(`/blog/${response.data.id}`);
            toast.success("Post Published Successfully", { position: "bottom-right", autoClose: 3000 });
            return;
        }

        navigate(`/blog/${blogData?.id || ""}`);
        toast.success("Post Updated Successfully", { position: "bottom-right", autoClose: 300});
        } catch (error) {
            
            toast.error("Error publishing post", { position: "bottom-right", autoClose: 300});
        }
    };

    return <div>
       
        <Navbar onPublish={handlePublish}/>
        <div className="flex justify-center w-full pt-8"> 
            <div className="max-w-screen-lg w-full">


<TextEditor onChange={setDescription} initialContent={description} />

               
            </div>
        </div>
        <footer className="flex justify-center mt-96">Select Your Text and Edit and Generate your Text  </footer>
        
    </div>
}


