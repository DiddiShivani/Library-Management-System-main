import axios from "axios";
import React, { useState, useEffect,useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useNavigate,Navigate } from 'react-router-dom';
import NavbarAdmin from "./NavbarAdmin";
import Footer from "./Footer";
import {store} from "../index";

function AddBook() {
    const { adminToken } = useContext(store)
    const navigate = useNavigate();
    const [data, setData] = useState({
        title: '',
        author: '',
        isbn: '',
        genre: '',
        publishedDate: '',
        rating : '',
        image: '',
        quantity: '',
        status: ''
    })
    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value })
        console.log(data)
    }
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/addbook', data);
            alert(response.data);
            if (response.data === 'Book added') {
                navigate('/admin');
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else if (error.request) {
                console.error('No response received from the server');
            } else {
                console.error('Error during adding the book:', error.message);
            }
        }
    };
    if (!adminToken) {
        return <Navigate to='/signin' />;
    }
    return (
        <div>
        <NavbarAdmin />
        <div className="centered-container">
            <Container className="AddComp" style={{marginTop: "100px", marginBottom: "200px"}}>
                <h2 style={{textAlign:'center'}}>Add a book</h2>
                <Row>
                    <Col>
                        Book Title:<br />
                        <input type="input" className="add-inputs" onChange={changeHandler} name="title" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Author:<br />
                        <input type="input" className="add-inputs" onChange={changeHandler} name="author" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        ISBN:<br />
                        <input type="input" className="add-inputs" onChange={changeHandler} name="isbn" />
                    </Col>
                    <Col>
                        Genre:<br />
                        <input type="input" className="add-inputs" onChange={changeHandler} name="genre" />
                    </Col>
                    <Col>
                        Published date:<br />
                        <input type="date" className="add-inputs" onChange={changeHandler} name="publishedDate" style={{paddingLeft:'6px',paddingRight:'6px'}}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Rating:<br />
                        <input type="text" className="add-inputs" onChange={changeHandler} name="rating" />
                    </Col>
                    <Col>
                        Book Image:<br />
                        <input type="file" className="add-inputs" onChange={changeHandler} name="image" style={{ paddingTop: '4px' }} />
                    </Col>
                    <Col>
                        Quantity:<br />
                        <input type="input" className="add-inputs" onChange={changeHandler} name="quantity" />
                    </Col>
                </Row>
                <Row>
                    <Col sm="4">
                        Status:<br />
                        <input type="input" className="add-inputs" onChange={changeHandler} name="status" />
                    </Col>
                    <Col sm="8">
                        <br />
                        <Button onClick={submitHandler} class="justify-content-center" variant="success" type="submit" style={{ height: "40%", borderRadius: '10px', width:'100%' }}>
                            <strong>Add Record</strong>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
        <Footer/>
        </div>
    )
}
export default AddBook;