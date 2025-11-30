import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstances';
import "../styles/adminDash.css";


import tourData from '../assets/data/tours'


// ⭐ ADD THESE 2 LINES
import Aos from "aos";
import "aos/dist/aos.css";
import { format } from 'date-fns';
import axios from 'axios';

// --- SIDEBAR ---
const AdminSidebar = ({ activeTab, setActiveTab }) => {

  return (
    // Changed bg-dark to bg-light
    // Changed text-white to text-dark
    <div className="d-flex flex-column flex-shrink-0 p-3 text-dark bg-light"
      style={{ width: '260px', minHeight: '100vh' }}
      data-aos="fade-right"
    >
      <h4 className="text-center fw-bold">Admin Panel</h4>
      <hr />

      {/* Tabs */}
      <button 
        // Changed text-white to text-dark
        className={`nav-link text-dark w-100 text-start mt-2 ${activeTab === 'tours' ? 'active bg-warning text-dark' : ''}`}
        onClick={() => setActiveTab('tours')}
        data-aos="fade-up"
      >
        <i className="bi bi-airplane me-2"></i> Manage Tours
      </button>

      <button 
        // Changed text-white to text-dark
        className={`nav-link text-dark w-100 text-start mt-2 ${activeTab === 'users' ? 'active bg-warning text-dark' : ''}`}
        onClick={() => setActiveTab('users')}
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <i className="bi bi-people me-2"></i> Booking
      </button>
      <hr />
{/*       
      <button className="btn btn-danger w-100" data-aos="zoom-in">
        <i className="bi bi-box-arrow-right me-2"></i> Logout
      </button> */}

    </div>
  );
};



// --- TOURS MANAGEMENT ---
const ManageTours = () => {


  const [tours, setTours] = useState([]);


  console.log("ManageTours toures : " , tours);

  const[loading , setLoading] = useState(false);


// 1. Separate State for Text Data
  const [inputs, setInputs] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    price: "",
    maxGroupSize: "",
    desc: "",
  });

  // 2. Separate State for the File
  const [tourPhoto, setTourPhoto] = useState(null);

  // Handle Text Inputs
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle File Input
  const handleFileChange = (e) => {
    // We select the first file from the array
    setTourPhoto(e.target.files[0]);
  };

  // Handle Submit
  const handleCreate = async (e) => {
    e.preventDefault(); 
     setLoading(true)
    const formData = new FormData();
    // Append text fields
    formData.append("title", inputs.title);
    formData.append("city", inputs.city);
    formData.append("address", inputs.address);
    formData.append("distance", inputs.distance);
    formData.append("price", inputs.price);
    formData.append("maxGroupSize", inputs.maxGroupSize);
    formData.append("desc", inputs.desc);
    if (tourPhoto) {
      formData.append("photo", tourPhoto);
    }

    try {
      // Replace with your actual API URL
      const res = await axios.post("http://localhost:4000/api/v1/tours/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Tour created!" , res.data);
      alert("Success");
      fetchTours();//update new toures
    } catch (err) {
      console.error(err);
      alert("Failed to create tour");
    }finally{
     setLoading(false);

    }
  };


  const fetchTours = async () => {
    try {
      const res = await axiosInstance.get("/tours");
      setTours(res.data.data);
    } catch (error) {
      alert("Error fetching tours");
    }
  };


  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Do you want to delete this tour?")) return;
    try {

      await axiosInstance.delete(`/tours/delete/${id}`);
      alert("Tour Deleted!");
      fetchTours();
    } catch {
      alert("Failed to delete tour");
    }
  };

  // const handleCreate = async () => {
  //   try {
  //     await axiosInstance.post("/tours", newTour);
  //     alert("Tour Created Successfully");
  //     fetchTours();
  //   } catch {
  //     alert("Failed to create tour");
  //   }
  // };


