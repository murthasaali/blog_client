import React, { useState } from 'react';
import { BiWorld } from 'react-icons/bi';
import { CiImageOn } from 'react-icons/ci';
import { CiGift } from 'react-icons/ci';
import { MdBubbleChart } from 'react-icons/md';
import { GrEmoji } from 'react-icons/gr';
import { CiCalendarDate } from 'react-icons/ci';
import apiRequest from '../Config/axiosConfig';
import customToast from '../Constants/customToast';
import BasicButton from '../CustomeComponents/BasicButton';

function CreatePost() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State to hold the image preview URL
  const token = localStorage.getItem('token'); // Retrieve the token as a string

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('title', title);
      if (file) {
        formData.append('image', file);
      }

      const response = await apiRequest.post('/api/posts', formData, {
        headers: {
          authorization: `${token}`, // Use the token directly as a string
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Post created successfully:', response.data);
      customToast('Post created successfully');

      // Optionally, clear form fields or perform other actions after successful post creation
      setContent('');
      setTitle('');
      setFile(null);
      setImagePreview(null); // Clear image preview after submission

    } catch (error) {
      console.error('Error creating post:', error);
      customToast('Failed to create post');
    }
  };

  return (
    <div className='w-full bg-slate-100 bg-opacity-10 h-fit flex gap-6 p-5 rounded-lg text-cyan-400'>
      <div className='h-16 w-16    rounded-full'>
        <img src="https://yt3.googleusercontent.com/0SXNpFLsJm8e8-Y9FlUYcJTyHNqUfyGDzm_wAaQxZsCbE4vbkGYRZeMDGhcje5cZIo0GoFSNJoc=s900-c-k-c0x00ffffff-no-rj" className='w-full h-full overflow-hidden rounded-full' alt="" />
      </div>
      <form className='flex flex-col gap-2 w-[90%]' onSubmit={handleSubmit}>
        {/* Absolute positioned white square for image preview */}
        {imagePreview && (
          <div className='w-14 h-14 absolute top-10 right-10 bg-white rounded-lg overflow-hidden'>
            <img src={imagePreview} alt='Preview' className='w-full h-full object-cover' />
          </div>
        )}
        <textarea
          name='content'
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='text-xl w-full h-auto text-stone-100 bg-transparent outline-none text-opacity-40 font-thin'
          placeholder='What&apos;s happening now?...'
        />
        <input
          name='title'
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className='text-xs w-full text-stone-100 bg-transparent outline-none text-opacity-40 font-thin'
          placeholder='Title'
        />
        <div className='flex gap-2 w-fit justify-center items-center'>
          <BiWorld />
          <h1>Everyone can reply</h1>
        </div>
        <div className='w-full justify-between flex'>
          <div className='w-fit flex gap-4 text-xl'>
           
            <button><CiGift /></button>
            <button><MdBubbleChart /></button>
            <button><GrEmoji /></button>
            <button><CiCalendarDate /></button>
          </div>
          <label htmlFor='file-upload' className='cursor-pointer'>
              <CiImageOn />
            </label>
            <input id='file-upload' required type='file' onChange={handleFileChange} className='hidden' accept='image/*' />  
          <BasicButton type='submit' title={'Post'} />
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
