import React from 'react'
import BasicButton from '../CustomeComponents/BasicButton'

function PremiumBadge() {
  return (
    //  premium add section
    <div className='w-full h-fit bg-stone-100 rounded-3xl bg-opacity-10 flex flex-col justify-between items-start gap-2 p-4'>
        <h1 className='font-bold text-white text-xl'> subscribe to premium</h1>
        <p className='text-sm leading-snug text-stone-300'>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
<BasicButton title={"Subscribe"} fontWeight={'font-bold'}/>    </div>
  )
}

export default PremiumBadge