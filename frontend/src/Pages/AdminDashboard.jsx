import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstances';
import "../styles/adminDash.css";

// ⭐ ADD THESE 2 LINES
import Aos from "aos";
import "aos/dist/aos.css";

// --- SIDEBAR ---
const AdminSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: '260px', minHeight: '100vh' }}
      data-aos="fade-right"
    >
      <h4 className="text-center fw-bold">Admin Panel</h4>
      <hr />

      {/* Tabs */}
      <button className={`nav-link text-white w-100 text-start mt-2 ${activeTab === 'tours' ? 'active bg-warning text-dark' : ''}`}
        onClick={() => setActiveTab('tours')}
        data-aos="fade-up"
      >
        <i className="bi bi-airplane me-2"></i> Manage Tours
      </button>

      <button className={`nav-link text-white w-100 text-start mt-2 ${activeTab === 'users' ? 'active bg-warning text-dark' : ''}`}
        onClick={() => setActiveTab('users')}
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <i className="bi bi-people me-2"></i> Users
      </button>

      <button className="nav-link text-white w-100 text-start mt-2" data-aos="fade-up" data-aos-delay="200">
        <i className="bi bi-gear me-2"></i> Settings
      </button>

      <hr />
      <button className="btn btn-danger w-100" data-aos="zoom-in">
        <i className="bi bi-box-arrow-right me-2"></i> Logout
      </button>
    </div>
  );
};

// --- TOURS MANAGEMENT ---
const ManageTours = () => {

  const [tours, setTours] = useState([]);
  const [newTour, setNewTour] = useState({
    title: "",
    city: "",
    price: "",
    photo: "",
    distance: "",
    desc: "",
  });

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
      await axiosInstance.delete(`/tours/${id}`);
      alert("Tour Deleted!");
      fetchTours();
    } catch {
      alert("Failed to delete tour");
    }
  };

  const handleCreate = async () => {
    try {
      await axiosInstance.post("/tours", newTour);
      alert("Tour Created Successfully");
      fetchTours();
    } catch {
      alert("Failed to create tour");
    }
  };

  return (
    <div className="container-fluid" data-aos="fade-up">
      <h2 className="mb-4">Manage Tours</h2>

      {/* Add Form */}
      <div className="card border-0 shadow-sm mb-4" data-aos="zoom-in">
        <div className="card-body">
          <h5>Add New Tour</h5>
          <div className="row g-3 mt-2">
            {Object.keys(newTour).map((field) => (
              <div className="col-md-4" key={field}>
                <input
                  type="text"
                  placeholder={field.toUpperCase()}
                  className="form-control"
                  value={newTour[field]}
                  onChange={(e) => setNewTour({ ...newTour, [field]: e.target.value })}
                />
              </div>
            ))}
          </div>

          <button className="btn btn-success mt-3" onClick={handleCreate} data-aos="zoom-in-up">
            <i className="bi bi-plus-circle me-2"></i>Create Tour
          </button>
        </div>
      </div>

      {/* Tours Table */}
      <div className="card border-0 shadow" data-aos="fade-up" data-aos-delay="200">
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
              {tours.map((tour, i) => (
                <tr key={tour._id} data-aos="fade-left" data-aos-delay={i * 50}>
                  <td className="fw-bold">{tour.title}</td>
                  <td>{tour.city}</td>
                  <td>${tour.price}</td>
                  <td>{tour.distance} km</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(tour._id)}
                      data-aos="zoom-out"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {tours.length === 0 && (
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
const ManageUsers = () => (
  <div className="container" data-aos="fade-up">
    <h2 className="mb-4">Users Management</h2>
    <p className="text-muted">Users listing & control coming soon...</p>
  </div>
);

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
