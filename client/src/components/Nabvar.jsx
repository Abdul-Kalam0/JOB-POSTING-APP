import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#2f6cff", padding: "12px 30px" }}
    >
      <div className="container-fluid">
        {/* Brand */}
        <Link
          to="/"
          className="navbar-brand"
          style={{ color: "white", fontWeight: "600", fontSize: "20px" }}
        >
          Intern House
        </Link>

        {/* Hamburger Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto">
            <Link
              to="/"
              className="nav-link"
              style={{ color: "white", opacity: 0.9 }}
            >
              Job Postings
            </Link>
            <Link
              to="/post-job"
              className="nav-link"
              style={{ color: "white", opacity: 0.9 }}
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
