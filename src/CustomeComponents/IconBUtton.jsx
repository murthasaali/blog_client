import React, { useState } from 'react';

function IconButton({ title, icon ,onClick}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
    
      className='w-fit px-4 py-2  bg-slate-50 bg-opacity-5 text-stone-400 hover:text-stone-100 rounded-full flex gap-2 justify-center items-center relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='text-cyan-400 text-3xl'>
        {icon}
      </div>
      {  (
        <div className="   text-stone-400 p-2 rounded-md text-xs">
          {title}
        </div>
      )}
    </button>
  );
}

export default IconButton;
