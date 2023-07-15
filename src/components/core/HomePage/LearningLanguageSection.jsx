import React from 'react'
import { HighlightText } from './HighlightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import { CTAButton } from './Button'

export const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col gap-5 mt-[130px] w-[100%] items-center'>
        <div className='text-4xl font-semibold text-center'>
           Your Swiss knife for
           <HighlightText text={"learning any language"}/>
        </div>
        <div className='text-center  text-richblack-600 mx-auto text-base font-medium w-[70%]  '>
         Using spin making learning multiple
          languages easy. with 20+ languages realistic
           voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-row justify-center items-center mt-5'>
           
           <img src={know_your_progress} 
            alt='Know_your_progress'
            className='object-contain -mr-32 '
           />
           <img src={compare_with_others} 
            alt='compare_with_others'
            className='object-contain '
           />
           <img src={plan_your_lessons} 
            alt='plan_your_lessons'
            className='object-contain -ml-32 '
           />
        </div>

        <div className='w-fit flex justify-center'>
            <CTAButton active={true} linkto={"/signup"}>
                Learn More
            </CTAButton>
        </div>

    </div>
  )
}
