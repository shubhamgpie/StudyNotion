import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import { Link } from 'react-router-dom'
import { HighlightText } from '../components/core/HomePage/HighlightText'
import { CTAButton } from '../components/core/HomePage/Button'
import banner from "../assets/Images/banner.mp4"
import { CodeBlocks } from '../components/core/HomePage/CodeBlocks'
import { TimeLineSection } from '../components/core/HomePage/TimeLineSection'
import { LearningLanguageSection } from '../components/core/HomePage/LearningLanguageSection'
import { InstructorSection } from '../components/core/HomePage/InstructorSection'
import { Footer } from '../components/common/Footer'
import { ExploreMore } from '../components/core/HomePage/ExploreMore'
export const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className=' relative max-w-maxContent flex flex-col mx-auto  w-11/12 items-center text-white justify-between'>
           <Link to={"/signup"}>
               {/* to add shadow value*/}
               <div className='group  mt-16 p-1  mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 
               transition-all duration-200 hover:scale-95 '>
                   <div className=' group-hover:bg-richblack-900  flex items-center gap-3 rounded-full px-10 py-[5px] transition-all duration-200'>
                      <p>Become an Instructor </p>
                      <FaArrowRight />
                   </div>
               </div>
           </Link>
           <div className='text-center text-4xl font-semibold mt-7 '> 
             Empower Your Future With 
            <HighlightText text={"Coding Skills"}/>
           </div>

           <div className='text-center w-[90%] mt-8 text-lg font-bold text-richblack-300'>With our online Courses, 
           you can learn at your own pace, 
           from anywher in the world and get access to
            a wealth of resources , including hands-on 
            projects, quizzes, and personalized feedback from instructors
            </div>

            <div className='flex flex-row gap-6 mt-8'>
                 <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                 </CTAButton>
                 <CTAButton active={false} linkto={"/login"}>
                    Book a demo
                 </CTAButton>
            </div>
            {/* adding video */}
            <div className='shadow-blue-200 mx-3 my-10 relative  w-[80%] h-[90%]'>
                 <div className='w-[700px] h-[500px]  blur-3xl opacity-30 absolute rounded-full bg-blue-100 z-[1] '></div>
                <video muted loop autoPlay className='relative z-10 rounded-md border-richblack-800 border-2  ' ><source src={banner} type="video/mp4" /> </video>
                
    
            </div>

            {/* Code secton 1 */}
            <div>
               <CodeBlocks 
                position={"lg:flex-row "}
                heading={
                        <div className='text-4xl font-semibold'>
                           Unlock Your
                           <HighlightText text={"coding potential"}/>
                           with our online course 
                        </div>
                }
                subHeading={"Our Courses are designed and taught bu industry expers who have years of experience in coding and are passionate about their knowledge with you "}
                ctabtn1={{
                    btnText:"Try it yourself",
                    linkto:"/signup",
                    active:"true"
                }}
                ctabtn2={{
                    btnText:"learn more",
                    linkto:"/login",
                    active:"false"
                }}

                codeblock={`<!DOCTYPE HTML>\n <html> \n<head><title>Example\n</title>
                    <linkrel="stylesheet/>
               \n </head> `}
                codeColor={"text-yellow-25 "}
                />
            </div>
                        {/* Code secton 2 */}

            <div>
               <CodeBlocks 
                position={"lg:flex-row-reverse "}
                heading={
                        <div className='text-4xl font-semibold'>
                           Unlock Your
                           <HighlightText text={"coding potential"}/>
                           with our online course 
                        </div>
                }
                subHeading={"Our Courses are designed and taught bu industry expers who have years of experience in coding and are passionate about their knowledge with you "}
                ctabtn1={{
                    btnText:"Try it yourself",
                    linkto:"/signup",
                    active:"true"
                }}
                ctabtn2={{
                    btnText:"learn more",
                    linkto:"/login",
                    active:"false"
                }}

                codeblock={`<!DOCTYPE HTML>\n <html> \n<head><title>Example\n</title>
                    <linkrel="stylesheet/>
               \n </head> `}
                codeColor={"text-yellow-25 "}
                />
            </div>

            {/* Exploring sections  */}
            <ExploreMore/>
           
        </div>

        {/* section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px]'>
                 <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
                            <div className='h-[150px]'></div>
                            <div className='flex gap-7  text-white'>
                             <CTAButton active={true} linkto={"/signup"}>
                              <div className='flex items-center gap-3'>
                                Explore full catelog
                                <FaArrowRight/>
                              </div>

                             </CTAButton>
                             <CTAButton active={false} linkto={"/signup"}>
                                 Learn More
                             </CTAButton>

                            </div>
                 </div>
            </div>

             <div className='mx-auto w-11/12 max-w-maxContent pb-10 flex flex-col items-center justify-between gap-7 '> 
              <div className='flex flex-row gap-5 mt-[110px]'>

               <div className='text-4xl font-semibold w-[45%] '>
                     Get the Skills you need for a 
                     <HighlightText text={"Job that is in demand"}/>
               </div>

               <div className='flex flex-col w-[40%] gap-10 items-start '>
                   <div className='text-[16px] '>
                   The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                   </div>
                   <CTAButton active={true} linkto={"/signup"}>
                    learn more
                   </CTAButton>
               </div>

              </div>
               

               <TimeLineSection/>
               <LearningLanguageSection/>
             </div>
        </div>

        {/* section 3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 
        bg-richblack-900 text-white'>

            <InstructorSection/>

            <h2 className='text-center text-4xl font-semibold mt-10'>review from Other Learners</h2>
            {/* review slider */}
        </div>
        
        {/* section 4 */}
        <Footer/>
    </div>
  )
}
