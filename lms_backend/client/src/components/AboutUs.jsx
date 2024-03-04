import React, { useState,useContext, useEffect } from "react";
import Navbar from "./Navbar";
import NavbarHomepage from "./NavbarHomepage";
import Footer from "./Footer";
import { store } from "../index";
import axios from "axios";

function AboutUs() {
  const {token}=useContext(store);
  const [data, setData] = useState(null);
  useEffect(()=>{
    if (token) {
      axios.get('http://localhost:5000/myprofile', {
          headers: {
              'x-token': token
          }
      })
      .then(res=>setData(res.data))
      .catch(err =>console.log(err))
    }
  },[token]);
  return (
    <div>
    {token && data ? <NavbarHomepage email={data.email} /> : <Navbar />}
      <div className="container bg-white p-3 rounded" style={{marginTop:"100px",marginBottom:"100px"}}>
        <div className="ml-3 mr-3">
          <center>
            <h1>About Us</h1>
            <h2>Welcome to the Chaitanya Bharathi Institute of Technology Library Management System!</h2>
          </center>
          <h3>Our Mission and Vision</h3>
          <p>
            At CBIT, we are dedicated to providing a cutting-edge library management system that empowers our students, faculty, and staff. Our mission is to streamline library operations, enhance accessibility to resources, and foster a culture of continuous learning. We envision a dynamic and user-centric library experience that supports academic excellence.
          </p>
          
          <hr className="w-75 mx-auto" />
          <h3>History and Development:</h3>
          <p>
            Established in 1990, the CBIT Library Management System has evolved to meet the changing needs of our academic community. Over the years, we have implemented various upgrades and improvements to ensure the system remains at the forefront of technology.
          </p>
          <hr className="w-75 mx-auto" />
          <h3>Key Features:</h3>
          <p>Our library management system boasts a range of features, including:</p>
          <ul>
            <li>Intuitive cataloging and classification.</li>
            <li>Efficient circulation management.</li>
            <li>Access to a vast array of online resources.</li>
            <li>Personalized user accounts for tracking borrowing history and preferences.</li>
            <li>Robust reporting tools for data analysis.</li>
          </ul>
          <hr className="w-75 mx-auto" />
          <h3>Technology Stack</h3>
          <p>
            The CBIT Library Management System is built on a robust technology stack, utilizing the latest programming languages and modern databases and other cutting-edge technologies to ensure a seamless and secure user experience.
          </p>
          <hr className="w-75 mx-auto" />
          <h3>Future plans:</h3>
          <p>
            Exciting developments are on the horizon! We are committed to continuously improving our library management system. Stay tuned for upcoming enhancements, expansions, and new features designed to elevate your library experience.
          </p>
          <hr className="w-75 mx-auto" />
          <h1 className="text-center">Happy Learning !!!</h1>
          <br />
          <br />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;