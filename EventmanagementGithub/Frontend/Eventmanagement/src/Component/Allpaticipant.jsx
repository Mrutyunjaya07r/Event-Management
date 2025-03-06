import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Allpaticipant() {
    let {id}=useParams();
    let [data,setData]=useState([])

    let allpaticipate=async()=>{
        try {
            let result=await fetch(`http://localhost:8080/numberofpaticipate/${id}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('Eventmanagement'),
                }
            })
            result=await result.json();
            setData(result)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        allpaticipate()
    },[])
  return (
    <div className='container'>
        <h1>Number of paticipate</h1>
        {
            data.length>0 ? data.map((item,index)=>(
                <div key={index}>
                    <div style={{height:"200px",width:"600px",backgroundColor:"ButtonFace",padding:"20px",margin:"20px",borderRadius:"20px"}}>
                        <h2>Name:{item.name}</h2>
                        <h3>email:{item.email}</h3>
                        <h3>username:{item.username}</h3>
                    </div>
                </div>
            )) : <p>No Participation</p>
        }
    </div>
  )
}

export default Allpaticipant