import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import { HighlightText } from './HighlightText';
import { CourseCard } from './CourseCard';
const tabsName=[
    "Free",
    "New to coding",
    "Most Popular",
    "Skill paths",
    "Career paths"
];
export const ExploreMore = () => {

    // we will see the 0th tab 
    const [currentTab,setCurrentTab]=useState(tabsName[0]);
    const [courses, setCourses]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);
    
    const setMyCards= (value)=>{
        setCurrentTab(value);
        const result=HomePageExplore.filter((course)=>course.tag===value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div className='relative w-full '>
      <div className='text-4xl font-semibold text-center'>
        Unlock the 
        <HighlightText text={"Power of Code"}/>
      </div>
      <p className='text-richblack-300 text-center  text-lg  mt-3'>Learn to build anything you can imagine 
      </p>

      <div className='flex flex-row bg-richblack-800 rounded-full  w-fit mx-auto mb-44     mt-5 gap-6 px-1 py-1 border-richblack-100'>
           {
            tabsName.map((element,index)=>{
                return (
                    <div className={`text-[16px] flex flex-row items-center gap-2 
                    ${element===currentTab ?
                    " bg-richblack-900 text-richblack-5 font-medium":
                    "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer
                    hover:bg-richblack-900 hover:text-richblack-5 px-4 py-2 
                    `} key={index} onClick={()=>{setMyCards(element)}}>
                      {element}
                    </div>
                )
            })
           }
      </div>
      <div className='lg:h-[150px]'></div>
      {/* course card  */}
      <div className='flex justify-center top-56  w-[100%] gap-10 flex-row   absolute '>
        {
              courses.map((element,index)=>{
                return (
                    <CourseCard
                        key={index}
                        cardData={element}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                    />
                )
              }) 
        }
      </div>

    </div>
  )
}
