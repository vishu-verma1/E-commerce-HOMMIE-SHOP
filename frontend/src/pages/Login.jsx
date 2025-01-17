import React from "react";
import { gsap } from "gsap";
import {useGSAP} from '@gsap/react';
import { LoginForm } from "../components/Login/LoginForm";

const Login = () => {




  
  return (
    <div className=" bg-[#D9D9D9] h-screen w-screen font-raleway">
       <div className="bg-[url('./images/rb_50072.png')]  h-full w-full  ">
       <LoginForm/>
       </div>
      
    </div>
  );
};

export default Login;
