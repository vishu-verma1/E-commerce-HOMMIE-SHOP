import React, { useState } from "react";
import { use } from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [loading,SetLoading]=useState(false)
  const submitHandler = async (e) => {
    try {
        SetLoading(true)
      e.preventDefault();
      let data={
        email,
        password
      }
      console.log("ddddddddddddd",data);
      setTimeout(()=>{
        SetLoading(false)
      },5000)
    //   test(email,password)//
    } catch (err) {
      console.log("Error is", err);
    }
  };

  return (
    <div className="  h-full w-full  flex justify-center items-center">
      <div className="h-1/2 lg:h-2/3 md:h-2/3 xl:h-2/3 2xl:h-2/3 w-80 md:w-2/3   xl:w-2/3   lg:w-2/3   2xl:w-2/3   justify-center flex bg-whit/5 rounded-md bg-clip-padding lg:backdrop-filter  md:backdrop-filter  shadow-2xl md:backdrop-blur-md lg:backdrop-blur-md md:bg-opacity-30 lg:bg-opacity-30  ">
        <div className=" h-full w-0 md:w-1/2 lg:w-1/2 lg:flex justify-center invisible lg:visible md:visible items-center ">
          <span className="flex flex-col items-center lg:mb-24 md:mt-24">
            <img src="./images/rb_8223.png" alt="" />
            <h1 className="text-3xl md:text-2xl font-bold font-racing">
              HOMMIE
            </h1>
            <h3 className="text-2xl md:text-1xl md:px-8 md:text-center mt-3 font-semibold">
              Welcome To Your Own shop
            </h3>
          </span>
        </div>
        <div className="  bg-black rounded-md lg:rounded-r-md md::rounded-r-md text-white h-full w-96  lg:w-1/2 md:w-1/2">
          <div className="flex flex-col  justify-center h-full  items-center">
            <form onSubmit={submitHandler}>
              <div>
                <h3 className="md:text-sm ">Email</h3>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  autoComplete={false}
                  className="outline-none md:text-sm  p-2 mb-5 xl:w-96 xl:text-lg lg:w-72 md:w-56 bg-transparent border-b "
                  type="email"
                  name="email"
                  id=""
                  placeholder="Please enter your Email"
                />
              </div>

              <div>
                <h3 className="md:text-sm">Password</h3>
                <input
                  value={password}
                  autoComplete={false}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="outline-none md:text-sm p-2 mb-5 xl:w-96 xl:text-lg lg:w-72 md:w-56 bg-transparent border-b "
                  type="password"
                  name="password"
                  id=""
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex justify-between xl:mt-10 items-center ">
                <button
                  className="border-2 hover:bg-[#D9D9D9] hover:text-black  xl:text-lg md:text-sm font-medium rounded-md p-1 px-5 mt-2"
                  type="submit"
                  name="login"
                  disabled={loading}
                >
                 {loading?"Sign_in":"Login"} 
                </button>
                <a
                  className=" text-blue-400 md:text-sm xl:text-lg hover:text-[#D9D9D9] "
                  href=""
                >
                  Signup
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
