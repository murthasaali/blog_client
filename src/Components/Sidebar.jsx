// Sidebar.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSection } from '../Redux/Features/buttonUiSlice';
import { BsThreeDotsVertical } from "react-icons/bs";
import IconBUtton from '../CustomeComponents/IconBUtton';
import { CiHome } from 'react-icons/ci';
import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { BiSolidMessageDetail } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { FiCodesandbox } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { CiCircleMore } from "react-icons/ci";
import { SiMeta } from "react-icons/si";

function Sidebar() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user")); // Parse the user object from localStorage

  const handleButtonClick = (section) => {
    dispatch(setSection(section)); // Dispatch action to update current section
  };

  return (
    <div className='w-full h-full flex flex-col justify-between items-start p-5 text-white'>
      {/* logo */}
      <div className='text-3xl w-10 flex flex-col leading-tight font-thin'>
        <SiMeta/>
        <div className='text-[9px] text-cyan-400'>www.meta_blog.com</div>
      </div>

      {/* navigation buttons */}
      <div className='w-fit h-fit flex flex-col justify-center items-start gap-2 text-xl'>
       <div onClick={() => handleButtonClick('home')}>

        <IconBUtton icon={<CiHome/>} title={"Home"} />
       </div>
        <IconBUtton icon={<CiSearch/>} title={"Explore"} onClick={() => handleButtonClick('explore')}/>
        <IconBUtton icon={<CiBellOn/>} title={"Notifications"} onClick={() => handleButtonClick('notifications')}/>
        <IconBUtton icon={<BiSolidMessageDetail/>} title={"Messages"} onClick={() => handleButtonClick('messages')}/>
        <IconBUtton icon={<FiCodesandbox/>} title={"Grok"} onClick={() => handleButtonClick('grok')}/>
        <IconBUtton icon={<CiBookmark/>} title={"Bookmarks"} onClick={() => handleButtonClick('bookmarks')}/>
        <IconBUtton icon={<FaXTwitter/>} title={"Premium"} onClick={() => handleButtonClick('premium')}/>
        <IconBUtton icon={<CiCircleMore/>} title={"More"} onClick={() => handleButtonClick('more')}/>
      </div>

      {/* account info */}
      <div  onClick={() => handleButtonClick('account')} className='w-full flex justify-between text-white items-center'>
        <div className='flex gap-2 justify-center items-center'>
          {/* <div className='h-10 w-10 bg-slate-50 rounded-full'></div> */}
          <div className='flex flex-col justify-center items-start'>
            <h1 className='text-md text-stone-500 '>{user&&user.username}</h1>
            <h1 className='text-xs text-stone-500 '>{user&&user.email}</h1>
          </div>
        </div>
        <button className='h-fit w-fit'><BsThreeDotsVertical className='text-xl'/></button>
      </div>
    </div>
  );
}

export default Sidebar;
