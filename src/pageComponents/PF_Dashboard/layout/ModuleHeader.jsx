import React from 'react'
 
const ModuleHeader = ({setsavejs}) => {
    return (
        <div className='w-full h-8 flex justify-end gap-2 pr-2 items-center'>
            <button className='bg-blue-400 text-white p-1 m-1 rounded' onClick={()=>setsavejs('update')}>Update (Update version)</button>
            <button className='bg-blue-400 text-white p-1 m-1 rounded' onClick={()=>setsavejs('create')}>Save (New version)</button>
        </div>
    )
}
 
export default ModuleHeader