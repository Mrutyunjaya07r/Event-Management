import React from 'react'
import { Link,useNavigate } from 'react-router'

function Navbar() {
    let navigate=useNavigate();
    const logout=()=>{
        localStorage.removeItem("Eventmanagement");
        navigate('/signin')
    }
  return (
    <div>
        <div className="container">
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
    <div style={{height:"60px",width:"100px"}}>
      <img src='https://i.pinimg.com/736x/17/07/bb/1707bb5cf56122ef320c571c94abff6f.jpg' style={{height:"70px",width:"100px",borderRadius:"20px"}} alt="" />
      </div>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <span className="fs-4" style={{fontWeight:"lighter",fontFamily:"fantasy",marginLeft:"7px"}}>Evento</span>
      </a>

      <ul className="nav nav-pills">
        <li className="nav-item"><Link to="/" className="nav-link active" style={{margin:"10px"}} aria-current="page">Home</Link></li>
        <li className="nav-item"><Link to="/mypaticipatedevent" style={{margin:"10px"}} className="nav-link active">My participation</Link></li>
        {
            localStorage.getItem("Eventmanagement") !== null ? <button className='btn btn-danger' style={{height:"40px",margin:"10px"}} onClick={logout}>Logout</button>: <div style={{display:"flex"}}>
                <li className="nav-item"><Link to='/signin' style={{margin:"10px"}} className="nav-link">Signin</Link></li>
                <li className="nav-item"><Link to="/signup" style={{margin:"10px"}} className="nav-link">Register Now!</Link></li>
            </div> 
        }
      <li className="nav-item"><Link to="/mypaticipatedevent" style={{margin:"10px"}} className="nav-link active"><img src='https://img.freepik.com/premium-vector/robot-icon-bot-sign-design-chatbot-symbol-concept-voice-support-service-bot-online-support-bot-vector-stock-illustration_100456-34.jpg?w=2000' style={{height:"30px",width:"40px",borderRadius:"50%"}}/></Link></li>
      </ul>
    </header>
  </div>
    </div>
  )
}

export default Navbar