import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Myevents() {
    let [data,setData]=useState([]);

    let mypaticipatedevent=async()=>{
        try {
            let result=await fetch('http://localhost:8080/mypaticipatedevent',{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('Eventmanagement'),
                }
            })
            result=await result.json();
            setData(result);
            console.log(result);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        mypaticipatedevent();
    },[])
  return (
    <div className="container mt-4">
        <h1 className="text-center">My Events</h1>
    <div className="row">
      {data.length > 0 ? data.map((item, index) => (
        <div className="col-md-4 d-flex justify-content-center" key={index}>
          <div className="card" style={{ width: "18rem", margin: "1rem" }}>
            <img src={item.eventimage} style={{height:"200px",backgroundPosition:"center"}} className="card-img-top" alt={item.eventname} />
            <div className="card-body">
              <h5 className="card-title">{item.eventname}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Location: {item.eventlocation}</h6>
              <span className="badge text-bg-danger">{item.eventcategory}</span>
              <span className="badge text-bg-warning" style={{marginLeft:"5px"}}>{item.eventstatus}</span>
              <p className="card-text" style={{fontFamily:"fantasy"}}>Date of event:{item.eventdate}</p>
              <p className="card-text" style={{fontFamily:"fantasy"}}>Event Time:{item.eventtime}</p>
            </div>
          </div>
        </div>
      )) : <p>No data available</p>}
    </div>
  </div>
  )
}

export default Myevents