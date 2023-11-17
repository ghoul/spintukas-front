import React from "react";
import "./font.css";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#181A1F', color: 'white', padding: '20px 0' }}>
      <div className="container">
        <div className="row">
        
          <div className="col-md-12">
            <p className="text-center antiqua">&copy; {new Date().getFullYear()} UAB „Spintukas“</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
