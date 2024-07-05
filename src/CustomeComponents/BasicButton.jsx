import React from 'react'

function BasicButton({title,texTsize,fontWeight}) {
  return (
    <button className={`${fontWeight&&fontWeight} px-4 py-1 h-fit bg-cyan-400  text-white bg-opacity-80 rounded-full`} >{title}</button>
)
}

export default BasicButton