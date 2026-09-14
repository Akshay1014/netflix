import React from 'react'

const Footer = () => {
    return (
        <div className='pb-20 text-[16px] text-gray-400'>
            
            <div className='underline'>
                <div className='my-10'>
                    Questions? Call 000-800-919-1743
                </div>
                <div className='flex justify-between list-none'>
                    <div className='w-50 '>
                        <li>FAQ</li>
                        <li>Investor Relations</li>
                        <li>Privacy</li>
                        <li>Speed Test</li>
                    </div>
                    <div className='w-50'>
                        <li>Help Centre</li>
                        <li> Jobs</li>
                        <li>Cookie Preferences</li>
                        <li>Legal Notices</li>
                    </div>
                    <div className='w-50'>
                        <li>Account</li>
                        <li>Ways to Watch</li>
                        <li>Corporate Information</li>
                        <li>Only on Netflix</li>
                    </div>
                    <div className='w-50'>
                        <li>Media Centre</li>
                        <li> Terms of Use</li>
                        <li>Contact Us</li>
                    </div>
                </div>
                <div>
                    <select className='text-white border border-gray-500 p-1 px-6 my-10 rounded' name="" id="">
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                    </select>
                </div>
            </div>
            <div className=''>
                <div>Netflix India</div>
                <div className='text-[12px] mt-5'>
                    This page is protected by Google reCAPTCHA to ensure you're not a bot.
                </div>
            </div>
      </div>
      
  )
}

export default Footer