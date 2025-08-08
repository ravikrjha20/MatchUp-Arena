import React, { useEffect } from "react";
import useFriendStore from "../store/useFriendStore";

const FriendRequests = () => {
  const {
    incomingRequests,
    outgoingRequests,
    getIncomingRequests,
    getOutgoingRequests,
  } = useFriendStore();

  useEffect(() => {
    getIncomingRequests();
    getOutgoingRequests();
  }, []);

  return (
    <div className='bg-white rounded-2xl shadow-md p-6 mt-4 min-h-[200px]'>
      <h3 className='text-lg font-bold mb-4 text-blue-600'>Friend Requests</h3>
      <div>
        <h4 className='text-sm font-semibold mb-2'>Incoming</h4>
        <ul className='list-disc list-inside space-y-1'>
          {incomingRequests.length === 0 ? (
            <p className='text-gray-400 text-sm'>None</p>
          ) : (
            incomingRequests.map((req) => (
              <li key={req._id} className='text-gray-700'>
                {req.name}
              </li>
            ))
          )}
        </ul>
      </div>
      <div className='mt-4'>
        <h4 className='text-sm font-semibold mb-2'>Outgoing</h4>
        <ul className='list-disc list-inside space-y-1'>
          {outgoingRequests.length === 0 ? (
            <p className='text-gray-400 text-sm'>None</p>
          ) : (
            outgoingRequests.map((req) => (
              <li key={req._id} className='text-gray-700'>
                {req.name}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default FriendRequests;
