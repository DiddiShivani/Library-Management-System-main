import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {BookCard1} from "./BookCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, Navigate } from "react-router-dom";
import { store } from "../index";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "./Footer";
import DeleteIcon from "@mui/icons-material/Delete";

function BookSearch(){
    const { adminToken } = useContext(store)
    const [registeredBooks, setAllbooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if(adminToken){
            axios.get('http://localhost:5000/registeredbooks')
                .then(response => {
                    setAllbooks(response.data.books);
                })
                .catch(error => {
                    console.error('Error fetching all books:', error);
                });
            }
    }, [adminToken]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredbooks = registeredBooks.filter(book =>
        book.title.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    const handleRemoveBook = async (event, bookID, booktitle) => {
        try {
            event.preventDefault();
            const removeBook = window.confirm(`Remove Book: ${booktitle}?`);
            if(removeBook){
                const response = await axios.post(`http://localhost:5000/removeBook/${bookID}`);
                alert(response.data);
                if (response.data === 'Book deleted successfully') {
                    setAllbooks(prevArray => prevArray.filter((book, index) => book._id !== bookID))
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
    if (!adminToken) {
        return <Navigate to="/signin" />;
    }

    return(
        <div>
            <NavbarAdmin />
            <div>
                <center>
                    <input
                        type="input"
                        className="search-bar"
                        placeholder="Search books"
                        name="search"
                        value={searchQuery}
                        onChange={handleSearch}
                    /> 
                </center>
                <Container className="search-box" style={{maxWidth: "96%"}}>
                    <Row className="UserCardm ml-3 mr-3">
                        <Col xs>Title</Col>
                        <Col xs>Author</Col>
                        <Col xs>Rating</Col>
                        <Col xs>Quantity</Col>
                        <Col xs={1}><DeleteIcon/></Col>
                    </Row>
                    {filteredbooks.length > 0 ? (
                        <ul>
                            {filteredbooks.map((book,index) => (
                                <Link to= {`/BookDesc/${book.isbn}`} style={{ textDecoration: 'None', color: 'Black' }}>
                                    <BookCard1
                                        key={index}
                                        title={book.title}
                                        author={book.author}
                                        rating={book.rating} 
                                        quantity={book.quantity}
                                        image={book.image}
                                        onRemove={(event) => handleRemoveBook(event, book._id, book.title)}
                                    />
                                </Link>
                            ))}
                        </ul>
                    ) : (
                        <p>No books found.</p>
                    )}
                </Container>
            </div>
            <Footer />
        </div>
    )
}

export default BookSearch;