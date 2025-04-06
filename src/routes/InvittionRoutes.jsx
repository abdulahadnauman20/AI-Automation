import { CircleCheckBig, Eye, Info, X } from 'lucide-react'
import React, { useEffect } from 'react'
import { useWorkspaceQuery } from '../reactQuery/hooks/useWorkspaceQuery';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function InvittionRoutes() {
    const {wkid, usid} = useParams();
    // console.log( wkid, usid);
    const navigate = useNavigate();
    const payload = {
        wkid, 
        usid
    }
    const { acceptInvitationMutation, rejectInvitationMutation, verifyMemberInvitation} = useWorkspaceQuery()
    let member;

    // useEffect(() => {
    //     if (payload) {
    //       verifyMemberInvitation.mutate(wkid, usid);
    //     }
    // }, []); 
    
    const handleAccept = () => {
        acceptInvitationMutation.mutate(payload, {
            onSuccess: () => {
                navigate("/")
            }
        });
    };

    const handleReject = () => {
        rejectInvitationMutation.mutate(payload, {
            onSuccess: () => {
                navigate("/")
            }
        });
    };

  return (
    <div id="alert-additional-content-3" className="p-4 max-w-[600px] mx-auto m-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
        <div className="flex gap-1 items-center">
            <Info size={20}/>
            <h3 className="text-lg font-medium">Invitation by Workspace member</h3>
        </div>
        <div className="mt-2 mb-4">
            {/* {teamWorkspaceMember?.Members.map(member => ( */}
                <div key={member?.UserId || '1'} className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className={`w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3`}>
                            <span>👤</span>
                        </div>
                        <div className='flex-col'>
                            <span className="font-medium">Name: {verifyMemberInvitation?.Username || 'No name'}</span>
                            <div className="text-gray-500">Role: {verifyMemberInvitation?.Role || 'No role'}</div>
                        </div>
                    </div>
                </div>
            {/* ))} */}
        </div>
        <div className="flex">
            <button onClick={handleAccept} type="button" className="text-white cursor-pointer bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-[15px] px-3 py-1.5 me-2 text-center inline-flex items-center gap-1">
            <CircleCheckBig size={18} />
            Accept
            </button>
            <button onClick={handleReject} type="button" className="text-green-800 cursor-pointer bg-transparent border flex items-center gap-1 border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-[16px] px-3 py-1.5 text-center" data-dismiss-target="#alert-additional-content-3" aria-label="Close">
            <X size={18} />
            Reject
            </button>
        </div>
    </div>
  )
}

export default InvittionRoutes