return (
    <div className="container-fluid">
      <h2 className="mb-4">Manage Tours</h2>

      {/* Add Form */}
      <div className="card border-0 shadow-sm mb-4"> 
        {/* I removed data-aos="zoom-in" temporarily to debug visibility */}
        <div className="card-body">
          <h5 className="mb-4">Add New Tour</h5>
          <form onSubmit={handleCreate}>
            <div className="row g-3">
              {/* Title */}
              <div className="col-md-12">
                <label htmlFor="title" className="form-label">Tour Title</label>
                <input type="text" className="form-control" id="title" required onChange={handleChange} value={inputs.title} />
              </div>
              {/* City & Address */}
              <div className="col-md-6">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" className="form-control" id="city" required onChange={handleChange} value={inputs.city} />
              </div>
              <div className="col-md-6">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address" required onChange={handleChange} value={inputs.address} />
              </div>
              {/* Numbers */}
              <div className="col-md-4">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" className="form-control" id="price" required onChange={handleChange} value={inputs.price} />
              </div>
              <div className="col-md-4">
                <label htmlFor="distance" className="form-label">Distance</label>
                <input type="number" className="form-control" id="distance" required onChange={handleChange} value={inputs.distance} />
              </div>
              <div className="col-md-4">
                <label htmlFor="maxGroupSize" className="form-label">Max People</label>
                <input type="number" className="form-control" id="maxGroupSize" required onChange={handleChange} value={inputs.maxGroupSize} />
              </div>
               {/* Photo */}
               <div className="col-md-12">
                  <label htmlFor="photo" className="form-label">Tour Photo</label>
                  <input type="file" className="form-control" id="photo" accept="image/*" onChange={handleFileChange} />
               </div>
              {/* Desc */}
              <div className="col-md-12">
                <label htmlFor="desc" className="form-label">Description</label>
                <textarea className="form-control" id="desc" rows="3" required onChange={handleChange} value={inputs.desc}></textarea>
              </div>
              <div className="col-12">
                <button type="submit" disabled={loading}  className="btn btn-success mt-2">{loading ? "loading...." : "Create Tour"}</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* --- THIS IS THE TABLE PART --- */}
      {/* I removed data-aos tags to ensure visibility first */}
      <div className="card border-0 shadow">
        <div className="card-body p-0">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th>Title</th>
                <th>City</th>
                <th>Price</th>
                <th>Distance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Check if tourData exists and map it */}
              {tours&& tours?.map((tour) => (
                <tr key={tour._id}>
                  <td className="fw-bold">{tour.title}</td>
                  <td>{tour.city}</td>
                  <td>${tour.price}</td>
                  <td>{tour.distance} km</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(tour._id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}

              {/* Show this if list is empty */}
              {(!tourData || tourData.length === 0) && (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-3">No tours available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};



// --- USERS ---
const ManageUsers = () => {


  const[userBooking , setUserBooking]  = useState([]);
   
  async function fetchbooking() {
    try {
      const response = await axiosInstance.get("/booking/all");
      setUserBooking(response.data.data);
    } catch (error) {
      alert("falied to fetche user booking !")
    }
  }

  useEffect(()=>{
    fetchbooking()
  },[])

  console.log("user all booking in admin page : " , userBooking);


return(
  
  <div className="container" data-aos="fade-up">
    <h2 className="mb-4">Booking Management</h2>

      {/* Tours Table */}
      <div className="card border-0 shadow" data-aos="fade-right" data-aos-delay="200">
        <div className="card-body p-0">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th>User</th>
                <th>Title</th>
                <th>guestSize</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {userBooking && userBooking.map((tour, i) => (
                <tr key={tour._id} data-aos="fade-left" data-aos-delay="100">
                  <td className="fw-bold">{tour.userEmail}</td>
                  <td className="fw-bold">{tour.tourName}</td>
                  <td>{tour.guestSize}</td>
                  <td>${tour.totalAmount}</td>
                  <td>
                    {tour.bookingAt 
                      ? format(new Date(tour.bookingAt), 'MMM dd, yyyy, p') 
                       : 'N/A'
                      }
                  </td>
                </tr>
              ))}


              {userBooking.length == 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-3">No tours available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  
  </div>
)
}


  





// --- MAIN ---
const AdminDashboard = () => {

  const [activeTab, setActiveTab] = useState("tours");

  // ⭐ Initialize AOS here
  useEffect(() => {
    Aos.init({ duration: 900, once: true });
  }, []);

  return (
    <div className="d-flex" style={{ backgroundColor: "#f8f9fa" }}>
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-grow-1 p-4" style={{ height: "100vh", overflowY: "auto" }}>
        {activeTab === "tours" && <ManageTours />}
        {activeTab === "users" && <ManageUsers />}
      </div>
    </div>
  );
};

export default AdminDashboard;
