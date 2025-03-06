import React,{useState,useEffect} from 'react'
import { Link, Links } from 'react-router-dom';

function Showevents() {
    let [data,setData]=useState([])
      let showallEvents = async () => {
        try {
          let response = await fetch("http://localhost:8080/allevents");
          let result = await response.json();
          setData(result);
          console.log(result)
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      useEffect(()=>{
        showallEvents()
      },[])
  return (
    <div className="container mt-4">
    <div className="row">
      {data.length > 0 ? data.map((item, index) => (
        <div className="col-md-4 d-flex justify-content-center" key={index}>
          <div className="card" style={{ width: "18rem", margin: "1rem" }}>
            <img src={item.eventimage} style={{height:"200px",backgroundPosition:"center"}} className="card-img-top" alt={item.pname} />
            <div className="card-body">
              <h5 className="card-title">{item.eventname}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Location: {item.eventlocation}</h6>
              <span className="badge text-bg-danger">{item.eventcategory}</span>
              <span className="badge text-bg-warning" style={{marginLeft:"5px"}}>{item.eventstatus}</span>
              <p className="card-text" style={{fontFamily:"fantasy"}}>Date of event:{item.eventdate}</p>
              <p className="card-text" style={{fontFamily:"fantasy"}}>Event Time:{item.eventtime}</p>
              <p className="card-text" style={{fontFamily:"fantasy"}}>Organised By: {item.postedBy.name}</p>
              <button className='btn btn-primary'><Link style={{color:"white",textDecoration:"none"}} to={`/showpaticipatant/${item._id}`}>Show All Paticipant</Link></button>
              <button className='btn btn-primary'><Link style={{color:"white",textDecoration:"none",marginLeft:"7px"}} to={`/updateevent/${item._id}`}>Update</Link></button>
            </div>
          </div>
        </div>
      )) : <p>No data available</p>}
    </div>
  </div>
  )
}

export default Showevents