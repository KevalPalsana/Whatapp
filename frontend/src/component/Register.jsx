import { useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import { registeruser } from '../redux/action/Register';
import { useDispatch, useSelector } from 'react-redux';

export default function Register() {
  const usenavigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    profile: null,

  })

  const userRegister = useSelector(state => state.registeruser.userdata);
  const isAuth = useSelector(state => state.registeruser.isAuth);
  console.log('isAuth', isAuth)
  console.log('userRegister', userRegister)
 
  const handlsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    
if (user.profile) {
  console.log('user.profile', user.profile)
  formData.append("profile", user.profile);
}
};

useEffect(() =>{
  if(isAuth){
      usenavigate("/login");
  }
},[isAuth, usenavigate]);

 
  const handlinput = (e) => {
    const { name, value, files } = e.target;

  if (name === 'profile') {
    setUser((prevUser) => ({
      ...prevUser,
      profile: files[0],
    }));
  } else {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  }

  const hanldloign = () => {
    usenavigate('/login')
  }


  return (
    <>
      <section className="bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center  px-6 py-7 mx-auto md:h-screen lg:py-0">

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-2 md:space-y-0 sm:p-8">
              <h1 className="text-xl  font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Register
              </h1>
              <form className="space-y-2 md:space-y-0" onSubmit={handlsubmit}>
                <div>

                  <label htmlFor="profile"
                    className="flex text-white text-base px-5 py-0 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]">
                
                  
                    <img
                      src={user.profile ? URL.createObjectURL(user.profile) :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_aZ5dsa-PRx_4ozdsfmRi6kNoZdG18gCv8Em9EtWrHCYJD3OT5sKer3_UfZ4c2uc8lrg&usqp=CAU'}
                      alt="Profile"
                      className=" rounded-[50%] w-[95px] h-[95px] object-cover"
                    />

                    <input type="file" id='profile' name='profile'  onChange={(handlinput)} className="hidden" />
                  </label>
                </div>
                <div>
                  <label htmlFor="text" className="block mb-3 text-lg font-medium text-gray-900 dark:text-white">Name</label>
                  <input type="text" name="name" value={user.name} onChange={handlinput} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your name" required="" />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-3 text-lg font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" name="email" value={user.email} onChange={handlinput} id="email" placeholder="Enter your email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-3 text-lg font-medium text-gray-900 dark:text-white">password</label>
                  <input type="password" name="password" value={user.password} onChange={handlinput} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1" required="" />
                </div>
                <div>
                <button type="submit" className="mt-4 w-full  bg-blue-500 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  ">Register</button>
                </div>
    
               
                <p className="text-white text-sm !mt-8 text-center ">Don't have an account? <a className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold" onClick={hanldloign}>Login</a></p>
              </form>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
