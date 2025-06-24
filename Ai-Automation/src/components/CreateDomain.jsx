import React from 'react'

function CreateDomain() {
  return (
    <div className='border rounded-lg py-2 mt-5 border-gray-300 px-4 w-full'>
            <div className='flex justify-evenly gap-3'>
                <div className='w-[500px]'>
                    <p className='m-2 font-semibold'>First Name:</p>
                    <input type="text" className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-full rounded-lg' />
                </div>
                <div className='w-[500px]'>
                    <p className='m-2 font-semibold'>Last Name:</p>
                    <input type="text" className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-full rounded-lg' />
                </div>
            </div>
            <div className='flex items-center'>
                <div className='w-[700px]'>
                    <p className='m-2 font-semibold'>Email:</p>
                    <input type="text" className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-[440px] rounded' />
                </div>
                <div className='flex gap-0.5 w-[250px]'>
                    <p className='bg-gray-200 p-2 mt-10 border rounded border-gray-200'>@</p>
                    <select className="w-full p-2.5 mt-10 text-sm border border-gray-300 rounded-md outline-none">
                        <option value="">All Domains</option>
                        <option value="option1">.com</option>
                        <option value="option2">.pk</option>
                    </select>
                </div>
            </div>
                <div className='w-[700px]'>
                  <p className='m-2 font-semibold'>Alert Email:</p>
                  <input type="text" className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-80 rounded' />
              </div>
            <button className="bg-[#15A395] cursor-pointer text-white py-1 px-4 rounded-full w-fit my-2">
                Add
            </button>
        </div>
  )
}

export default CreateDomain