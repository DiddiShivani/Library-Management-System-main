import React, { useState, useEffect, useContext } from "react";
import Footer from "./Footer";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Link, useNavigate, Navigate } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import { store } from "../index"

function BookDesc() {
    const { BookISBN } = useParams();
    const { adminToken } = useContext(store)
    const [book, setBook] = useState(null);
    const [issuedRolls, setIssuedRolls] = useState([]);
    const [pendingRolls, setPendingRolls] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if(adminToken){
            axios.get(`http://localhost:5000/BookDesc/${BookISBN}`)
                .then(response => {
                    setBook(response.data);
                })
                .catch(error => {
                    console.error('Error fetching book details:', error);
                });
            axios.get(`http://localhost:5000/booktakenusers/${BookISBN}`)
                .then(response => {
                    setIssuedRolls(response.data.issued);
                    setPendingRolls(response.data.pending);
                })
                .catch(error => {
                    console.error('Error fetching count:', error);
                });
        }
    }, [adminToken, BookISBN]);

    const handleRemoveBook = async () => {
        try {
            const removeBook = window.confirm(`Remove Book: ${book.title}?`);
            if (removeBook) {
                const response = await axios.post(`http://localhost:5000/removeBook/${book._id}`);
                alert(response.data);
                if (response.data === 'Book deleted successfully') {
                    navigate('/bookSearch')
                }
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else if (error.request) {
                console.error('No response received from the server');
            }
            else {
                console.error('Error borrowing book:', error.message);
            }
        }
    };
    if (!book) {
        return <div>Loading...</div>;
    }
    if (!adminToken) {
        return <Navigate to="/signin" />;
      }
    return (
        <div>
            <NavbarAdmin />
            <div className="container" style={{ background: "white", borderRadius: '10px', width: '1400px', marginLeft: '65px', marginTop: '100px' }}>
                <span>&emsp;</span>
                <h2 className="text-center">{book.title}</h2>
                <div className="row">
                    <div className="col-md-4 text-center">
                        <img src={process.env.PUBLIC_URL + book.image.slice(11,)} alt="not found" height={200} />
                    </div>
                    <div className="col-md-1 d-flex align-items-center">
                        <div className="vertical-line"></div>
                    </div>
                    <div className="col-md-7">
                        <table cellPadding={8}>
                            <tbody>
                                <tr>
                                    <th>Title</th>
                                    <th>:</th>
                                    <td>{book.title}</td>
                                </tr>
                                <tr>
                                    <th>Author</th>
                                    <th>:</th>
                                    <td>{book.author}</td>
                                </tr>
                                <tr>
                                    <th>ISBN</th>
                                    <th>:</th>
                                    <td>{book.isbn}</td>
                                </tr>
                                <tr>
                                    <th>Genre</th>
                                    <th>:</th>
                                    <td>{book.genre}</td>
                                </tr>
                                <tr>
                                    <th>Published Year</th>
                                    <th>:</th>
                                    <td>{book.publishedDate.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <th>Rating</th>
                                    <th>:</th>
                                    <td>{book.rating}/5</td>
                                </tr>
                                <tr>
                                    <th>Availability</th>
                                    <th>:</th>
                                    <td>Available</td>
                                </tr>
                                <tr>
                                    <th>Total number of Copies</th>
                                    <th>:</th>
                                    <td>{book.quantity}</td>
                                </tr>
                                <tr>
                                    <th>Available Copies</th>
                                    <th>:</th>
                                    <td>{book.quantity - (issuedRolls.length || 0)}</td>
                                </tr>
                                <tr>
                                    <th>List of users using the book</th>
                                    <th>:</th>
                                    <td>
                                        {issuedRolls.length > 0 ? (
                                            <ul>
                                                {issuedRolls.map((roll, index) => (
                                                    <Link to={`/UserDesc/${roll}`}>
                                                        <li key={index}>{roll}</li>
                                                    </Link>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>None</span>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th>List of users not returned the book</th>
                                    <th>:</th>
                                    <td>
                                        {pendingRolls.length > 0 ? (
                                            <ul>
                                                {pendingRolls.map((roll, index) => (
                                                    <Link to={`/UserDesc/${roll}`}>
                                                        <li key={index}>{roll}</li>
                                                    </Link>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>None</span>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                <td><Link to={`/updatebook/${book._id}`} style={{ backgroundColor: 'blue', color: 'white', borderRadius: "15px", padding:"17px",textDecoration:"none"}}>Update Book</Link></td>
                                <td>&emsp;</td>
                                    <td><button type="submit" style={{ backgroundColor: 'red', color: 'white',borderRadius:"15px", padding:"14px" }} onClick={handleRemoveBook}>Remove Book</button></td>
                                </tr>
                                <tr>
                                    <td>&emsp;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <Footer />
        </div>
    );
}
export default BookDesc;