import React from 'react'
import { FaSearch } from 'react-icons/fa'

function Search() {
  return (
    <div className='w-full rounded-full bg-slate-50 bg-opacity-10 h-12 border border-stone-600 gap-4 border-opacity-40 px-4 justify-start items-center flex'>
        <FaSearch className='text-cyan-400'/>
        <input type="text" className='bg-transparent text-stone-500 outline-none' placeholder='search' />

    </div>
  )
}

export default Search