import React, { useState } from 'react'
import { useAuthStore } from '../store/auth.store'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const {isLoading , authLogIn} = useAuthStore();

const navigate = useNavigate();

  const [userForm , setUserFrom] = useState({
    email: '',
    password: ''
  })

  const validation = () => {
     if(!userForm.email.trim()){
    toast.error("Email is required");
return;
  }else if(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userForm.email)){
    toast.error("Email is not valid")
    return;
  }

   if (!userForm.password) {
      toast.error("Password is required");
      return false;
    } else if (userForm.password.length < 10) {
      toast.error("Password must be at least 10 characters");
      return false;
    }

    return true
  }


  const handelSubmit = async(e) => {
    e.preventDefault();
     const success = validation();
if(!success) return
    try {
     await authLogIn(userForm);
     setUserFrom({email: '', password: ''})
     navigate('/')
    } catch (error) {
      toast.error("Logged In failed")
    }
  }


  return (
   <main className=" h-[919px]
    bg-gradient-to-br from-teal-500 via-emerald-500 to-lime-500
    flex items-center justify-center
    transition-colors duration-300
    dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-black">
      {/* Outer box */}
      <div className="relative sm:m-8 m-5 p-1 rounded-custom overflow-hidden w-[400px] sm:w-[700px]">

        {/* Floating rotating layers (simulate ::before and ::after) */}
        <div className="absolute -top-1/2 -left-1/2 w-[500px] h-[700px] bg-gradient-to-tr from-cyan-200 via-teal-400 to-cyan-50 origin-bottom-right animate-rotateAnim z-0"></div>
        <div className="absolute -top-1/2 -left-1/2 w-[500px] h-[700px] bg-gradient-to-tr from-lime-200 via-green-400 to-green-900 origin-bottom-right animate-rotateAnimDelay z-0"></div>

        {/* Inner card stays above */}
        <div className="relative z-10
bg-gradient-to-br from-teal-500 via-emerald-500 to-lime-500
text-white
rounded-custom p-12 sm:p-16 shadow-lg
flex flex-col gap-5 sm:gap-9
transition-colors duration-300
dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-black
dark:text-gray-200">
          <h3 className="text-4xl font-bold text-center">Welcome back</h3>

          <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
           
            <div>
              <label className="pl-1 block">Email</label>
              <input
                type="email"
                className="w-full p-2 bg-white text-gray-700 rounded-lg"
                value={userForm.email}
               onChange={(e) => setUserFrom({...userForm , email: e.target.value})}
              />
            </div>

            <div>
              <label className="pl-1 block">Password</label>
              <input
                type="password"
                className="w-full p-2 bg-white text-gray-700 rounded-lg"
                value={userForm.password}
               onChange={(e) => setUserFrom({...userForm , password: e.target.value})}
              />
            </div>
             <div className="flex items-center justify-center">
  <button
    className="
        bg-emerald-600 text-white rounded-2xl p-2
w-[200px] block
border-2 border-transparent
transition-all duration-150
hover:bg-emerald-700 hover:scale-105
focus:border-white focus:ring-4 focus:ring-white outline-none

dark:bg-gray-800 dark:text-gray-100
dark:hover:bg-gray-700
dark:focus:border-emerald-400 dark:focus:ring-emerald-400
   mt-7 "
   
  >
   {isLoading ? 'Loading...' : 'Log In'}
  </button>
</div>
          </form>

       

          <p className="flex justify-center w-full">
            Already have an account?{" "}
            <Link to={'/signup'} className="text-blue-900 cursor-pointer">Log-In</Link>
          </p>
        </div>
      </div>
    </main>

  )
}

export default Login
