import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Topsection(){
    return (
        <div className='topsection'>
        <br/>
            <img src={process.env.PUBLIC_URL + '/book.png'} alt="logo" height="100px"/>
            <h1>Library Management System</h1>
            <Link to={"/signin"}><Button>Search for Books </Button></Link>
        </div>
    )
}

export default Topsection;