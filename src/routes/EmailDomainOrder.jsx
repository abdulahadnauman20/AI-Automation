import { ArrowLeft, ChevronDown, Trash2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function EmailDomainOrder() {
    const accounts = [
        {
          provider: "Microsoft",
          persona: "Beetoo Leru",
          email: "beeto.fr@labsquickpipe.com",
          domain: "Labsquickpipe.com",
          price: "$5",
        },
        {
          provider: "Google",
          persona: "Beetoo Leru",
          email: "beeto.fr@labsquickpipe.com",
          domain: "Labsquickpipe.com",
          price: "$5",
        },
      ]

  return (
    <div className='h-96 w-[900px] mt-10 mx-auto p-2'>
        <Link to="/email-domain" className='cursor-pointer'>
            <div className='flex items-center px-1'>
                <ArrowLeft size={19} />
                <span className='text-gray-400'>Go Back</span>
            </div>
        </Link>
        <h3 className='font-semibold text-[18px] py-3 px-1'>Order new Emails</h3>
        <div className='border rounded-lg py-2 border-gray-300 px-4 my-2'>
            <p className='m-2 font-semibold'>Forwarding Domain:</p>
            <input type="text" className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-full rounded-lg' />
        </div>
        <div className='border rounded-lg py-2 border-gray-300 px-4 w-full'>
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
                    <input type="text" className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-full rounded' />
                </div>
                <div className='flex'>
                    <p className='bg-gray-200 p-2 mt-10 border border-gray-200'>@</p>
                    <select className="w-full p-2.5 mt-10 text-sm border border-gray-300 rounded-md outline-none">
                        <option value="">All Domains</option>
                        <option value="option1">.com</option>
                        <option value="option2">.pk</option>
                    </select>
                </div>
            </div>
            <button className="bg-[#15A395] cursor-pointer text-white py-1 px-4 rounded-full w-fit my-2">
                Add
            </button>
        </div>

    <div className="w-full mx-auto py-2">
      <div className="border border-gray-300 rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-white">
              <th className="py-4 px-6 text-left font-semibold text-sm">PROVIDER</th>
              <th className="py-4 px-6 text-left font-semibold text-sm">PERSONA</th>
              <th className="py-4 px-6 text-left font-semibold text-sm">EMAIL</th>
              <th className="py-4 px-6 text-left font-semibold text-sm">DOMAIN</th>
              <th className="py-4 px-6 text-left font-semibold text-sm">PRICE</th>
              <th className="py-4 px-6 text-left font-semibold text-sm">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={index}>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    {account.provider === "Microsoft" ? (
                      <div className="w-5 h-5 flex items-center justify-center bg-orange-500 text-white rounded-sm">
                        <span className="text-xs font-bold">M</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Trash2 />
                      </div>
                    )}
                    <span className="text-gray-600">{account.provider}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full inline-block">
                    {account.persona}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <a href={`mailto:${account.email}`} className="text-gray-600 underline">
                    {account.email}
                  </a>
                </td>
                <td className="py-4 px-6">
                  <div className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full inline-block">
                    {account.domain}
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">{account.price}</td>
                <td className="py-4 px-6">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    
  )
}

export default EmailDomainOrder