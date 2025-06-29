// // import React from 'react'

// // function CreateDomain() {
// //   return (
// //     <div className='rounded-lg mt-5 w-full'>
// //             <div className='flex justify-evenly gap-3'>
// //                 <div className='w-[500px]'>
// //                     <p className='m-2 font-semibold'>First Name:</p>
// //                     <input type="text" className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-full rounded-lg' />
// //                 </div>
// //                 <div className='w-[500px]'>
// //                     <p className='m-2 font-semibold'>Last Name:</p>
// //                     <input type="text" className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-full rounded-lg' />
// //                 </div>
// //             </div>
// //             <div className='flex items-center'>
// //                 <div className='w-[700px]'>
// //                     <p className='m-2 font-semibold'>Email:</p>
// //                     <input type="text" className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-[440px] rounded' />
// //                 </div>
// //                 <div className='flex gap-0.5 w-[250px]'>
// //                     <p className='bg-gray-200 p-2 mt-10 border rounded border-gray-200'>@</p>
// //                     <select className="w-full p-2.5 mt-10 text-sm border border-gray-300 rounded-md outline-none">
// //                         <option value="">All Domains</option>
// //                         <option value="option1">.com</option>
// //                         <option value="option2">.pk</option>
// //                     </select>
// //                 </div>
// //             </div>
// //                 <div className='w-[700px]'>
// //                   <p className='m-2 font-semibold'>Alert Email:</p>
// //                   <input type="text" className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-80 rounded' />
// //               </div>
// //             <button className="bg-[#15A395] cursor-pointer text-white py-1 px-4 rounded-full w-fit my-2">
// //                 Add
// //             </button>
// //         </div>
// //   )
// // }

// // export default CreateDomain


// import React, { useEffect, useState } from 'react'

// function CreateDomain() {
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [emailUserName, setEmailUserName] = useState('')
//   const [selectedDomain, setSelectedDomain] = useState('')
//   const [alertEmail, setAlertEmail] = useState('')
//   const [domains, setDomains] = useState([])

//   const token = JSON.parse(localStorage.getItem("Token"))
//   const API_BASE = import.meta.env.VITE_API_URL

//   // Fetch domains on mount
//   useEffect(() => {
//     const fetchDomains = async () => {
//       try {
//         const response = await fetch(`${API_BASE}/EmailAccount/GetMailHostingDomains`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         })

//         const data = await response.json()
//         if (data.success && data.Domains) {
//           setDomains(data.Domains)
//         } else {
//           console.error("Error fetching domains:", data.message)
//         }
//       } catch (error) {
//         console.error("Failed to fetch domains:", error)
//       }
//     }

//     fetchDomains()
//   }, [API_BASE, token])

//   // Handle form submission
//   const handleSubmit = async () => {
//     const userName = `${firstName} ${lastName}`.trim()

//     const payload = {
//       UserName: userName,
//       EmailUserName: emailUserName,
//       DomainNames: [selectedDomain],
//       AlertEmailAddress: alertEmail
//     }

//     try {
//       const response = await fetch(`${API_BASE}/EmailAccount/CreateZohoMailbox`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(payload)
//       })

//       const data = await response.json()
//       console.log("Submission response:", data)
//       // Optional: handle success/error UI here
//     } catch (error) {
//       console.error("Error submitting form:", error)
//     }
//   }

//   return (
//     <div className='rounded-lg mt-5 w-full'>
//       <div className='flex justify-evenly gap-3'>
//         <div className='w-[500px]'>
//           <p className='mt-2 mb-1 font-semibold'>First Name:</p>
//           <input
//             type="text"
//             value={firstName}
//             onChange={e => setFirstName(e.target.value)}
//             className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-full rounded-lg'
//           />
//         </div>
//         <div className='w-[500px]'>
//           <p className='mt-2 mb-1 font-semibold'>Last Name:</p>
//           <input
//             type="text"
//             value={lastName}
//             onChange={e => setLastName(e.target.value)}
//             className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-full rounded-lg'
//           />
//         </div>
//       </div>

//       <div className='flex items-center mt-4 gap-0.5'>
//         <div className='w-[700px]'>
//           <p className='mt-2 mb-1 font-semibold'>Email:</p>
//           <input
//             type="text"
//             value={emailUserName}
//             onChange={e => setEmailUserName(e.target.value)}
//             className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-full rounded'
//           />
//         </div>
//         <div className='flex gap-0.5 w-[250px]'>
//           <p className='bg-gray-200 p-2 mt-10 border rounded border-gray-200'>@</p>
//           <select
//             className="w-full p-2.5 mt-10 text-sm border border-gray-300 rounded-md outline-none"
//             value={selectedDomain}
//             onChange={e => setSelectedDomain(e.target.value)}
//           >
//             <option value="">All Domains</option>
//             {domains.map((domain, idx) => (
//               <option key={idx} value={domain}>{domain}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className='mt-4'>
//         <p className='mt-2 mb-1 font-semibold'>Alert Email:</p>
//         <input
//           type="text"
//           value={alertEmail}
//           onChange={e => setAlertEmail(e.target.value)}
//           className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-full rounded'
//         />
//       </div>

