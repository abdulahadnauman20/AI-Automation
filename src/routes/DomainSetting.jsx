import React, { useState } from 'react'
import { BiLoaderCircle } from "react-icons/bi";

function DomainSetting() {
    const[selectDomain, setSelectedDomains] = useState('');
    const[isLoading, setIsLoading] = useState(true); 
    const[loading, setLoading] = useState(false);

    {selectDomain === "mailing-configeration" && setTimeout(() => {
        setIsLoading(false);
        console.log("OK");
    }, 20000); }   

     const handleVerify = () => {
        setLoading(true);
    };
    
  return (
    <>
    <div className='flex mx-auto w-96'>
        <select onClick={(e) => setSelectedDomains(e.target.value)} className="w-full p-2.5 mt-10 text-sm border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] rounded-md outline-none">
            <option value="">Select Domain</option>
            <option value="forwarding-domain">Forwarding Domain</option>
            <option value="mailing-configeration">Mailing Configeration</option>
        </select>
    </div>
        {selectDomain === "forwarding-domain" && 
        (
            <div className='mt-10 mx-auto w-96'>
                <h3 className='font-semibold text-[18px] px-1'>Order new Emails</h3>
                    <div className='border rounded-lg py-2 border-gray-300 px-4 my-2'>
                    <p className='m-2 font-semibold'>Forwarding Domain:</p>
                    <input type="text" className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-full rounded-lg' />
                  <button className="bg-[#15A395] cursor-pointer text-white py-1 px-4 rounded-full w-fit my-2">
                    Submit
                  </button>
                </div>
            </div>
        )}
        { selectDomain === "mailing-configeration" &&
        (
            <div className='mt-10 mx-auto w-96'>
            <div>
                <h1 className='flex gap-1 items-center font-semibold'>
                    Your Domain is verifying...
                    {isLoading && <BiLoaderCircle className="size-6 animate-spin" />}
                </h1>
                <button
                    disabled={isLoading}
                    onClick={handleVerify}
                    className={`bg-[#15A395] text-white py-1 px-4 rounded-full w-fit my-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                    {loading ? 'Verifying...' : 'Verify'}
                </button>
            </div>
        </div>
        )}
    </>
  )
}

export default DomainSetting