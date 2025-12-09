// components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} Intern House. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
