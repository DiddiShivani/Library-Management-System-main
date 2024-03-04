import React, { useState, useContext, useEffect } from "react";
import { store } from "../index";
import axios from "axios";
import { BookCard } from "./BookCard";
import { Container, Row, Col } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import NavbarHomepage from "./NavbarHomepage";
import Footer from "./Footer";

function BookMarkedbooks() {
    const { token } = useContext(store);
    const [data, setData] = useState(null);
    const [bookmarkedBooks, setBookmarkedbooks] = useState([]);
    const [issuedBooks, setIssuedBooks] = useState([]);
    useEffect(() => {
        if (token) {
            axios.get('http://localhost:5000/myprofile', {
                headers: {
                    'x-token': token
                }
            })
                .then(res => {
                    setData(res.data);
                    axios.get(`http://localhost:5000/bookmarkedBooks1/${res.data._id}`)
                        .then(response => {
                            setBookmarkedbooks(response.data);
                        })
                        .catch(error => {
                            console.error('Error fetching bookmarked books:', error);
                        });
                    axios.get(`http://localhost:5000/issuedBooks/${res.data._id}`)
                        .then(response => {
                            setIssuedBooks(response.data);
                        })
                        .catch(error => {
                            console.error('Error fetching bookmarked books:', error);
                        });
                })
                .catch(err => { console.log(err); });
        }
    }, [token]);

    const handleBorrowBook = async (event, isbn, id) => {
        try {
            event.preventDefault();
            const response = await axios.post('http://localhost:5000/borrow', { userID: data._id, isbn: isbn });
            alert(response.data.message);
            if (response.data.message === 'Book borrowed successfully') {
                setIssuedBooks([...issuedBooks, id])
                await axios.post('http://localhost:5000/updateHistory', { userID: data._id, bookID: id });
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

    const handleBookMarkedBook = async (event, isbn, id) => {
        try {
            event.preventDefault();
            const response = await axios.post(`http://localhost:5000/bookmark`, { userID: data._id, isbn: isbn });
            alert(response.data);
            window.location.reload();
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else if (error.request) {
                console.error('No response received from the server');
            }
            else {
                console.error('Error bookmarking a book:', error.message);
            }
        }
    }
    if (!token) {
        return <Navigate to="/signin" />;
    }
    return (
        <div>
            {
                data && 
                <div>
                <NavbarHomepage email={data.email} rollNumber={data.rollNumber} id={data._id} />
            <div style={{ width: "100%", marginLeft: "auto", marginRight: "auto", marginTop: "90px" }}>
                <div style={{ backgroundColor: "white", color: "black", borderRadius: "7px", display: "flex", flexWrap: "wrap", marginTop: "6%", marginBottom: "10px" }}>
                    <img src={process.env.PUBLIC_URL + '/bookmarked_books.png'} alt="not found" height={50} style={{ marginLeft: "10px" }} />
                    <h1>Bookmarked Books</h1>
                </div>
                <Container fluid>
                    {bookmarkedBooks.length > 0 ? (
                        <Row>
                            {bookmarkedBooks.map((book, index) => (
                                <Col md={3} key={index}>
                                <Link to={`/BookDescforUser/${book.isbn}`} style={{ textDecoration: 'None', color: 'Black' }}>
                                    <BookCard
                                        key={index}
                                        title={book.title}
                                        author={book.author}
                                        rating={book.rating}
                                        quantity={book.quantity}
                                        image={book.image}
                                        isbn={book.isbn}
                                        onBorrow={(event) => handleBorrowBook(event, book.isbn, book._id)}
                                        onBookMark={(event) => handleBookMarkedBook(event, book.isbn, book._id)}
                                        bookmark={true}
                                        borrowed={issuedBooks.includes(book._id)}
                                    />
                                </Link>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <center><h1 style={{color:"red"}}>Oops No books found !!!</h1></center>
                    )}
                </Container>
            </div>
            <Footer />
        </div>
            }
        </div>
    );
}
export default BookMarkedbooks;