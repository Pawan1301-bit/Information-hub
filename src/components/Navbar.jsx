import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between  p-5 bg-[#FF6F3C] text-white'>
        <p className='text-3xl'>Information Hub</p>
        <p title='sorry this option is current unavilable' className='text-xl hover:border-b-2 border-white'>Signup</p> 
    </div>
  )
}

export default Navbar
