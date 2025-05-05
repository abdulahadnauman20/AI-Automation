import React, { useEffect, useState } from 'react';
import { useAuthQuery } from '../reactQuery/hooks/useAuthQuery';
import { Copy, Lock, Mail, Phone, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useWorkspaceQuery } from '../reactQuery/hooks/useWorkspaceQuery';
import { BiLoaderCircle } from 'react-icons/bi';

const Settings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const { updatePasswordMutation, updateProfileMutation, userInfo, TFAMutation } = useAuthQuery();

    const [passwords, setPasswords] = useState({
        OldPassword: "",
        NewPassword: "",
        RetypePassword: "",
        Login: false,
    });
    
    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };
    const handleUpdatePassword = () => {
        if (passwords.NewPassword !== passwords.RetypePassword) {
            alert("New password and Retype password do not match!");
            return;
        }
        updatePasswordMutation.mutate(passwords);
        console.log("Password updated successfully!", passwords);
        setIsModalOpen(false);
    };

    
    // console.log(userInfo?.User);
    const [profileData, setProfileData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: '',
        password: '',
        TFA: false,
    });
    
    
    useEffect(() => {
        if (userInfo?.User) {
            setProfileData({
                FirstName: userInfo.User.FirstName || "",
                LastName: userInfo.User.LastName || "",
                Email: userInfo.User.Email || "",
                PhoneNumber: userInfo.User.PhoneNumber || "",
                password: userInfo.User.Password || "",
                TFA: false,
            });
        }
    }, [userInfo]);
    
    const updateProfile = () => {
        const { password, ...profileDetail } = profileData;
        const phoneRegex = /^\+92[0-9]{10}$/;
        if (!phoneRegex.test(profileDetail.PhoneNumber)) {
            toast.error("Invalid phone number format!");
            return;
        }
        console.log(profileDetail);
        updateProfileMutation.mutate(profileDetail);
    }


    // *****************************

    const { currentWorkspace, updateWorkspaceMutation, teamWorkspaceMember, addMemeberMutation } =  useWorkspaceQuery()
    // console.log(currentWorkspace?.Workspace);
    console.log(teamWorkspaceMember?.Members);
    
    const [workspaceData, setWorkspaceData] = useState({
        WorkspaceName: '',
        id: '',
    });
    useEffect(() => {
        if (currentWorkspace?.Workspace) {
            setWorkspaceData({
                WorkspaceName: currentWorkspace?.Workspace?.WorkspaceName,
                id: currentWorkspace?.Workspace?.id
            })
        }
    }, [currentWorkspace])

    const handleUpdateWorkspace = () => {
        console.log({WorkspaceName: workspaceData.WorkspaceName});
        updateWorkspaceMutation.mutate({WorkspaceName: workspaceData.WorkspaceName})
    }


    const [newMember, setNewMember] = useState({
        Email: '',
        Role: 'Admin',
    });
    
    const handlenewMemeber = (e) => {
        setNewMember((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const createMemeber = () => {
        addMemeberMutation.mutate(newMember, {
            onSuccess: () => {
                setIsModalOpen2(false);
                setNewMember({
                    Email: '',
                    Role: 'Admin',
                })
            }
        })
    };

    const handleConnectCalendar = async () => {
        try {
          const tokenObj = JSON.parse(localStorage.getItem('Token'));
          const token = tokenObj?.token;
    
          if (!token) {
            alert('No auth token found.');
            return;
          }
    
          const response = await fetch('https://quick-pipe-backend.vercel.app/calendar/connect', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
    
          if (!response.ok) {
            throw new Error('Failed to connect to calendar');
          }
    
          const data = await response.json();
    
          if (data.url) {
            window.location.href = data.url;
          } else {
            alert('URL not found in response');
          }
        } catch (error) {
          console.error('Error connecting to calendar:', error);
          alert('An error occurred. Please try again.');
        }
      };


    const [activeTab, setActiveTab] = useState('profile');
    const [activeTab2, setActiveTab2] = useState('team');
    // const [members] = useState([
    //     { id: 1, name: 'Beetoo Leru', role: 'Owner', avatar: '👤', color: 'bg-yellow-100' },
    //     { id: 2, name: 'Kaiya Donin', role: 'Editor', avatar: '👤', color: 'bg-purple-100' },
    // ]);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleWorkspaceChange = (e) => {
        const { name, value } = e.target;
        setWorkspaceData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleToggle = () => {
        console.log(userInfo?.User?.TFA);
        if(userInfo?.User?.TFA !== undefined){
            TFAMutation.mutate()
            setProfileData((prev) => ({
                ...prev,
                TFA: !userInfo?.User?.TFA,
            }));
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(workspaceData.id);
    };

    return (
        <div className="p-2 md:p-6 bg-gray-50 min-h-screen justify-center ">
            {/* Navigation Tabs */}
            <div className="w-full max-w-3xl">
                <div className="mb-8 border-b border-gray-300">
                    <nav className="flex space-x-8">
                        <button
                            className={`py-4 text-sm px-1 border-b-2 font-medium ${activeTab === 'profile' ? 'border-green-500 text-green-500' : 'text-gray-500 border-white'}`}
                            onClick={() => setActiveTab('profile')}>
                            Profile
                        </button>
                        <button
                            className={`py-4 text-sm px-1 border-b-2 font-medium ${activeTab === 'workspace' ? 'border-green-500 text-green-500' : 'text-gray-500 border-white'}`}
                            onClick={() => setActiveTab('workspace')}>
                            Workspace & members
                        </button>
                        <button
                            className={`py-4 text-sm px-1 border-b-2 font-medium ${activeTab === 'integrations' ? 'border-green-500 text-green-500' : 'text-gray-500 border-white'}`}
                            onClick={() => setActiveTab('integrations')}>
                            Integrations
                        </button>
                    </nav>
                </div>
            </div>

            {/* Content Based on Active Tab */}
            <div className="bg-white rounded-2xl shadow md:p-6 p-3 ">
                {activeTab === 'profile' ? (
                    <>
                        {/* Profile Picture */}
                        <div className="flex items-center mb-8">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                                <span className="text-xl text-yellow-800">👤</span>
                            </div>
                            <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                                Edit profile picture
                            </button>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                        <User className='text-gray-400' />
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        name="FirstName"
                                        value={profileData.FirstName}
                                        onChange={handleProfileChange}
                                        className="w-full p-2 border border-gray-200 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <User className='text-gray-400' />
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        name="LastName"
                                        value={profileData.LastName}
                                        onChange={handleProfileChange}
                                        className="w-full p-2 border border-gray-200 rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 flex gap-1 items-center">
                                    <Mail size={19} className='text-gray-400' />
                                    Email address
                                </label>
                                <input
                                    type="Email"
                                    name="Email"
                                    value={profileData.Email}
                                    onChange={handleProfileChange}
                                    className="w-full p-2 border border-gray-200 rounded-md"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 flex gap-1 items-center">
                                    <Phone size={19} className='text-gray-400' />
                                    Phone number
                                </label>
                                <input
                                    type="tel"
                                    name="PhoneNumber"
                                    value={profileData.PhoneNumber}
                                    onChange={handleProfileChange}
                                    className="w-full p-2 border border-gray-200 rounded-md"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-sm font-medium text-gray-700 flex gap-1 items-center">
                                        <Lock size={19} className='text-gray-400' />
                                        Password
                                    </label>
                                    <div>
                            {/* Update Password Button */}
                            <button onClick={() => setIsModalOpen(true)} className="text-sm cursor-pointer text-teal-500 hover:text-teal-600">
                                Update password
                            </button>

                            {isModalOpen && (
                                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#8684848c] bg-opacity-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-semibold">Update Password</h3>
                                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer bg-gray-200 px-1.5 rounded-full">✕</button>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium">Old Password</label>
                                                <input
                                                    type="password"
                                                    name="OldPassword"
                                                    value={passwords.OldPassword}
                                                    onChange={handlePasswordChange}
                                                    className="w-full p-2 border border-gray-300 outline-none rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium">New Password</label>
                                                <input
                                                    type="password"
                                                    name="NewPassword"
                                                    value={passwords.NewPassword}
                                                    onChange={handlePasswordChange}
                                                    className="w-full p-2 border border-gray-300 outline-none rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium">Retype Password</label>
                                                <input
                                                    type="password"
                                                    name="RetypePassword"
                                                    value={passwords.RetypePassword}
                                                    onChange={handlePasswordChange}
                                                    className="w-full p-2 border border-gray-300 outline-none rounded-md"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-4 gap-3">
                                            <button onClick={() => setIsModalOpen(false)} className="text-black cursor-pointer border border-gray-300 rounded-full px-4 py-1">
                                                Cancel
                                            </button>
                                            <button onClick={handleUpdatePassword} className="bg-teal-500 cursor-pointer text-white px-4 py-2 rounded-full text-[14px]">
                                                Update Password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                )}
                                </div>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={profileData.password}
                                    readOnly
                                    className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
                                />
                            </div>

                            {/* 2FA Toggle */}
                            <div className="flex justify-between items-center py-2 mb-5">
                                <div className="flex gap-1 items-center">
                                    <Lock size={18} className='text-gray-400' />
                                    <span className="text-sm font-medium text-gray-700">Enable 2FA</span>
                                </div>
                                <button
                                    onClick={handleToggle}
                                    className={`relative inline-flex items-center cursor-pointer h-6 rounded-full w-11 transition-colors focus:outline-none ${userInfo?.User.TFA ? 'bg-green-500' : 'bg-gray-200'}`}
                                >
                                    <span
                                        className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${userInfo?.User?.TFA ? 'translate-x-6' : 'translate-x-1'}`}
                                    />
                                </button>
                            </div>
                        <button onClick={updateProfile} className='border-none text-sm absolute cursor-pointer right-7 bottom-0.5 border-gray-400 rounded-full p-2 bg-teal-400'>Update Profile</button>
                        </div>
                    </>
                ) : activeTab === 'workspace' ? (
                    // Workspace & Members Content (from WorkspaceMembers.jsx)
                    <>
                        {/* Workspace Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Workspace</h2>
                            <div className="">
                                {/* Workspace Name */}
                                <div className="mb-6 relative">
                                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                        </svg>
                                        Workspace name
                                    </label>
                                    <input
                                        type="text"
                                        name="WorkspaceName"
                                        value={workspaceData.WorkspaceName}
                                        onChange={handleWorkspaceChange}
                                        className="w-full p-2 border outline-none border-gray-300 rounded-md"
                                    />
                                    <button onClick={handleUpdateWorkspace} className={`bg-teal-300 py-1 absolute top-4 right-2 px-3 cursor-pointer my-4 rounded-full transition-opacity duration-300 ${ workspaceData.WorkspaceName ? "opacity-100" : "opacity-0"}`}>Update</button>
                                </div>


                                {/* Workspace ID */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                        <User />
                                        Worskpace ID
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={workspaceData.id}
                                            readOnly
                                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                        />
                                        <button
                                            onClick={copyToClipboard}
                                            className="absolute cursor-pointer right-2 top-2 text-gray-500 hover:text-gray-700">
                                        <Copy />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Members Section */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Members</h2>
                            <div className="bg-white rounded-lg shadow">
                                {/* Member Tabs */}
                                <div className="border-b border-gray-200 md:px-6 px-2 text-sm flex justify-between items-center">
                                    <div className="flex md:space-x-6 gap-2">
                                        <button
                                            onClick={() => setActiveTab2('team')}
                                            className={`md:py-4 md:px-1 font-medium relative ${activeTab2 === 'team'
                                                ? 'text-green-500 border-b-2 border-green-500'
                                                : 'text-gray-500'
                                                }`}
                                        >
                                            The Team
                                        </button>
                                        <button
                                            onClick={() => setActiveTab2('pending')}
                                            className={`py-4 px-1 font-medium ${activeTab2 === 'pending'
                                                ? 'text-green-500 border-b-2 border-green-500'
                                                : 'text-gray-500'
                                                }`}>
                                            Pending Invitations
                                        </button>
                                    </div>
                                    <button onClick={() => setIsModalOpen2(true)} className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full flex gap-1 items-center">
                                        <User />
                                        <span className='hidden md:block cursor-pointer'>Add Member</span>
                                    </button>

                                    {isModalOpen2 && (
                                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#8684848c] bg-opacity-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                        <div className="flex justify-between cursor-pointer items-center mb-4">
                                            <h3 className="text-lg font-semibold ">Add new Member</h3>
                                            <button onClick={() => setIsModalOpen2(false)} className="text-gray-500 hover:text-gray-700  bg-gray-200 px-1.5 cursor-pointer rounded-full">✕</button>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                
                                                <label className="text-sm font-medium flex gap-1 pb-2"><Mail size={19} className='text-gray-400'/> Email Address</label>
                                                <input
                                                    type="email"
                                                    name='Email'
                                                    placeholder='Enter member email'
                                                    value={newMember.Email}
                                                    onChange={handlenewMemeber}
                                                    className="w-full p-3 border border-gray-300 outline-none rounded-md"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm font-medium flex gap-1 py-2"> <Lock size={19} className='text-gray-400'/>Role</label>
                                                <select onChange={handlenewMemeber} name='Role' value={newMember.Role} id="" className='w-full p-3 border border-gray-300 outline-none rounded-md'>
                                                    <option value="Admin" className='p-2 border'>Admin</option>
                                                    <option value="Editor">Editor</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-4 gap-3">
                                            <button onClick={() => setIsModalOpen2(false)} className="text-black cursor-pointer border border-gray-300 rounded-full px-4 py-1">
                                                Cancel
                                            </button>
                                            <button  onClick={createMemeber} className="bg-teal-500 cursor-pointer text-white px-4 py-2 rounded-full text-[14px]">
                                                {addMemeberMutation?.isPending ? 
                                                ( <BiLoaderCircle className="size-7 text-center animate-spin" /> ) : 
                                                ( "Send invite" ) 
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                )}
                                </div>

                                {/* Member List */}
                                <div className="p-6">
                                    {activeTab2 === 'team' ? (
                                    <div className="space-y-4">
                                        {teamWorkspaceMember?.Members.map(member => (
                                            <div key={member.UserId} className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className={`w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3`}>
                                                        <span>👤</span>
                                                    </div>
                                                    <span className="font-medium">{member?.FullName || 'Beeto'}</span>
                                                </div>
                                                <span className="text-gray-500">{member.Role}</span>
                                            </div>
                                        ))}
                                    </div>
                                    ) : (
                                        <div className="space-y-4">
                                        {teamWorkspaceMember?.Invites.map(member => (
                                            <div key={member.UserId} className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className={`w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3`}>
                                                        <span>👤</span>
                                                    </div>
                                                    <span className="font-medium">{member?.FirstName || 'Beeto'}</span>
                                                </div>
                                                <span className="text-gray-500">{member.Role}</span>
                                            </div>
                                        ))}
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                ) : activeTab === 'integrations' ? (
                    // Placeholder for Integrations (you can expand this later)
                    <div className="bg-white md:p-6">
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input
                                type="search"
                                className="block w-full p-2 pl-10 text-sm text-gray-700 border border-gray-200 rounded-full bg-gray-50"
                                placeholder="Search..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Slack */}
                            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm group hover:border-[#15A395] transition-colors duration-200">
                                <div className="mb-3">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 19.5a3.5 3.5 0 01-3.5-3.5 3.5 3.5 0 013.5-3.5h3.5v3.5a3.5 3.5 0 01-3.5 3.5zm1.75-10.5V6.5a3.5 3.5 0 013.5-3.5 3.5 3.5 0 013.5 3.5v10.5a3.5 3.5 0 01-3.5 3.5 3.5 3.5 0 01-3.5-3.5v-7zm10.5 1.75h3.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5h-3.5v-7zm-1.75 10.5v3.5a3.5 3.5 0 01-3.5 3.5 3.5 3.5 0 01-3.5-3.5v-3.5h7z" fill="#E01E5A" />
                                        <path d="M19.5 6.5a3.5 3.5 0 013.5-3.5 3.5 3.5 0 013.5 3.5v3.5h-3.5a3.5 3.5 0 01-3.5-3.5zm-1.75 1.75H8.25a3.5 3.5 0 01-3.5-3.5 3.5 3.5 0 013.5-3.5h10.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5z" fill="#36C5F0" />
                                        <path d="M25.5 19.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5h-3.5v-3.5a3.5 3.5 0 013.5-3.5zm-1.75 10.5v-3.5a3.5 3.5 0 013.5-3.5 3.5 3.5 0 013.5 3.5v3.5h-7z" fill="#ECB22E" />
                                        <path d="M12.5 25.5a3.5 3.5 0 01-3.5 3.5 3.5 3.5 0 01-3.5-3.5v-3.5h3.5a3.5 3.5 0 013.5 3.5zm1.75-1.75h10.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5h-10.5a3.5 3.5 0 01-3.5-3.5 3.5 3.5 0 013.5-3.5z" fill="#2EB67D" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 mb-1">Slack</h3>
                                <p className="text-sm text-gray-600 mb-4 leading-relaxed">Connect Quickpipe AI with Slack to get instant lead updates, follow-up reminders, and notifications in your team's channels for seamless collaboration.</p>
                                <div className="flex items-center justify-between gap-2">
                                    <button className="flex items-center justify-center text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        Manage
                                    </button>
                                    <button className="flex items-center justify-center text-xs text-gray-500 bg-white group-hover:bg-[#15A395] group-hover:text-white px-3 py-1.5 rounded-full border border-gray-200 group-hover:border-[#15A395] transition-colors duration-200">
                                        Connect
                                    </button>
                                </div>
                            </div>

                            {/* Google Calendar */}
                            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm group hover:border-[#15A395] transition-colors duration-200">
                                <div className="mb-3">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="4" y="6" width="24" height="20" rx="2" fill="#4285F4" />
                                        <rect x="10" y="12" width="12" height="2" fill="white" />
                                        <rect x="10" y="16" width="12" height="2" fill="white" />
                                        <rect x="10" y="20" width="8" height="2" fill="white" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 mb-1">Google Calendar</h3>
                                <p className="text-sm text-gray-600 mb-4 leading-relaxed">Automatically sync meetings, follow-ups, and reminders from Quickpipe AI to Google Calendar, ensuring you never miss an important event.</p>
                                <div className="flex items-center justify-between gap-2">
                                    <button className="flex items-center justify-center text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        Manage
                                    </button>
                                    <button onClick={handleConnectCalendar} className="flex items-center cursor-pointer justify-center text-xs text-gray-500 bg-white group-hover:bg-[#15A395] group-hover:text-white px-3 py-1.5 rounded-full border border-gray-200 group-hover:border-[#15A395] transition-colors duration-200">
                                        Connect
                                    </button>
                                </div>
                            </div>

                            {/* Open AI */}
                            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm group hover:border-[#15A395] transition-colors duration-200">
                                <div className="mb-3">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M26 16a10 10 0 1 1-20 0 10 10 0 0 1 20 0z" stroke="#000" strokeWidth="1.5" />
                                        <path d="M16 6v20M6 16h20M23 9 9 23M9 9l14 14" stroke="#000" strokeWidth="1.5" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 mb-1">Open AI</h3>
                                <p className="text-sm text-gray-600 mb-4 leading-relaxed">Leverage AI to draft emails, summarize notes, and predict lead conversions directly within Quickpipe AI. Boosting efficiency and personalization.</p>
                                <div className="flex items-center justify-between gap-2">
                                    <button className="flex items-center justify-center text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        Manage
                                    </button>
                                    <button className="flex items-center justify-center text-xs text-gray-500 bg-white group-hover:bg-[#15A395] group-hover:text-white px-3 py-1.5 rounded-full border border-gray-200 group-hover:border-[#15A395] transition-colors duration-200">
                                        Connect
                                    </button>
                                </div>
                            </div>

                            {/* Hubspot */}
                            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm group hover:border-[#15A395] transition-colors duration-200">
                                <div className="mb-3">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.41 13.714v4.572H8.53v-4.572H5.41zm9.143 0v4.572h3.122v-4.572h-3.122zm9.143 0v4.572h3.122v-4.572h-3.122zM10.133 22.857v-3.122H5.562a4.572 4.572 0 0 0 4.571 3.122zm3.2-3.122v3.122a4.571 4.571 0 0 0 4.572-4.572h-1.371v1.45h-3.2zm9.142 0v3.122a4.571 4.571 0 0 0 4.572-4.572H25.6v1.45h-3.124z" fill="#FF7A59" />
                                        <path d="M25.6 9.143a4.571 4.571 0 0 0-4.572 4.571h1.372v-1.45H25.6v-3.121zm-9.143 4.571a4.572 4.572 0 0 0-4.571-4.571v3.121h3.2v-1.45h1.371zM10.133 12.266V9.143a4.571 4.571 0 0 0-4.571 4.571h1.371v-1.45h3.2z" fill="#FF7A59" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 mb-1">Hubspot</h3>
                                <p className="text-sm text-gray-600 mb-4 leading-relaxed">Integrate HubSpot with Quickpipe AI to sync lead data, track interactions, and access HubSpot's analytics for a seamless sales workflow.</p>
                                <div className="flex items-center justify-between gap-2">
                                    <button className="flex items-center justify-center text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        Manage
                                    </button>
                                    <button className="flex items-center justify-center text-xs text-gray-500 bg-white group-hover:bg-[#15A395] group-hover:text-white px-3 py-1.5 rounded-full border border-gray-200 group-hover:border-[#15A395] transition-colors duration-200">
                                        Connect
                                    </button>
                                </div>
                            </div>

                            {/* Salesforce */}
                            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm group hover:border-[#15A395] transition-colors duration-200">
                                <div className="mb-3">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.847 7.84c1.017-1.08 2.45-1.747 4.045-1.747 3.05 0 5.547 2.44 5.547 5.427 0 .48-.067.933-.187 1.373 1.627.587 2.8 2.147 2.8 3.96 0 2.333-1.947 4.227-4.347 4.227-.24 0-.48-.013-.707-.053-.573 1.373-1.933 2.347-3.52 2.347-.667 0-1.293-.174-1.84-.467-.6 2.053-2.52 3.547-4.773 3.547-2.293 0-4.227-1.534-4.8-3.627-.28.053-.573.08-.867.08-2.413 0-4.387-1.893-4.387-4.227 0-1.813 1.173-3.373 2.827-3.96-.12-.44-.187-.893-.187-1.373 0-2.987 2.493-5.427 5.56-5.427 1.307 0 2.493.453 3.44 1.213.4-.306.84-.573 1.293-.786.04-.133.093-.267.133-.413z" fill="#00A1E0" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 mb-1">Salesforce</h3>
                                <p className="text-sm text-gray-600 mb-4 leading-relaxed">Sync leads and contact data between Quickpipe AI and Salesforce. Track progress, update records, and access CRM insights without leaving the app.</p>
                                <div className="flex items-center justify-between gap-2">
                                    <button className="flex items-center justify-center text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        Manage
                                    </button>
                                    <button className="flex items-center justify-center text-xs text-gray-500 bg-white group-hover:bg-[#15A395] group-hover:text-white px-3 py-1.5 rounded-full border border-gray-200 group-hover:border-[#15A395] transition-colors duration-200">
                                        Connect
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Settings;