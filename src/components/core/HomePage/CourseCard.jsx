import React from 'react'
import {ImTree} from 'react-icons/im'

export const CourseCard = ({cardData,currentCard,setCurrentCard}) => {
  return (
    <div onClick={()=>{setCurrentCard(cardData.heading)}} className={`flex flex-col  ${currentCard===cardData.heading?" bg-white shadow-[14px_16px_rgba(255,214,10,1)] ":"bg-richblack-800 "} `}>
        <div className='px-5 pt-7 pb-[100px]'>
            <div className={` text-2xl font-semibold mb-6 ${currentCard===cardData.heading?" text-black ":" text-white "}`}>
                {cardData.heading}
            </div>
            <div className="text-richblack-300 font-medium  text-lg ">
                {cardData.description}
            </div>
        </div>
        
         <div className={` flex  flex-row justify-between font-bold text-lg  px-5 py-4 border-t border-dashed    border-richblack-500 ${currentCard===cardData.heading?" text-blue-300  ":" text-richblack-500  "}`}>
          <div className='flex justify-center items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                </svg>
                {cardData.level}
          </div>
          <div  className='flex justify-center gap-2 items-center'>
                <ImTree />
                {cardData.lessionNumber} 
                <p>Lessons</p>

          </div>
        </div>
    </div>
  )
}
