import React from 'react'
import { Link } from 'react-router-dom'
// we should know the text , the file rthey are linking to and the flag 
export const CTAButton = ({children,active, linkto}) => {
  return (
    <Link to={linkto}>
          <div className={`text-center text-[14px] px-6 py-3 rounded-md font-bold
          ${active ? "bg-yellow-50 text-black":"bg-richblack-800 " }
          hover:scale-95 transition-all duration-200 `}>
            {children}
          </div>
    </Link>
  )
}
