

import React from 'react'
import { CornerRightUp } from "lucide-react"

function PromptComp() {
    return (
        <div className='w-full p-2 text-center -translate-y-14 flex flex-col items-center justify-center'>
            <h1 className='font-bold text-6xl'>What do you want to create?</h1>
            <div className='w-[80%] p-4 border-[1px] border-gray-400 rounded-xl mt-6'>
                <textarea className='border-none outline-none w-full' placeholder='enter your prompt' />
                <div className='w-full'>
                    { /* we wil add more thing shere later */}
                    <CornerRightUp size={30} className='border-[1px] hover:bg-gray-100 border-gray-400 p-1 rounded-sm cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default PromptComp