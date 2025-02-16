import { ChangeEvent, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Navbar from "../components/Navbar";
import TextEditor from "../components/TextEditor";

export const Publish =()=>{
    const location = useLocation();
    const blogData = location.state?.blog || null;
    const [title, setTitle] = useState(blogData?.title || "");
    const [description, setDescription] = useState(blogData?.content || "");
    const navigate = useNavigate();


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
            return;
        }

        navigate(`/blog/${blogData?.id || ""}`);
        } catch (error) {
            console.error("Error publishing post:", error);
        }
    };

    return <div>
        {/* <Appbar /> */}
        <Navbar onPublish={handlePublish}/>
        <div className="flex justify-center w-full pt-8"> 
            <div className="max-w-screen-lg w-full">
                {/* <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Title" /> */}

<TextEditor onChange={setDescription} initialContent={description} />

                {/* <button onClick={async () => {
                            const storedToken = localStorage.getItem("token");
                            const token = storedToken ? JSON.parse(storedToken).jwt : null;
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title,
                        content: description
                    }, {
                        
                        headers: {
                            
                            Authorization: token
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Publish post
                </button> */}
            </div>
        </div>
        <footer className="flex justify-center mt-96">Select Your Text and Edit and Generate your Text  </footer>
        
    </div>
}


// function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
//     return <div className="mt-2">
//         <div className="w-full mb-4 ">
//             <div className="flex items-center justify-between border">
//             <div className="my-2 bg-white rounded-b-lg w-full">
//                 <label className="sr-only">Publish post</label>
//                 <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
//             </div>
//         </div>
//        </div>
//     </div>
// }