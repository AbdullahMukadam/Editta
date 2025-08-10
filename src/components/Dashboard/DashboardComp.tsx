
import React from 'react'
import PromptComp from '../PromptComp/PromptComp'

function DashboardComp() {
    return (
        <div className='w-full min-h-screen p-1 md:p-4 flex items-center justify-center font-brcolage-grotesque'>

            <div
                className='absolute -z-10 top-0 left-0 w-full h-full'
                style={{
                    background: 'linear-gradient(156deg,rgba(210, 255, 81, 1) 3%, rgba(22, 105, 44, 0) 30%)'
                }}
            ></div>
            <div className='w-[80%] h-full z-[999]'>
                <PromptComp />
            </div>
        </div>
    )
}

export default DashboardComp