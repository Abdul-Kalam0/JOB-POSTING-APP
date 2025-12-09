import { useParams, Link } from "react-router";
import { useFetch } from "../hooks/useFetch";
import Navbar from "../components/Nabvar";
import Footer from "../components/Footer";

export const JobDetails = () => {
  const { jId } = useParams();
  const { data, loading, error } = useFetch(
    `http://localhost:3000/api/job/${jId}`
  );

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-4">{error}</p>;

  return (
    <>
      <Navbar />
      <main className="container my-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="card shadow">
              <div className="card-body">
                <h1 className="mb-4">{data?.data?.jobTitle}</h1>
                <p>
                  <strong>Company Name:</strong> {data?.data?.companyName}
                </p>
                <p>
                  <strong>Location:</strong> {data?.data?.location}
                </p>
                <p>
                  <strong>Salary:</strong> {data?.data?.salary}
                </p>
                <p>
                  <strong>Job Type:</strong> {data?.data?.jobType}
                </p>
                <p>
                  <strong>Description:</strong> {data?.data?.jobDescription}
                </p>
                <p>
                  <strong>Qualification:</strong>{" "}
                  {data?.data?.requiredQualification}
                </p>
                <Link to="/" className="btn btn-secondary mt-3">
                  Back to Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
