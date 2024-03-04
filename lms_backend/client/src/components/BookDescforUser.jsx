import React, { useState, useEffect, useContext } from "react";
import NavbarHomepage from "./NavbarHomepage";
import Footer from "./Footer";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { store } from "..";
import { Container, Row, Col } from 'react-bootstrap';
import { Navigate } from "react-router-dom";

function BookDescforUser() {
    const { BookISBN } = useParams();
    const [book, setBook] = useState(null);
    const [data, setData] = useState(null);
    const [issuedRolls, setIssuedRolls] = useState([]);
    const { token } = useContext(store);

    useEffect(() => {
        if (token) {

            axios.get('http://localhost:5000/myprofile', {
                headers: {
                    'x-token': token
                }
            })
                .then(res => {
                    setData(res.data)
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
                            console.log(response.data)
                        })
                        .catch(error => {
                            console.error('Error fetching count:', error);
                        });
                })
                .catch(err => console.log(err));
        }
    }, [token, BookISBN]);
    if (!token) {
        return <Navigate to='/signin' />
    }
    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NavbarHomepage email={data.email} />
            <Container className=" bg-white p-4 rounded" style={{ marginTop: "150px" }}>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h2 className="text-center">{book.title}</h2>
                        <br />
                        <Row>
                            <Col md={4} className="text-center">
                                <img src={process.env.PUBLIC_URL + book.image.slice(11)} alt="not found" height={300} className="rounded" />
                            </Col>
                            <Col md={7} className="p-4">
                                <table cellPadding={5}>
                                    <tbody>
                                        <tr>
                                            <th>Title </th>
                                            <td> : </td>
                                            <td>{book.title}</td>
                                        </tr>
                                        <tr>
                                            <th>Author </th>
                                            <td> : </td>
                                            <td>{book.author}</td>
                                        </tr>
                                        <tr>
                                            <th>ISBN </th>
                                            <td> : </td>
                                            <td>{book.isbn}</td>
                                        </tr>
                                        <tr>
                                            <th>Genre </th>
                                            <td> : </td>
                                            <td>{book.genre}</td>
                                        </tr>
                                        <tr>
                                            <th>Published Year </th>
                                            <td> : </td>
                                            <td>{book.publishedDate.slice(0, 10)}</td>
                                        </tr>
                                        <tr>
                                            <th>Rating </th>
                                            <td> : </td>
                                            <td>{book.rating}/5</td>
                                        </tr>
                                        <tr>
                                            <th>Available Copies </th>
                                            <td> : </td>
                                            <td>{book.quantity  - (issuedRolls.length || 0)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default BookDescforUser;