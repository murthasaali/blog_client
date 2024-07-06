import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { topBuyers } from "../Constants/topBuyersList";

function TopBuyersList() {
  return (

    //  ui for top creators
    <div className="w-full h-[70%]  flex flex-col">
      <nav className="w-full p-3 text-cyan-400 font-bold text-xs  h-fit flex justify-between items-center ">
        Top creators{" "}
        <button className="p-2">
          <BsThreeDotsVertical className=" text-iconcolor" />
        </button>
      </nav>
      <div className="grid grid-cols-1 h-[100%] overflow-y-hidden gap-2 p-2">
        {topBuyers.map((item, index) => (
          <div
            key={index}
            className="h-[70px] w-full bg-stone-100 hover:bg-opacity-80 text-stone-400 hover:text-black  transition-all duration-500 bg-opacity-10 justify-start items-center flex p-3 rounded-lg gap-2"
          >
            <div className="">
              <div
                className="w-10 h-10 rounded-lg"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover ",
                  backgroundPosition: "center",
                }}
              ></div>
              <h1 className="text-[10px]  font-thin">{item.name}</h1>
            </div>
            <div className="flex justify-between flex-col h-full">
              <h1 className="text-[10px]">
                highest sales :
                <span className="text-red-400 text-[15px]">
                  {item.totalSale}.0{" "}
                </span>
              </h1>
              <h1 className="text-xs ">{item.totalTax}%</h1>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default TopBuyersList;
