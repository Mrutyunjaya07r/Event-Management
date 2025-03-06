import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Eventdetail() {
  let [data, setData] = useState(null);
  let { id } = useParams();
  let navigate=useNavigate();

  let getDetail = async () => {
    try {
      let result = await fetch(`http://localhost:8080/geteventdetail/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('Eventmanagement'),
        },
      });
      result = await result.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };
  let updateregistered=async()=>{
    try {
      let result=await fetch(`http://localhost:8080/paticipateevent/${id}`,{
        method:"PUT",
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('Eventmanagement'),
        }
      })
      result=await result.json();
      console.log(result);
      alert('Registered successfully')
      navigate('/mypaticipatedevent')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Event Details</h1>
      {data ? (
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg p-4">
              <img
                src={data.eventimage}
                alt={data.eventname}
                className="card-img-top rounded"
                style={{ height: '300px' }}
              />
              <div className="card-body">
                <h2 className="card-title text-primary">{data.eventname}</h2>
                <h5 className="text-muted">
                  <i className="bi bi-calendar-event"></i> {data.eventdate} | <i className="bi bi-clock"></i> {data.eventtime}
                </h5>
                <h6 className="text-muted">
                  <i className="bi bi-geo-alt"></i> {data.eventlocation}
                </h6>
                <div className="my-3">
                  <span className="badge bg-danger">{data.eventcategory}</span>
                  <span className="badge bg-warning text-dark ms-2">{data.eventstatus}</span>
                </div>
                <p className="card-text">
                  <strong>Organised By:</strong> {data.postedBy?.name}
                </p>
                <p className="card-text">
                  <strong>Description:</strong>
                </p>
                <p>{data.eventdescription}</p>
                <button className="btn btn-primary w-100 mt-3" onClick={updateregistered}>Register Now</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="alert alert-danger">No Such Event Found</p>
        </div>
      )}
    </div>
  );
}

export default Eventdetail;
