import React from 'react'

const NodeHeaderER = ({setDataFromParent , postedData}) => {
  console.log(postedData);
  return (
    <div className='w-full flex justify-end items-center bg-gray-200 py-2 px-4'>
        <div className='flex justify-between gap-2'>
            
            <button className='bg-[#6366f1] text-white p-1 rounded'>Save (New Version)</button>
            <button className='bg-[#6366f1] text-white p-1 rounded'>Update (Current Version)</button>
        </div>
    </div>
  )
}

export default NodeHeaderER