import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-violet-950 text-white'>
        <div className="my-container flex justify-between items-center px-4 py-5 h-14">

        <div className="logo font-bold text-2xl text-white">PASS OP</div>
          <button className='bg-black px-6 m-2 rounded-full flex justify-between gap-2 items-center '>
            <img className='w-12 invert' src="/icons/github.jpg" alt="logo" />
            <span className='font-bold'>GitHub</span>
            </button>
      
        </div>
 
    </nav>
  )
}

export default Navbar