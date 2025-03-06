import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router';

function Adminhome() {
    let navigate=useNavigate();
    let [eventname,setEventname]=useState("");
    let [ eventdate,setEventdate ]=useState("")
    let [ eventtime,setEventtime]=useState("")
    let [ eventlocation,setEventlocation ]=useState("")
    let [ eventdescription,setEventdescription ]=useState("")
    let [ eventimage,setEventimage]=useState("")
    let [ eventstatus,setEventstatus ]=useState("")
    let [ eventcategory,setEventcategory ]=useState("")
    let [url,setUrl]=useState();

    useEffect(()=>{
        if(url){
            fetch("http://localhost:8080/addevent",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+localStorage.getItem("Eventmanagement")
                },
                body:JSON.stringify({
                    eventname:eventname,
                    eventdate:eventdate,
                    eventtime:eventtime,
                    eventlocation:eventlocation,
                    eventdescription:eventdescription,
                    pic:url,
                    eventcategory:eventcategory,
                    eventstatus:eventstatus
                    
                })
            })
            .then((res)=>res.json())
            .then((data)=>{console.log(data)})
            .catch((err)=>{console.log(err)})
            navigate('/')
        }
    },[url])

    let postDetail=async()=>{
        console.log(eventimage,eventname)
        let data=new FormData();
        data.append("file",eventimage);
        data.append("upload_preset","Eventmanagement")
        data.append("cloud_name","mrutyunjayacloud")
        fetch("https://api.cloudinary.com/v1_1/mrutyunjayacloud/image/upload",{
            method:"post",
            body:data
        })
        .then((res)=>res.json())
        .then((data)=>setUrl(data.url))
        .catch((err)=>{console.log(err)})

    }


    var loadFile =(event)=> {
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
          URL.revokeObjectURL(output.src) // free memory
        }
      };


  return (
    <div>
        <div className="container">
        <h1>Admin Page | Add Products</h1>
        <div className="formcon">
          <p>Add photo</p>  
          <img id="output" style={{height:"200px",width:"200px",margin:"10px"}}/>
        <input type="file" accept="image/*" onChange={(event)=>{loadFile(event);setEventimage(event.target.files[0])}}/>

<div className="container">
<div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Event Name</label>
    <input type="text" className="form-control" id="exampleInputPassword1" value={eventname} onChange={(e)=>{setEventname(e.target.value)}}/>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Event category</label>
    <input type="text" className="form-control" id="exampleInputPassword2" value={eventcategory} onChange={(e)=>{setEventcategory(e.target.value)}}/>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Event date</label>
    <input type="date" className="form-control" id="exampleInputPassword3" value={eventdate} onChange={(e)=>{setEventdate(e.target.value)}}/>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Event Description</label>
    <input type="text" className="form-control" id="exampleInputPassword4" value={eventdescription} onChange={(e)=>{setEventdescription(e.target.value)}}/>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Event Location</label>
    <input type="text" className="form-control" id="exampleInputPassword5" value={eventlocation} onChange={(e)=>{setEventlocation(e.target.value)}}/>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Event Status</label>
    <input type="text" className="form-control" id="exampleInputPassword6" value={eventstatus} onChange={(e)=>{setEventstatus(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Event Time</label>
    <input type="text" className="form-control" id="exampleInputPassword7" value={eventtime} onChange={(e)=>{setEventtime(e.target.value)}}/>
  </div>


    <button className='btn btn-primary' onClick={postDetail}>Add Product</button>
</div>
       

        </div>
        </div>
        <div className="container">
          <button className='btn btn-primary' style={{margin:"10px"}}><Link to="/showevent" style={{color:"white",textDecoration:"none"}}>All Events</Link></button>
        </div>
    </div>
  )
}

export default Adminhome