import React from 'react'
import { useAuthStore } from '../store/auth.store';


function Home() {

  const {user} = useAuthStore();

    const { userName, email, createdAt } = user;

   const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });



  return (
<div className="h-[919px] flex items-center justify-center">
      <div className=" bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-2xl p-10 max-w-md w-full text-center border border-gray-200 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-green-400 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4">
            {userName.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-3xl font-semibold mb-2 text-gray-800">
            Hello, {userName} 
          </h2>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Email:</span> {email}
          </p>
          <p className="text-gray-500 text-sm">
            Joined on {formattedDate}
          </p>
        </div>
      </div>
</div>
  )
}

export default Home
