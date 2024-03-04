import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteIcon from "@mui/icons-material/Delete";
import Button from 'react-bootstrap/Button';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function BookCard(props){
    return (
        <Container className="card">
            <Row className="mb-4">
                <Col></Col>
                <Col><img src={process.env.PUBLIC_URL + props.image.slice(11)} alt="Book Cover" className="book-img"/></Col>
                <Col/>
            </Row>
            <Row className="mb-3">
                <Col style={{height:'40px'}}>{props.title}</Col>
            </Row>
            <Row className="mb-2">
                <Col>Author: {props.author}</Col>
            </Row>
            <Row className="mb-1">
                <Col xs={9}>Rating: {props.rating}/5<br/>Available copies: ?</Col>
                <Col className="bookmark" onClick={props.onBookMark}>
                {props.bookmark ? (<BookmarkIcon fontSize="large" />) : (<BookmarkBorderIcon fontSize="large" />)}
                </Col>
            </Row>
            <Row className="mb-1">
                <Col> <center>
                {props.borrowed ? (<Col className="mt-3" style={{"color":"red"}}>Book already issued</Col>) :
                    (<Button onClick={props.onBorrow} class="justify-content-center" className="hover" variant="success" type="submit" style={{borderRadius: '10px' }}>
                            <strong>Borrow Book</strong>
                        </Button>)}
                </center>
                </Col>
                {/* <Col style={{"color":"red"}}>Book already issued</Col> */}
            </Row>
        </Container>
    );
}

function BookCard1(props){
    return (
        <Row className="UserCard mb-3 mr-3">
            <Col xs>{props.title}</Col>
            <Col xs>{props.author}</Col>
            <Col xs>{props.rating}/5</Col>
            <Col xs>{props.quantity}</Col>
            <Col xs={1}><DeleteIcon className="user-delete" onClick={props.onRemove}/></Col>
        </Row>
    );
}


export {BookCard, BookCard1};