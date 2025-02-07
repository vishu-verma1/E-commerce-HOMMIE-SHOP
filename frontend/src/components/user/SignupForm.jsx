import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../redux/actions/userActions";

const signupForm = () => {
    
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state)=>state.signup.loading)

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password || !firstname) {
        alert("please enter all feild");
        return;
      }

      const newUser = {
        fullname:{
          firstname:firstname,
          lastname:lastname
        },
        email,
        mobile,
        password,
      };

      dispatch(register(newUser));

      if(!token){
        setShowError(false);
      }
      
      
    } catch (err) {
      console.log("Error is", err);
    }
  };


  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);


  return (
    <div className="  h-full  w-full   flex justify-center items-center ">
      <div className="h-auto  w-80 md:w-11/12   xl:w-2/3   lg:w-2/3   2xl:w-2/3   justify-center flex bg-whit/5 rounded-md bg-clip-padding lg:backdrop-filter  md:backdrop-filter  shadow-2xl md:backdrop-blur-md lg:backdrop-blur-md md:bg-opacity-30 lg:bg-opacity-30  ">
        <div className="  h-full w-0 md:w-1/2 lg:w-1/2 lg:flex justify-center invisible lg:visible md:visible items-center ">
          <span className="flex flex-col items-center lg:mb-24 md:mt-24">
            <img src="./images/rb_8223.png" alt="" />
            <h1 className="text-3xl md:text-2xl font-bold font-racing">
              HOMMIE
            </h1>
            <h3 className="text-2xl md:text-1xl md:px-8 md:text-center mt-3 font-semibold">
              Welcome To Your Own shop
            </h3>
          { showError && (<div><h3 className="mt-2 text-red-500">invalid email and password !</h3></div>)}
          </span>
        </div>
        <div className=" mx-2 -mt-10 p-2 md:mx-0 md:mt-0 lg:mx-0 lg:mt-0 xl:mt-0 xl:mx-0 bg-black rounded-md lg:rounded-r-md md:rounded-r-md text-white h-auto w-96  lg:w-1/2 md:w-1/2">
          <div className="flex flex-col  justify-center h-full  items-center">
            <form onSubmit={submitHandler}>
              <div>
                <h3 className="text-base ">Firstname</h3>
                <input
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                  autoComplete="off"
                  required
                  className="outline-none md:text-sm  p-2 mb-5 xl:w-96 xl:text-lg l md:w-56 bg-transparent border-b placeholder:text-sm w-72  "
                  type="text"
                  name="firstname"
                  id=""
                  placeholder="Enter your firstname here"
                />
              </div>

              <div>
                <h3 className="md:text-base ">Lastname</h3>
                <input
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                  autoComplete="off"
                  className="outline-none md:text-sm  p-2 mb-5 xl:w-96 xl:text-lg w-72 md:w-56 bg-transparent border-b placeholder:text-sm "
                  type="text"
                  name="lastname"
                  id=""
                  placeholder="Enter your lastname here"
                />
              </div>

              <div>
                <h3 className="md:text-base ">Email</h3>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  autoComplete="off"
                  required
                  className="outline-none md:text-sm  p-2 mb-5 xl:w-96 xl:text-lg w-72 md:w-56 bg-transparent border-b placeholder:text-sm"
                  type="email"
                  name="email"
                  id=""
                  placeholder="Please enter your Email"
                />
              </div>


              <div>
                <h3 className="md:text-base ">Mobile No</h3>
                <input
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                  autoComplete="off"
                  required
                  className="outline-none md:text-sm  p-2 mb-5 xl:w-96 xl:text-lg w-72 md:w-56 bg-transparent border-b placeholder:text-sm"
                  type="number"
                  name="mobile"
                  id=""
                  placeholder="Please enter your mobile number"
                />
              </div>

              <div>
                <h3 className="md:text-base">Password</h3>
                <input
                  value={password}
                  autoComplete="off"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="outline-none md:text-sm p-2 mb-5 xl:w-96 xl:text-lg w-72 md:w-56 bg-transparent border-b placeholder:text-sm "
                  type="password"
                  required
                  name="password"
                  id=""
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex justify-between gap-3 xl:mt-10 mt-2  items-center ">
                <button
                  className="border-2 hover:bg-[#D9D9D9] hover:text-black  xl:text-lg md:text-sm font-medium rounded-md p-1 px-5 "
                  type="submit"
                  name="Create Account"
                 
                >
                  Create
                  
                </button>
                <div className="text-sm">
                  already have an account?
                  <Link
                    to={"/login"}
                    className=" text-blue-400 text-base hover:text-[#D9D9D9] "
                  >
                    
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default signupForm;
