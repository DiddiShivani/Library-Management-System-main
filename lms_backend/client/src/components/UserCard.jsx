import React from "react";
import { Row, Col } from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';


function UserCard(props){
    
    return (
        <Row className="UserCard mb-3 mr-3">
            <Col xs>{props.roll}</Col>
            <Col xs>{props.email}</Col>
            <Col xs>{props.issued}</Col>
            <Col xs style={{ color: parseInt(props.pending) > 0 ? 'red' : 'black' }}>{props.pending}</Col>
            <Col xs={1}><DeleteIcon className="user-delete" onClick={props.onDelete}/></Col>
        </Row>
    );
}

export default UserCard;