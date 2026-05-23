"use client"
import React, { useEffect, useRef, useState } from 'react'
import PostWrapper from '../organism/PostWrapper'
import { MOCK_POSTS } from '../../constants/mockData.contants'

const PAGE_SIZE = 5

function PublicationPage() {
    const ref=useRef<HTMLDivElement>(null)
    const ref2=useRef<HTMLDivElement>(null)
    useEffect(()=>{
        if(ref.current){
            ref.current.addEventListener("scroll",()=>{
                if(ref2.current){
                    console.log(ref2.current.getBoundingClientRect().top);
                }
                
            })
        }
    },[])
    return (
        <div
            ref={ref}
            className="w-full h-full overflow-y-scroll"
        >
            <div
            ref={ref2}
                className='min-h-[3000px] w-full'
            >
            </div>
        </div>
    )
}

export default PublicationPage