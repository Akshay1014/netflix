import React from 'react'

const Subscrition = () => {
  return (
      <div className='flex flex-col items-center py-5 gap-5'>
          <div className='text-center'>
              Ready to watch? Enter your email to create or restart your membership.
          </div>
          <div className='flex items-center'>
              <input className='border border-gray-500 p-4 pr-80 mr-2 rounded' type='emil' placeholder='Email address' />
              <button className='bg-red-600 rounded text-white text-2xl p-3 px-10'>Get Started</button>
          </div>
    </div>
  )
}

export default Subscrition