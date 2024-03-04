import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import BooksTakenCard from "./BooksTakenCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, Navigate } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "./Footer"; 
import { store } from "../index";

function BooksTakenSearch() {
    const { adminToken } = useContext(store);
    const [registeredBooks, setAllbooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [issuedBooksCount, setIssuedBooksCount] = useState({})
    const [pendingBooksCount, setPendingBooksCount] = useState({})

    useEffect(() => {
        if(adminToken){
            axios.get('http://localhost:5000/registeredbooks')
                .then(response => {
                    setAllbooks(response.data.books);
                })
                .catch(error => {
                    console.error('Error fetching all books:', error);
                });
            axios.get('http://localhost:5000/allbookstakencount')
                .then(response => {
                    setIssuedBooksCount(response.data.issued);
                    setPendingBooksCount(response.data.pending);
                })
                .catch(error => {
                    console.error('Error fetching count:', error);
                });
        }
    }, [adminToken]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredbooks = registeredBooks.filter(book =>
        book.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    if(!adminToken){
        return <Navigate to="/signin" />
    }

    return (
        <div>
            <NavbarAdmin />
            <div>
                <center>
                    <input
                        type="input"
                        className="search-bar"
                        placeholder="Search Books"
                        name="search"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </center>
                <Container className="search-box" style={{maxWidth: "96%"}}>
                    <Row className="UserCardm ml-3 mr-3">
                        <Col className="Usercard-col" xs>Title</Col>
                        <Col className="Usercard-col" xs>No.of Copies Issued</Col>
                        <Col className="Usercard-col" xs>No.of Copies Pending</Col>
                    </Row>
                    {filteredbooks.length > 0 ? (
                        <ul>
                            {filteredbooks
                                .filter(book => issuedBooksCount[book._id])
                                .map((book, index) => (
                                    <Link to={`/BookDesc/${book.isbn}`} style={{ textDecoration: 'None', color: 'Black' }}>
                                        <BooksTakenCard
                                            key={index}
                                            title={book.title}
                                            issued={issuedBooksCount[book._id]}
                                            pending={pendingBooksCount[book._id] ? pendingBooksCount[book._id] : 0}
                                        />
                                    </Link>
                                ))}
                        </ul>
                    ) : (
                        <p>No students found.</p>
                    )}
                </Container>
            </div>
            <Footer />
        </div>
    )
}

export default BooksTakenSearch;
