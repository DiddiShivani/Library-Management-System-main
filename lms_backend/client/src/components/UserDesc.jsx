import React, { useState, useEffect, useContext } from "react";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "./Footer";
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import axios from "axios";
import { store } from "../index"

function UserDesc() {
    const { adminToken } = useContext(store);
    const { UserRoll } = useParams();
    const [user, setUser] = useState(null);
    const [history, setHistory] = useState([]);
    const [notReturnedBooks, setNotReturnedBooks] = useState([]);
    const [totalFine, setTotalFine] = useState(0);
    const [issuedBooks, setIssuedBooks] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (adminToken) {
            axios.get(`http://localhost:5000/UserDesc/${UserRoll}`)
                .then(response => {
                    setUser(response.data);
                    axios.get(`http://localhost:5000/updateHistory1/${response.data._id}`)
                        .then(response => {
                            setHistory(response.data);
                        })
                        .catch(error => {
                            console.error('Error fetching history:', error);
                        });
                    axios.get(`http://localhost:5000/checkNotReturned/${response.data._id}`)
                        .then(response => {
                            setNotReturnedBooks(response.data.books);
                            setTotalFine(response.data.totalFine);
                            console.log(response.data.books)
                        })
                        .catch(error => {
                            console.error('Error fetching not returned books:', error);
                        });

                    axios.get(`http://localhost:5000/issuedBooks1/${response.data._id}`)
                        .then(response => {
                            setIssuedBooks(response.data);
                        })
                        .catch(error => {
                            console.error('Error fetching issued books:', error);
                        });
                })
                .catch(error => {
                    console.error('Error fetching book details:', error);
                });
        }
    }, [adminToken, UserRoll]);
    const handleDeleteUser = async () => {
        try {
            const removeUser = window.confirm(`Delete user: ${user.rollNumber}?`);
            if (removeUser) {
                const response = await axios.post(`http://localhost:5000/deleteUser/${user._id}`);
                alert(response.data);
                if (response.data === 'User deleted successfully') {
                    navigate('/UserSearch')
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
    if (!user) {
        return <div>Loading...</div>;
    }
    if (!adminToken) {
        return <Navigate to="/signin" />;
    }
    return (
        <div>
            <NavbarAdmin />
            <div className="container" style={{ backgroundColor: "white", borderRadius: "10px", marginTop: '120px' }}>
                <h2 className="text-center">{user.email.split('@')[0]} - {user.rollNumber}</h2>
                <div className="row">
                    <div className="col">
                        <table cellPadding={8}>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th> : </th>
                                    <td>{user.email.split('@')[0]}</td>
                                </tr>
                                <tr>
                                    <th>Roll Number</th>
                                    <th> : </th>
                                    <td>{user.rollNumber}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <th> : </th>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <th>Password</th>
                                    <th> : </th>
                                    <td>{user.password}</td>
                                </tr>
                                <tr>
                                    <th>Contact</th>
                                    <th> : </th>
                                    <td>{user.contact}</td>
                                </tr>
                                <tr>
                                    <th>Number of books issued</th>
                                    <th> : </th>
                                    <td>
                                        {issuedBooks.length > 0 ? (
                                            <ul>
                                                {issuedBooks.map((book, index) => (
                                                    <Link to={`/BookDesc/${book.isbn}`} >
                                                        <li key={index}>{book.title}</li>
                                                    </Link>
                                                ))}
                                            </ul>

                                        ) : (
                                            <span>None</span>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Books used so far</th>
                                    <th> : </th>
                                    <td>
                                        {history.length > 0 ? (
                                            <ul>
                                                {history.map((book, index) => (
                                                    <Link to={`/BookDesc/${book.isbn}`} >
                                                        <li key={index}>{book.title}</li>
                                                    </Link>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>None</span>
                                        )}

                                    </td>
                                </tr>
                                <tr>
                                    <th>Number of books not returned</th>
                                    <th> : </th>
                                    <td>
                                        {notReturnedBooks.length > 0 ? (
                                            <ul>
                                                {notReturnedBooks.map((book, index) => (
                                                    <Link to={`/BookDesc/${book.isbn}`} >
                                                        <li key={index}>{book.title}</li>
                                                    </Link>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>None</span>
                                        )}
                                    </td>
                                </tr>

                                <tr>
                                    <th>Fines</th>
                                    <th> : </th>
                                    <td>{totalFine}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className="text-center">
                                        <button type="submit" className="btn btn-danger" onClick={handleDeleteUser}>Remove User</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default UserDesc;