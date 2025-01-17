import { useState } from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <Login/>
      {/* <Signup/> */}
    </div>
    </>
  )
}

export default App
