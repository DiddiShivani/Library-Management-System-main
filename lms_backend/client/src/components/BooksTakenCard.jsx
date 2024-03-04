import React from "react";
import { Row, Col } from "react-bootstrap";


function BooksTakenCard(props){
    return (
        <Row className="UserCard mb-3 mr-3">
            <Col className="Usercard-col" xs>{props.title}</Col>
            <Col className="Usercard-col" xs>{props.issued}</Col>
            <Col className="Usercard-col" xs style={{ color: parseInt(props.pending) > 0 ? 'red' : 'black' }}>{props.pending}</Col>
        </Row>
    );
}

export default BooksTakenCard;