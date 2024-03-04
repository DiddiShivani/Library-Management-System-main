import React, { useState,useContext, useEffect } from "react";
import Navbar from "./Navbar";
import NavbarHomepage from "./NavbarHomepage";
import Footer from "./Footer";
import { store } from "../index";
import axios from "axios";

function ContactUs() {
    const { token }=useContext(store);
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
            <div className="container" style={{marginTop: "100px", marginBottom: "100px"}}>
                <div className="bg-white p-3 rounded">
                <center>
                    <h2>Contact Us</h2>
                    <h3>Cbit Library Management System</h3>
                </center>
                    <hr className="w-75 mx-auto" />
                    <h4>Contact Information:</h4>
                    <ul>
                        <li>Mobile: 084669 97215</li>
                        <li>Email: cbitlic@gmail.com / librarian@cbit.ac.in</li>
                        <li>Address: Gandipet, Hyderabad - 500 075. Telangana, India</li>
                    </ul>
                    <h4 style={{color:"red"}}>Important Contacts:</h4>
                    <h4>Administrative information:</h4>
                    <ul>
                        <li>AEC incharge: 084669 97216</li>
                    </ul>
                    <h4>Fee Payment detail:</h4>
                    <ul>
                        <li>Admin.Office: 084669 97217</li>
                    </ul>
                    <hr className="w-75 mx-auto" />
                    <div>
                        <h4>Feedback Form</h4>
                        <form>
                            <label htmlFor="name">Your Name:</label>
                            <input type="text" className="form-control" id="name" name="name" required />
                            
                            <label htmlFor="email">Your Email:</label>
                            <input type="email" className="form-control" id="email" name="email" required />

                            <label htmlFor="message">Your Message:</label>
                            <textarea className="form-control" id="message" name="message" rows="4" required></textarea>
                            <br />
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>
                    
                </div>
            </div>
            <br/>
            <br/>
            <Footer />
        </div>
    )
}

export default ContactUs;