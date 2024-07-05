import React, { useEffect, useState } from 'react';
import apiRequest from '../Config/axiosConfig';

function Account() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the user's posts
    const fetchPosts = async () => {
      try {
        
        const token = localStorage.getItem('token'); // Retrieve the token as a string

        const response = await apiRequest.get('/api/getuserpost',{  headers: {
          authorization: `${token}`, // Use the token directly as a string
          'Content-Type': 'multipart/form-data',
        },});
        console.log(response.data)
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();

  }, []);

  return (
    <div className='w-full h-full  gap-2 flex-col p-5 flex'>
      <h1 className='text-cyan-400 font-bold'>Account</h1>
      <div className='w-full h-full flex flex-wrap gap-2'>
        {posts.map((post, index) => (
          <div key={index} className='w-[32%] h-auto relative  bg-slate-50 bg-opacity-10'>
            <img src={post.imageUrl} className='w-full h-64 object-cover' />
            <h1 className='p-2 rounded-full text-[8px] text-white backdrop-blur-sm absolute bottom-0 w-full'>{post.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Account;
