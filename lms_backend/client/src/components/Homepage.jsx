import React, { useState, useContext, useEffect } from "react";
import NavbarHomepage from "./NavbarHomepage";
import Footer from "./Footer";
import Slideshow from "./Slideshow";
import Bottomsection from "./Bottomsection";
import { Link } from "react-router-dom";
import { store } from "../index";
import { Navigate } from 'react-router-dom';
import axios from "axios";

const Homepage = () => {
    const { token } = useContext(store);
    const [data, setData] = useState(null);
    const [bookIssuedCount, setbookIssuedCount] = useState(0);
    const [bookMarkCount, setbookMarkCount] = useState(0);
    const [historyCount, setHistoryCount] = useState(0);
    const [notReturnedBooks, setNotReturnedBooks] = useState([]);
    const [notReturnedCount, setNotReturnedCount] = useState(0);

    useEffect(() => {
        if(token){
            axios.get('http://localhost:5000/myprofile', {
                headers: {
                    'x-token': token
                }
            })
                .then(res => {
                    setData(res.data)
                    axios.get(`http://localhost:5000/bookissuedcount/${res.data._id}`)
                        .then(response => {
                            setbookIssuedCount(response.data.bic);
                        })
                        .catch(error => {
                            console.error('Could not get the book issued count:', error);
                        });
                    axios.get(`http://localhost:5000/bookmarkcount/${res.data._id}`)
                        .then(response => {
                            setbookMarkCount(response.data.bmc);
                        })
                        .catch(error => {
                            console.error('Could not get the book marked count:', error);
                        });
                    axios.get(`http://localhost:5000/historycount/${res.data._id}`)
                        .then(response => {
                            setHistoryCount(response.data.h);
                        })
                        .catch(error => {
                            console.error('Could not get the books used so far count:', error);
                        });
                    axios.get(`http://localhost:5000/checkNotReturned/${res.data._id}`)
                        .then(response => {
                            // console.log("This is response.data", response.data)
                            setNotReturnedBooks(response.data);
                        })
                        .catch(error => {
                            console.error('Error fetching not returned books:', error);
                        });
                    axios.get(`http://localhost:5000/notreturnedcount/${res.data._id}`)
                        .then(response => {
                            setNotReturnedCount(response.data.nrb);
                        })
                        .catch(error => {
                            console.error('Could not get the books used so far count:', error);
                        });
                })
                .catch(err => console.log(err));
            }

    }, [token]);
    if (!token) {
        return <Navigate to="/signin" />;
    }
    return (
        <div>
            {
                data &&
                <div>
                    <NavbarHomepage email={data.email} rollNumber={data.rollNumber} id={data._id} />
                    <Slideshow />
                    <div style={{ backgroundColor: 'white', width: '1400px', marginLeft: '50px', borderRadius: '20px', marginTop: "30px" }}>
                        <center>
                            <h1 style={{ color: "black", fontSize: "30px" }}>
                                My dashboard
                            </h1>
                        </center>
                        <div className="section">
                            <Link to="/Issuedbooks" style={{ textDecoration: 'None', color: 'Black' }}>
                                <div className="subsection1" style={{ background: "rgb(247, 247, 247)" }}>
                                    <img src={process.env.PUBLIC_URL + '/books_issued.png'} alt="not found" height={100} />
                                    <p>&emsp;Books Issued&emsp;</p>
                                    <p>{bookIssuedCount}</p>
                                </div>
                            </Link>
                            <Link to="/notreturn" style={{ textDecoration: 'None', color: 'Black' }}>
                                <div className="subsection1" style={{ background: "rgb(247, 247, 247)" }}>
                                    <img src={process.env.PUBLIC_URL + '/books_not_returned.png'} alt="not found" height={100} />
                                    <p>Books not Returned</p>
                                    <p>{notReturnedCount}</p>
                                </div>
                            </Link>
                            <Link to="/bookmarkedbooks" style={{ textDecoration: 'None', color: 'Black' }}>
                                <div className="subsection1" style={{ background: "rgb(247, 247, 247)" }}>
                                    <img src={process.env.PUBLIC_URL + '/bookmarked_books.png'} alt="not found" height={100} />
                                    <p>Bookmarked Books</p>
                                    <p>{bookMarkCount}</p>
                                </div>
                            </Link>
                            <Link to="/history" style={{ textDecoration: 'None', color: 'Black' }}>
                                <div className="subsection1" style={{ background: "rgb(247, 247, 247)" }}>
                                    <img src={process.env.PUBLIC_URL + '/reader.png'} alt="not found" height={100} />
                                    <p>Books used so far</p>
                                    <p>{historyCount}</p>
                                </div>
                            </Link>
                        </div>
                        {/* <h1 style={{ color: 'white' }}>Hello</h1> */}
                    </div>

                   
                    <br />
                    <Bottomsection />
                    <Footer />
                </div>
            }
        </div>
    )
}

export default Homepage