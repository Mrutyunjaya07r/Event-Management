import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router'
import Navbar from './Component/Navbar'
import Signup from './Component/Signup'
import Signin from './Component/Signin'
import Home from './Component/Home'
import Adminhome from './Component/Adminhome'
import Footer from './Component/Footer'
import Eventdetail from './Component/Eventdetail'
import Myevents from './Component/Myevents'
import Showevents from './Component/Showevents'
import Allpaticipant from './Component/Allpaticipant'
import Update from './Component/Update'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='/adminhome' element={<Adminhome/>}/>
    <Route path='/eventdetail/:id' element={<Eventdetail/>}/>
    <Route path='/mypaticipatedevent' element={<Myevents/>}/>
    <Route path='/showevent' element={<Showevents/>}/>
    <Route path='/showpaticipatant/:id' element={<Allpaticipant/>}/>
    <Route path='/updateevent/:id' element={<Update/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
     
    </>
  )
}

export default App
