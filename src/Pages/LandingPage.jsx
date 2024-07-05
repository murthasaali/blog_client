import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import CreatePost from "../Components/CreatePost";
import { IoChatboxOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { IoStatsChart, IoChevronDown } from "react-icons/io5";
import Search from "../Components/Search";
import PremiumBadge from "../Components/PremiumBadge";
import Posts from "../Components/Posts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Account from "../Components/Account";
import TopBuyersList from "../Components/Suggestions";

function LandingPage() {
  const nav=useNavigate()
  const token=localStorage.getItem("token")
  const currentSection = useSelector((state) => state.buttonUI.currentSection);

  useEffect(() => {
    if(token){
      nav("/")

    }else{
      nav('login')
    }

  }, [])
  return (
    <div className="w-full h-screen bg-black flex">
      {/* sidebar */}
      <div className="w-[20%]  hidden md:flex  h-full bg-slate-50 bg-opacity-10">
        <Sidebar />
      </div>

      {/* main content area */}
      <div className="md:w-[60%] w-full h-full relative flex flex-col gap-2 bg-opacity-10 p-2 overflow-y-scroll">
        <CreatePost />
        {
          currentSection==="home"&&
        <Posts/>
        }
        {
          currentSection==="account"&&
        <Account/>
        }
      </div>

      {/* highlights suggestions */}
      <div className="w-[20%]  h-full p-2 md:flex hidden flex-col gap-2">
        {/* highlights suggestions content */}
        <Search />
        <PremiumBadge />
        <TopBuyersList />
      </div>
      {/* fixed chevron icon */}
      <div className="fixed text-cyan-400 bottom-5 right-[24%] p-2  bg-black  rounded-full text-2xl">
        <IoChevronDown className="animate-pulse" />
      </div>
    </div>
  );
}

export default LandingPage;
