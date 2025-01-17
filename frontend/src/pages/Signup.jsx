import React from 'react'

const Signup = () => {
  return (
    <div className="bg-black h-screen w-screen flex justify-center items-center">
    <div className="h-2/3 w-2/3 flex border-2 border-blue-400">
      <div className="bg-white h-full w-1/2">hi</div>
      <div className="bg-black text-white h-full w-1/2">
        <form className=" " action="">
          <div>
              <h3>First Name</h3>
            <input className="outline-none" name="firstame" type="text" placeholder="Please enter your first name"/>
          </div>

          <div>
              <h3>Last Name</h3>
            <input className="outline-none" name="firstame" type="text" placeholder="Please enter your last name"/>
          </div>

          <div>
              <h3>Email</h3>
            <input type="email" name="email" id="" placeholder="Please enter your Email"
            />
          </div>
          <div>
            <h3>Password</h3>
            <input type="password" name="pasword" id="" placeholder='Please enter your password'/>
          </div>

          <div>
            
          </div>

        </form>
      </div>
    </div>
  </div>
  )
}

export default Signup