//       <button
//         onClick={handleSubmit}
//         className="bg-[#15A395] cursor-pointer text-white py-2 px-4 rounded w-full my-6"
//       >
//         Add
//       </button>
//     </div>
//   )
// }

// export default CreateDomain;


import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

function CreateDomain() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailUserName, setEmailUserName] = useState('')
//   const [selectedDomain, setSelectedDomain] = useState('')
  const selectedDomain = "quickpipe.xyz"
  const [alertEmail, setAlertEmail] = useState('')
  const [domains, setDomains] = useState([])
  const [loading, setLoading] = useState(false)
  const [createdEmails, setCreatedEmails] = useState([])


  const token = JSON.parse(localStorage.getItem("Token"))
  const API_BASE = import.meta.env.VITE_API_URL

  // Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const emailUsernameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await fetch(`${API_BASE}/EmailAccount/GetMailHostingDomains`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        const data = await response.json()
        if (data.success && data.Domains) {
          setDomains(data.Domains)
        } else {
          toast.error(data.message || "Error fetching domains.")
        }
      } catch (error) {
        toast.error("Failed to fetch domains.")
        console.error(error)
      }
    }

    fetchDomains()
  }, [API_BASE, token])

  const handleSubmit = async () => {
    const userName = `${firstName} ${lastName}`.trim()

    // Basic form validation
    if (!firstName || !lastName || !emailUserName || !selectedDomain || !alertEmail) {
      toast.error("Please fill in all fields.")
      return
    }

    if (!emailRegex.test(alertEmail)) {
      toast.error("Invalid alert email format.")
      return
    }

    if (!emailUsernameRegex.test(emailUserName)) {
      toast.error("Email username must be alphanumeric and cannot start with a number.")
      return
    }

    const payload = {
      UserName: userName,
      EmailUserName: emailUserName,
      DomainNames: [selectedDomain],
      AlertEmailAddress: alertEmail
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/EmailAccount/CreateZohoMailbox`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      if (data.success) {
        toast.success(data.message || "Mailbox created successfully!")
        setCreatedEmails(data.MailAccounts || [])

        // Clear form
        setFirstName('')
        setLastName('')
        setEmailUserName('')
        // setSelectedDomain('')
        setAlertEmail('')
      } else {
        toast.error(data.message || "Something went wrong.")
      }
    } catch (error) {
      console.error(error)
      toast.error("Error submitting the form.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='rounded-lg mt-5 w-full'>
      <div className='flex justify-evenly gap-3'>
        <div className='w-[500px]'>
          <p className='mt-2 mb-1 font-semibold'>First Name:</p>
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-full rounded-lg'
          />
        </div>
        <div className='w-[500px]'>
          <p className='mt-2 mb-1 font-semibold'>Last Name:</p>
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-full rounded-lg'
          />
        </div>
      </div>

      <div className='flex items-center mt-4 gap-0.5'>
        <div className='w-[700px]'>
          <p className='mt-2 mb-1 font-semibold'>Email:</p>
          <input
            type="text"
            value={emailUserName}
            onChange={e => setEmailUserName(e.target.value)}
            className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-full rounded'
            placeholder="e.g., john123"
          />
        </div>
        <div className='flex gap-0.5 w-[250px]'>
          <p className='bg-gray-200 p-2 mt-10 border rounded border-gray-200'>@</p>
          {/* <select
            className="w-full p-2.5 mt-10 text-sm border border-gray-300 rounded-md outline-none"
            value={selectedDomain}
            onChange={e => setSelectedDomain(e.target.value)}
          >
            <option value="">All Domains</option>
            {domains.map((domain, idx) => (
              <option key={idx} value={domain}>{domain}</option>
            ))}
          </select> */}
          <input
    disabled
    value="quickpipe.xyz"
    className="w-full p-2.5 mt-10 text-sm border border-gray-300 rounded-md bg-gray-100 text-gray-600"
  />
        </div>
      </div>

      <div className='mt-4'>
        <p className='mt-2 mb-1 font-semibold'>Alert Email:</p>
        <input
          type="text"
          value={alertEmail}
          onChange={e => setAlertEmail(e.target.value)}
          className='border border-[rgb(21,163,149)] bg-[rgb(243,250,249)] p-2 w-full rounded'
          placeholder="e.g., you@example.com"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`bg-[#15A395] text-white py-2 px-4 rounded w-full my-6 ${
          loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        {loading ? 'Adding...' : 'Add'}
      </button>


      {createdEmails.length > 0 && (
  <div className=" border border-green-200 text-green-800 rounded p-4 mt-2">
    <p className="font-semibold mb-2">Successfully created email(s):</p>
    <ul className="list-none pl-5">
      {createdEmails.map((email, idx) => (
        <li key={idx}>{email}</li>
      ))}
    </ul>
  </div>
)}

    </div>
  )
}

export default CreateDomain
