import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/action/Login';
import { userAuth } from '../context/Authcontext';



const Login =()=> {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const {setAuthuser} = userAuth();

   const [userlogin,setuserlogin] = useState({
            email: "",
            password:''
   });
  
   const isAuth = useSelector(state => state.login.isAuth);
   const user = useSelector(state => state.login.user)
   console.log('isAuth', isAuth)

   const hadleuserlogin = (e)=>{
     const {name,value} = e.target;
     setuserlogin({...userlogin, [name]:value})
   }


   const handleSubmit = async (e)=>{
   
      e.preventDefault();
      const formData = new FormData();
    formData.append('email', userlogin.email);
    formData.append('password', userlogin.password);
  
    dispatch(login(formData));
   }

   useEffect(() => {
    if (isAuth && user) {
      setAuthuser(user); 
      navigate('/home');
    }
  }, [isAuth, user]);


const handlReister = () =>{
    navigate('/register')
   }   



  return (
    <div>
   <div className="bg-gray-100 font-[sans-serif] dark:bg-gray-900">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          

          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Login</h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-gray-800 text-lg mb-2 block">email</label>
                <div className="relative flex items-center">
                  <input name="email" value={userlogin.email} onChange={hadleuserlogin} type="text" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter user name" />
                 
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-lg mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input name="password" value={userlogin.password} onChange={hadleuserlogin} type="password" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password" />
                 
                </div>
              </div>

              <div className="!mt-8">
                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  login
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">Don't have an account? <a  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold" onClick={handlReister}>Register here</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}


export default Login;