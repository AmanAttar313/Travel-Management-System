import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect } from 'react';
import { axiosInstance } from '../config/axiosInstances';
// import { use } from 'react';
import { useState } from 'react';
import { format } from 'date-fns';
// --- COMPONENT: Sidebar (The Side Panel) ---
const Sidebar = ({ activeTab, setActiveTab }) => {

  return (
    // Changed bg-dark to bg-light (or use bg-white for pure white)
    // Changed text-white to text-dark
    <div className="d-flex flex-column flex-shrink-0 p-3 text-dark bg-light" style={{ width: '260px', minHeight: '100vh' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <i className="bi bi-airplane-engines fs-4 me-2"></i>
        <span className="fs-4 fw-bold">TourWorld</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <button
            // Changed text-white to text-dark for inactive state
            // Active state remains yellow (bg-warning) with dark text
            className={`nav-link text-dark w-100 text-start ${activeTab === 'profile' ? 'active bg-warning text-dark' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="bi bi-person-circle me-2"></i> My Profile
          </button>
        </li>
        <li>
          <button
            // Changed text-white to text-dark for inactive state
            className={`nav-link text-dark w-100 text-start mt-2 ${activeTab === 'bookings' ? 'active bg-warning text-dark' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <i className="bi bi-ticket-perforated me-2"></i> My Bookings
          </button>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        {/* Changed text-white to text-dark */}
        <a href="#" className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="/profile.png" alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>User</strong>
        </a>
        {/* Removed dropdown-menu-dark so it defaults to light */}
        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser1">
          <li><a className="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
  );
};



// --- COMPONENT: Profile View ---
const ProfileView = () => {


    //fetch user

    const [user , setUser] = useState({})


    useEffect(()=>{
        async function fetchUserInfo(){
            try {
                
                const response = await axiosInstance.get("/users/profile");
                console.log("response : " , response.data)
                setUser(response.data?.user);
            } catch (error) {
                alert("feailed to fetched user !")
            }
        }
        fetchUserInfo();
    },[])




  return (
    <div className="container-fluid">
      <h2 className="mb-4">Profile Settings</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <form>
                <div className="row g-3">
                  <div className="col-12">
                     <label className="form-label">Username</label>
                     <input type="text" className="form-control"  value={user.username || ""} />
                  </div>
                  <div className="col-md-6">
                     <label className="form-label">Email</label>
                     <input type="email" className="form-control"  disabled value={user.email || ""}/>
                  </div>
                  <div className="col-md-6">
                     <label className="form-label">Phone</label>
                     <input type="text" className="form-control" defaultValue="+91 90000 00000" />
                  </div>
                  <div className="col-12">
                     <button type="button" className="btn btn-warning mt-3">Save Changes</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-center">
            <div className="card border-0 shadow-sm p-4">
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="img-fluid rounded-circle mb-3 mx-auto" style={{maxWidth: '120px'}} />
                <h5>{user.username || "user"}</h5>
                <p className="text-muted">Joined: Jan 2024</p>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: Bookings View ---
const BookingsView = () => {
  // Dummy Data
  // const bookings = [
  //   { id: 1, title: "Grand Switzerland Tour", date: "12 Dec 2024", status: "booked", price: "$999" },
  //   { id: 2, title: "Bali Weekend Gateway", date: "15 Jan 2025", status: "pending", price: "$450" },
  //   { id: 3, title: "Goa Beach Party", date: "10 Oct 2023", status: "cancelled", price: "$200" },
  // ];

  const [booking , setBooking] = useState([]);
   
  useEffect(()=>{
   async function fetchUserBooking(){
     const reponse = await axiosInstance.get("/booking/get")
     console.log("response of booking : " , reponse.data.data);
     setBooking(reponse.data?.data || []);
    }
    fetchUserBooking()
  },[])




  console.log("user booking : " , booking);





  return (
    <div className="container-fluid">
      <h2 className="mb-4">My Bookings</h2>
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="p-3">Tour Name</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

               {
                !booking ? <>
                     <tr>
                   <td>no booking</td>
                </tr>
                </>:<>

                 {booking && booking.map((booking) => (
                    <tr key={booking._id}>
                        <td className="p-3 fw-bold">{booking.tourName}</td>
                        {/* <td>{booking.bookingAt}</td> */}
                         <td>
                              {booking.bookingAt 
                                  ? format(new Date(booking.bookingAt), 'MMM dd, yyyy, p') 
                                  : 'N/A'
                              }
                          </td>
                        <td>${booking.totalAmount}</td>
                        <td>
                            {/* {booking.status === 'booked' && <span className="badge bg-success">Confirmed</span>} */}
                            {<span className="badge bg-success">Confirmed</span>}
                            {/* {booking.status === 'pending' && <span className="badge bg-warning text-dark">Pending</span>} */}
                            {/* {booking.status === 'cancelled' && <span className="badge bg-danger">Cancelled</span>} */}
                        </td>
                        <td>
                            <button className="btn btn-sm btn-outline-primary">View Details</button>
                        </td>
                    </tr>
                ))}

                </>
               }


              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN LAYOUT COMPONENT ---
const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    // 'd-flex' creates the side-by-side layout
    <div className="d-flex" style={{ backgroundColor: '#f8f9fa' }}>
      
      {/* 1. Left Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main Content Area */}
      <div className="flex-grow-1 p-4" style={{ height: '100vh', overflowY: 'auto' }}>
        
        {/* Toggle Button for Mobile (Optional visual cue) */}
        <nav className="navbar navbar-light bg-light mb-4 d-md-none rounded shadow-sm">
           <div className="container-fluid">
             <span className="navbar-brand mb-0 h1">Dashboard</span>
           </div>
        </nav>

        {/* Dynamic Content */}
        {activeTab === 'profile' && <ProfileView />}
        {activeTab === 'bookings' && <BookingsView />}
        
      </div>
    </div>
  );
};

export default UserDashboard;