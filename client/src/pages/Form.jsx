import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Navbar from "../components/Nabvar";
import Footer from "../components/Footer";

export default function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: "",
    jobDescription: "",
    requiredQualification: "",
  });

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const jobTypes = [
    "Full-time (On-site)",
    "Part-time (On-site)",
    "Full-time (Remote)",
    "Part-time (Remote)",
  ];

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/jobs",
        formData
      );

      if (response.data.success) {
        showToast("Job created successfully!", "success");
        setFormData({
          jobTitle: "",
          companyName: "",
          location: "",
          salary: "",
          jobType: "",
          jobDescription: "",
          requiredQualification: "",
        });
        setTimeout(() => navigate("/"), 1000); // Redirect after toast
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) setErrors(data.errors || ["Invalid input"]);
        if (status === 409) setErrors([data.message]);
      } else {
        setErrors(["Something went wrong. Try again later."]);
      }
      showToast("Failed to create job.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="text-center mb-4">Create Job Posting</h2>

                {errors.length > 0 && (
                  <div className="alert alert-danger">
                    {errors.map((err, index) => (
                      <div key={index}>• {err}</div>
                    ))}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Job Title */}
                  <div className="mb-3">
                    <label className="form-label">Job Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="jobTitle"
                      placeholder="Enter job title"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Company Name */}
                  <div className="mb-3">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="companyName"
                      placeholder="Enter company name"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Location */}
                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      placeholder="Example: Bengaluru / Remote"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Salary */}
                  <div className="mb-3">
                    <label className="form-label">Salary (INR)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="salary"
                      placeholder="Enter salary"
                      value={formData.salary}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Job Type */}
                  <div className="mb-3">
                    <label className="form-label">Job Type</label>
                    <select
                      className="form-select"
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select job type</option>
                      {jobTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Job Description */}
                  <div className="mb-3">
                    <label className="form-label">Job Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="jobDescription"
                      placeholder="Write a short job description..."
                      value={formData.jobDescription}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  {/* Qualifications */}
                  <div className="mb-3">
                    <label className="form-label">
                      Required Qualifications
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="requiredQualification"
                      placeholder="Example: React, Node.js, SQL..."
                      value={formData.requiredQualification}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button
                    className="btn btn-primary w-100"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Job"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Toast Notification */}
      <div
        className={`toast position-fixed top-0 end-0 m-3 ${
          toast.show ? "show" : ""
        }`}
        style={{ zIndex: 1055 }}
      >
        <div
          className={`toast-header ${
            toast.type === "success" ? "bg-success" : "bg-danger"
          } text-white`}
        >
          <strong className="me-auto">Notification</strong>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => setToast({ show: false, message: "", type: "" })}
          ></button>
        </div>
        <div className="toast-body">{toast.message}</div>
      </div>
    </>
  );
}
