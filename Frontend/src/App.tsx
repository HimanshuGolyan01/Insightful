import React from 'react'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import Blogs from './Pages/Blogs'
import Blog from './Pages/Blog'
import { BrowserRouter, Routes , Route} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Signin" element={<Signin/>}/>
      <Route path="/Blogs"  element={<Blogs/>} />
      <Route path="/blog/:id" element={<Blog />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
