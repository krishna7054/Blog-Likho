import { jwtDecode } from "jwt-decode";
import  { useEffect, useState } from "react";
import { LuCamera, LuMail } from "react-icons/lu";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Avatar } from "../components/BlogCard";
import DOMPurify from "dompurify";
import Navbar from "../components/Navbar";
import { Blog, useBlogs } from "../hooks";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { toast } from "react-toastify";

function Profile() {
  const [isEditing] = useState(false);
  const [Users, setUsers] = useState<{ name?: string; email?: string; id?: string } | null>(null);
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
  const { blogs } = useBlogs();
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



  // Fetch User Details
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.id;
      
      axios
        .get(`${BACKEND_URL}/api/v1/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUsers(response.data);
        })
        .catch(() => console.error("Invalid token"));
    }
  }, []);

  // Filter Blogs for Logged-in User
  useEffect(() => {
    if (Users?.name) {
      const filteredBlogs = blogs.filter((blog) => blog.author?.name === Users.name);
      setUserBlogs(filteredBlogs);
    }
  }, [Users, blogs]);

  // Extract Title and Content
  const extractTitleAndContent = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    const firstH1 = doc.querySelector("h1");
    let title = firstH1 ? firstH1.innerText : "Untitled";

    if (firstH1) firstH1.remove();

    return { title, content: doc.body.innerHTML };
  };

    // Delete Blog Post
    const handleDelete = async (blogId: string) => {

      const storedToken = localStorage.getItem("token");
      const token = storedToken ? JSON.parse(storedToken).jwt : null;
      
      if (!token) {
        console.error("User is not authenticated");
        return;
      }
    
      try {
        await axios.delete(`${BACKEND_URL}/api/v1/blog/${blogId}`, {
          headers: { Authorization: token},
          withCredentials: true,
        });
    
        // Remove the deleted blog from the UI
        setUserBlogs(userBlogs.filter((blog) => blog.id !== blogId));
        toast.success("Post deleted successfully", { position: "bottom-right", autoClose: 3000 });
      } catch (error) {
        toast.error("Failed to delete post", { position: "bottom-right", autoClose: 3000 });
      }
    };

    const handleEdit = (blog: Blog) => {
      navigate("/publish", { state: { blog } });
    };

    

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-10">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
              <div className="absolute -bottom-16 left-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white flex justify-center bg-amber-500">
                    <Avatar name={Users?.name || "Null"} size={"big"} />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full text-white">
                      <LuCamera size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="pt-20 px-8 pb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{Users?.name?.toUpperCase()}</h1>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <LuMail size={18} className="mr-2" />
                      {Users?.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Blog Posts Section */}
              <div className="mt-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">My Blog Posts</h2>
                </div>
                <div className="space-y-6">
                  {userBlogs.length === 0 ? (
                    <Spinner/>
                    // <p className="text-gray-600">You haven't written any blogs yet.</p>
                  ) : (
                    userBlogs.map((blog) => {
                      const { title, content } = extractTitleAndContent(blog.content);
                      return (
                        <div key={blog.id} className="bg-gray-50 p-6 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                              <div
                                className="mt-2 text-gray-700"
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(content),
                                }}
                              />
                              <span className="text-sm text-gray-500 mt-2 block">
                              {formatDate(blog.publishedDate)}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleEdit(blog)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
                                Edit
                              </button>
                              <button
                              onClick={() => handleDelete(blog.id)}
                               className="p-2 text-red-600 hover:bg-red-50 rounded-md">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  );
}

export default Profile;


