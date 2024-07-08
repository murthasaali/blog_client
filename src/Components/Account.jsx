import React, { useEffect, useState } from "react";
import apiRequest from "../Config/axiosConfig";
import { BsThreeDotsVertical } from "react-icons/bs";
import customToast from "../Constants/customToast";
import { useNavigate } from "react-router-dom";

// account section
function Account() {
  const [posts, setPosts] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's posts
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token as a string

        const response = await apiRequest.get("/api/getuserpost", {
          headers: {
            authorization: `${token}`, // Use the token directly as a string
            // "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  //  function dropdown

  const toggleDropdown = (index) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex(null);
    } else {
      setOpenDropdownIndex(index);
    }
  };

  const handleEdit = (postId) => {
    console.log(`Editing post with ID: ${postId}`);
  };

  // function for delete a post
  const handleDelete = async (postId) => {
    console.log(`Deleting post with ID: ${postId}`);
    const token = localStorage.getItem("token"); // Retrieve the token as a string

    try {
      await apiRequest.delete(`/api/posts/${postId}`, {
        headers: {
          authorization: `${token}`, // Use the token directly as a string
          "Content-Type": "multipart/form-data",
        },
      });
      customToast("Deleted post");
      // Remove the deleted post from the state
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  //  function for logout

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      localStorage.removeItem("token"); // Clear the token from local storage
      customToast("Logged out successfully");
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
      customToast("Error logging out");
    }
  };

  return (
    <div className="w-full h-full gap-2 flex-col p-5 flex">
      <div className="w-full flex justify-between">
        <h1 className="text-cyan-400 font-bold">Account</h1>
        <div className="flex justify-center items-center gap-5">
          <button
            className="bg-red-400 text-black rounded-full px-3 py-2"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button className="bg-stone-100 bg-opacity-10 text-white rounded-full px-3 py-2">
            Switch Account
          </button>
        </div>
      </div>
      <div className="w-full h-full flex flex-wrap gap-2">
        {/* list the posts */}
        {posts.map((post, index) => (
          <div
            key={index}
            className="w-[32%] h-fit relative bg-slate-50 bg-opacity-10 rounded-lg"
          >
            <button
              className="p-2 bg-stone-950 text-white rounded-full absolute top-2 right-2"
              onClick={() => toggleDropdown(index)}
            >
              <BsThreeDotsVertical />
            </button>
            {openDropdownIndex === index && (
              <div className="absolute top-10 right-2 bg-stone-950 text-white rounded-lg shadow-md">
                <button
                  className="block px-4 py-2"
                  onClick={() => handleEdit(post.postID)}
                >
                  Edit
                </button>
                <button
                  className="block px-4 py-2"
                  onClick={() => handleDelete(post.postID)}
                >
                  Delete
                </button>
              </div>
            )}
            <img
              src={post.imageUrl}
              className="w-full h-64 object-cover rounded-xl"
            />
            <h1 className="p-2 rounded-full text-[8px] text-white backdrop-blur-sm absolute bottom-0 w-full">
              {post.title}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Account;
