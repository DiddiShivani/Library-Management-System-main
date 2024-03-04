import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BookCard } from "./BookCard";
import { Link } from "react-router-dom";
import { store } from "../index";
import { Navigate } from "react-router-dom";
import NavbarHomepage from "./NavbarHomepage";
import Footer from "./Footer";
import { Container, Row, Col } from "react-bootstrap";


function SearchBooks() {
    const [registeredBooks, setAllbooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const {token} = useContext(store);
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
                    setData(res.data)
                    axios.get(`http://localhost:5000/bookmarkedBooks/${res.data._id}`)
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
                .catch(err => console.log(err));
        }

        axios.get('http://localhost:5000/registeredbooks')
            .then(response => {
                setAllbooks(response.data.books);
            })
            .catch(error => {
                console.error('Error fetching all books:', error);
            });

    }, [token]);


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredbooks = registeredBooks.filter(book =>
        book.title.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    const handleBorrowBook = async (event, isbn, id) => {
        try {
            event.preventDefault();
            const response = await axios.post('http://localhost:5000/borrow', { userID: data._id, isbn: isbn });
            alert(response.data.message);
            if(response.data.message === 'Book borrowed successfully'){
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
            if(response.data === 'Book Bookmarked success'){
                setBookmarkedbooks([...bookmarkedBooks, id])
            }
            else if(response.data === 'Book removed from bookmarks'){
                setBookmarkedbooks(prevArray => prevArray.filter((item, index) => item !== id))
            }
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
    };
    if (!token) {
        return <Navigate to='/signin' />
    }

    return (
        <div>
            {
                data &&
            <div>
            <NavbarHomepage email={data.email} rollNumber={data.rollNumber} id={data._id}/>
            <div>
                <center>
                    <input
                        type="input"
                        className="search-bar"
                        placeholder="Search books"
                        name="search"
                        value={searchQuery}
                        onChange={handleSearch}
                        style={{ marginBottom: '4%' }}
                    />
                </center>
                <Container fluid>
                    {filteredbooks.length > 0 ? (
                        <Row>
                            {filteredbooks.map((book, index) => (
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
                                        onBorrow={(event) => handleBorrowBook(event, book.isbn, book._id,book._id)}
                                        onBookMark={(event) => handleBookMarkedBook(event, book.isbn, book._id,book._id)}
                                        bookmark={bookmarkedBooks.includes(book._id)}
                                        borrowed={issuedBooks.includes(book._id)}
                                    />
                                </Link>
                                </Col>
                            ))}
                            </Row>
                    ) : (
                        <p>No books found.</p>
                    )}
                </Container>
            </div>
            <Footer/>
            </div>
            }
        </div>
    )
}

export default SearchBooks;