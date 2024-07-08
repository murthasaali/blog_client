import React, { useState, useEffect } from 'react';
import { IoChatboxOutline } from 'react-icons/io5';
import { FaChevronCircleRight, FaRegHeart } from 'react-icons/fa';
import { CiShare2 } from 'react-icons/ci';
import { IoStatsChart } from 'react-icons/io5';
import { AiFillLike } from "react-icons/ai";
import { FaXmark } from 'react-icons/fa6';
import apiRequest from '../Config/axiosConfig';
import customToast from '../Constants/customToast';
import timeAgo from '../Constants/timeAgo';
import { Player } from '@lottiefiles/react-lottie-player';

// Modal Component
function ImageModal({ post, closeModal }) {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    useEffect(() => {
        const fetchComments = async () => {
          try {
            const response = await apiRequest.get(`/api/posts/${post.postID}/comments`);
            console.log(response.data.comments)
            setComments(response.data.comments);
          } catch (error) {
            console.error('Error fetching comments:', error);
          }
        };
    
        fetchComments();
      }, [post.postID]);
    
      const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      
        try {
          const response = await apiRequest.post(
            `/api/posts/${post.postID}/comments`,
            { content: newComment },
            {
              headers: {
                authorization: `${token}`
              }
            }
          );
          console.log(response.data)
          customToast("you commented on this posts")
          setComments(response.data.comments);
          setNewComment('');
        } catch (error) {
          console.error('Error adding comment:', error);
        }
      };
      
  return (
    <div className="fixed top-0 left-0 backdrop-blur-md w-full  text-white h-screen flex justify-center items-center   z-50">
      <div className="bg-black p-5 h-full w-full gap-5 flex rounded-lg relative ">
        <div className='w-[50%] flex flex-col gap-5'>
          <img src={post.imageUrl} alt="Post" className="w-full object-cover h-auto max-h-96 rounded-lg" />
        <form onSubmit={handleCommentSubmit} className=" flex gap-3 justify-between items-center">
          <input
            type="text"
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-2 h-10 outline-none text-xs  bg-stone-100 bg-opacity-10 rounded-full"
          />
          <button type="submit" className=" px-4 py-2 bg-stone-500 bg-opacity-10 text-white rounded ">
            <FaChevronCircleRight/>
          </button>
        </form>      
        </div>
        
        <div className='flex flex-col w-[50%] gap-5'>
        <h2 className="text-xl my-3">{post.title}</h2>
        <p className="text-sm">{post.content}</p>
        <div className='w-full h-full flex flex-col gap-5'>
  {/* comments */}
  {comments.map((comment, index) => (
    <div key={index} className='w-fit gap-5 bg-slate-50 bg-opacity-10 rounded-xl p-2  text-white flex justify-between'>
     <h1 className=''> {comment.content}</h1>
     <button className='text-cyan-400'><AiFillLike/></button>
    </div>
  ))}
</div>

        
        </div>
         <button className="p-4 rounded-full bg-opacity-25 bg-stone-500 absolute top-4 right-4 text-white  " onClick={closeModal}><FaXmark/></button>
      </div>
    </div>
  );
}

function Posts() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading,setLoading]=useState(false)
  const [likeId,setLikeId]=useState()



  useEffect(() => {

    // fetching post
    const fetchPosts = async () => {
      try {
        const response = await apiRequest.get('/api/posts');
        setPosts(response.data.posts); // Assuming the API returns an array of posts
        console.log('Latest posts:', response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

//   const getUserDetailsById = async (userId) => {
//     try {
//       const response = await apiRequest.get(`/api/getuser/${userId}`);
//       console.log(response.data.user);
//       return response.data.user.username; // Assuming the API returns a user object in the response
//     } catch (error) {
//       console.error('Error fetching user details:', error);
//       throw error; // Propagate the error so it can be handled by the caller
//     }
//   };
  
  // Function to open the modal
  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };



  //  function to like a post
  const like = async (postID) => {
    const token = localStorage.getItem("token"); // Retrieve the token as a string

    try {
      const response = await apiRequest.post(`/api/posts/${postID}/likes`,{
        headers: {
          authorization: `${token}`, // Use the token directly as a string
        },
      });
      if (response.data.status) {
        setLikeId(postID);
        setLoading(true);
        // if (response.data.message==="you already liked this post"){

        //   customToast("you already liked this post");
        // }else{

          customToast(response.data.message);
        // }
        // console.log(response.data.likeCount); 
      } else {
        customToast("Failed to like the post");
      }
    } catch (error) {
      console.error('Error liking post:', error);
      customToast("Error liking the post");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full rounded-lg gap-3 flex flex-col">
      {/* list out the post */}
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className="h-fit w-full bg-stone-100 bg-opacity-10 rounded-lg flex text-stone-300 p-5">
            <div className="w-20">
              <div className="w-10 h-10 bg-white rounded-lg">
                <img className='w-full h-full' src="https://www.pngkit.com/png/full/372-3729814_profile-icon-my-profile-icon-png.png" alt="" />
              </div>
            </div>
            <div className="w-full h-full flex flex-col gap-2">
              <h1 className="text-xl">
                {post.username}{' '}
                <span className="text-xs font-thin text-stone-100">
                  {timeAgo(post.createdAt)}
                </span>
              </h1>
              <h1 className='text-cyan-400 font-bold text-opacity-60'>{post.title}</h1>
              <p className="text-xl font-thin w-[80%]">{post.content}</p>
              {post.imageUrl && (
                <div className="w-[50%] h-80  cursor-pointer relative" onClick={() => openModal(post)}>
                       { likeId===post.postID&&loading && (
                      <div
                        className="absolute bottom-0 left-[-10px] w-[150px]   h-[150px]  flex justify-center items-center"
                        style={{ zIndex: 999 }}
                      >

                        {/* like lotti */}
                        <Player
                          src="https://lottie.host/0bb4d081-4124-4a8c-987b-4a46982e91cc/Naj4kVQ2pk.json"
                          autoplay
                          loop
                          style={{ height: "150px", width: "150px" }}
                        ></Player>
                      </div>
                    )}

                  <img src={post.imageUrl} className='h-full w-auto object-cover rounded-lg' alt="" />
                </div>
              )}
              <h3 className="text-xs font-thin text-stone-500 hover:underline">
from {post.email}
              </h3>
              <div className="w-fit gap-5 flex justify-between py-2">
                <button>
                  <IoChatboxOutline />
                </button>
                <button  className='hover:text-red-600'  onClick={()=>like(post.postID)}>
                  <FaRegHeart />
                </button>
                <button>
                  <IoStatsChart />
                </button>
                <button>
                  <CiShare2 />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}

      {/* Modal  for view a specific post */}
      {isModalOpen && selectedPost && (
        <ImageModal post={selectedPost} closeModal={closeModal} />
      )}
    </div>
  );
}

export default Posts;
