import React, { useState, useEffect, useContext } from "react";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "./Footer";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { store } from "../index";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const AdminDashboard = () => {
  const { adminToken } = useContext(store);
  const [stuCount, setStuCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [copiestakencount, setCopiesTakenCount] = useState(0);
  

  useEffect(() => {
    if (adminToken) {
      axios.get('http://localhost:5000/count')
        .then(response => {
          setStuCount(response.data.c);
        })
        .catch(error => {
          console.error('Could not get the student count:', error);
        });

      axios.get('http://localhost:5000/bookcount')
        .then(response => {
          setBookCount(response.data.bc);
        })
        .catch(error => {
          console.error('Could not get the book count:', error);
        });
      axios.get('http://localhost:5000/copiestakencount')
        .then(response => {
          setCopiesTakenCount(response.data.takenc);
        })
        .catch(error => {
          console.error('Couldnot get the copies count:', error);
        });
    }
  }, [adminToken]);

  if (!adminToken) {
    return <Navigate to="/signin" />;
  }

  return (
    <div>
      <NavbarAdmin />
      <div style={{ backgroundColor: "white", marginTop: '90px', width: '1400px', marginLeft: '65px', borderRadius: '8px' }}>
        <h1 style={{ marginLeft: '30px' }}>Student Details</h1>
        <div className="section">
          <Link to="/UserSearch" style={{ textDecoration: 'None', color: 'Black' }}>
            <div className="subsection1" style={{ background: "rgb(247, 247, 247)", width: '300px', cursor: 'pointer' }}>
              <img src={process.env.PUBLIC_URL + '/registered_stu.png'} alt="not found" height={100} />
              <p>&emsp;Number of Students registered&emsp;</p>
              <p>{stuCount}</p>
            </div>
          </Link>
          <Link to="/bookReturn" style={{ textDecoration: 'None', color: 'Black' }}>
            <div className="subsection1" style={{ background: "rgb(247, 247, 247)", width: '300px', cursor: 'pointer' }}>
              <img src={process.env.PUBLIC_URL + '/books_not_returned.png'} alt="not found" height={100} />
              <p>&emsp;Return Book &emsp;</p>
              <p></p>
            </div>
          </Link>
          <span>&emsp;</span>
          <br />
          <br />
        </div>
      </div>
      <div style={{ backgroundColor: "white", marginTop: '20px', width: '1400px', marginLeft: '65px', borderRadius: '8px' ,marginBottom:"30px"}}>
        <h1 style={{ marginLeft: '30px' }}>Book Details</h1>
        <div className="section">
          <Link to="/BookSearch" style={{ textDecoration: 'None', color: 'Black' }}>
            <div className="subsection1" style={{ background: "rgb(247, 247, 247)", width: '300px', cursor: 'pointer' }}>
              <img src={process.env.PUBLIC_URL + '/book1.png'} alt="not found" height={100} />
              <p>&emsp;No. of Books&emsp;</p>
              <p>{bookCount}</p>
            </div>
          </Link>
          <Link to="/Addbook" style={{ textDecoration: 'None', color: 'Black' }}>
            <div className="subsection1" style={{ background: "rgb(247, 247, 247)", width: '300px', cursor: 'pointer' }}>
              <img src={process.env.PUBLIC_URL + '/add_book.png'} alt="not found" height={100} />
              <p>&emsp;Add a book&emsp;</p>
              <AddCircleOutlineIcon fontSize="large" />
            </div>
          </Link>
          <Link to="/bookstakensearch" style={{ textDecoration: "none", color: "black" }}>
            <div className="subsection1" style={{ background: "rgb(247, 247, 247)", width: '300px', cursor: 'pointer' }}>
              <img src={process.env.PUBLIC_URL + '/books_issued.png'} alt="not found" height={100} />
              <p>&emsp;Books Taken&emsp;</p>
              <p>{copiestakencount}</p>
            </div>
          </Link>
          <span>&emsp;</span>
          <br />
          <br />
        </div>
      </div>
      <br />
      <br/>
      <Footer />
    </div>
  )
}

export default AdminDashboard;