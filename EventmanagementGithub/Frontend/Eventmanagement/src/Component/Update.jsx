import React,{useState} from 'react'
import {Link,useParams} from 'react-router-dom'

function Update() {
        let {id} = useParams();
        let [eventname,setEventname]=useState("");
        let [ eventdate,setEventdate ]=useState("")
        let [ eventtime,setEventtime]=useState("")
        let [ eventdescription,setEventdescription ]=useState("")

        let updateEvent=async()=>{
            try {
                let result=await fetch(`http://localhost:8080/updateevent/${id}`,{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": "Bearer "+localStorage.getItem("Eventmanagement")
                    },
                    body:JSON.stringify({
                        eventname:eventname,
                        eventdate:eventdate,
                        eventtime:eventtime,
                        eventdescription:eventdescription
                    })
                })
                result=await result.json();
                console.log(result);
                alert('updated successfully')
                
            } catch (error) {
                console.log(error)
            }
        }


  return (
    <div>
        <div className="container">
        <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label"> Event Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" value={eventname} onChange={(e)=>{setEventname(e.target.value)}} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Event date</label>
    <input type="date" className="form-control" id="exampleInputEmail2" value={eventdate} onChange={(e)=>{setEventdate(e.target.value)}} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Event time</label>
    <input type="text" className="form-control" id="exampleInputEmail3" value={eventtime} onChange={(e)=>{setEventtime(e.target.value)}} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Event desc</label>
    <input type="text" className="form-control" id="exampleInputPassword4" value={eventdescription} onChange={(e)=>{setEventdescription(e.target.value)}}/>
  </div>
  <button className='btn btn-primary' onClick={updateEvent}>Update</button>
        </div>
    </div>
  )
}

export default Update