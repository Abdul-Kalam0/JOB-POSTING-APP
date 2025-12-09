import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import { useDelete } from "./hooks/useDelete";
import Navbar from "./components/Nabvar";
import Footer from "./components/Footer";

function App() {
  const { data, loading, error, fetchData } = useFetch(
    "https://job-posting-backend-001.vercel.app/api/jobs"
  );

  const { deleteData } = useDelete(); // Removed 'loading: deleting' since we're not using it globally anymore

  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [deletingJobId, setDeletingJobId] = useState(null); // New state to track which job is being deleted

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleDelete = async (jobId) => {
    setDeletingJobId(jobId); // Set the deleting job ID to show loading on the specific button
    try {
      await deleteData(jobId);
      fetchData(); // refresh job list after delete
      showToast("Job deleted successfully!", "success");
    } catch (err) {
      showToast("Failed to delete job.", "error");
    } finally {
      setDeletingJobId(null); // Reset to null after deletion (success or failure)
    }
  };

  // Filter jobs by title based on search term
  const filteredJobs =
    data?.data?.filter((job) =>
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-4">{error}</p>;

  return (
    <>
      <Navbar />
      <main className="container my-4" style={{ minHeight: "74vh" }}>
        <h1 className="mt-4 text-center">All Jobs</h1>

        {/* Search Bar */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search jobs by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="row">
            {filteredJobs.map((job) => (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={job._id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{job.jobTitle}</h5>
                    <p className="card-text">
                      <strong>Company:</strong> {job.companyName}
                    </p>
                    <p className="card-text">
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p className="card-text">
                      <strong>Type:</strong> {job.jobType}
                    </p>
                    <div className="mt-auto">
                      <Link
                        to={`/jobs/${job._id}`}
                        className="btn btn-primary me-2"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="btn btn-danger"
                        disabled={deletingJobId === job._id}
                      >
                        {deletingJobId === job._id ? "Deleting..." : "Delete"}{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-3">No jobs found</p>
        )}
      </main>
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

export default App;
