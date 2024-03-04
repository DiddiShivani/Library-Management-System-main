import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, Navigate } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "./Footer";
import { store } from "../index"
import DeleteIcon from '@mui/icons-material/Delete';
function UserSearch() {
    const { adminToken } = useContext(store)
    const [registeredStu, setAllStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [issuedCount, setIssuedCount] = useState({})
    const [pendingCount, setPendingCount] = useState({})

    useEffect(() => {
        if (adminToken) {
            axios.get('http://localhost:5000/registeredStudents')
                .then(response => {
                    setAllStudents(response.data.students);
                })
                .catch(error => {
                    console.error('Error fetching all students:', error);
                });
            axios.get('http://localhost:5000/allusersbookissuedpendingcount')
                .then(response => {
                    setIssuedCount(response.data.issuedc);
                    setPendingCount(response.data.pendingc);
                })
                .catch(error => {
                    console.error('Error fetching count:', error);
                });
        }
    }, [adminToken]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredStudents = registeredStu.filter(student =>
        String(student.rollNumber).startsWith(searchQuery)
    );

    const handleDeleteUser = async (event, userID, userRoll) => {
        try {
            event.preventDefault();
            const removeUser = window.confirm(`Delete user: ${userRoll}?`);
            if (removeUser) {
                const response = await axios.post(`http://localhost:5000/deleteUser/${userID}`);
                alert(response.data);
                if (response.data === 'User deleted successfully') {
                    setAllStudents(prevArray => prevArray.filter((stu, index) => stu.rollNumber !== userRoll))
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
    return (
        <div>
            <NavbarAdmin />
            <div>
                <center>
                    <input
                        type="input"
                        className="search-bar"
                        placeholder="Search Students"
                        name="search"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </center>
                <Container className="search-box" style={{maxWidth: "96%"}}>
                    <Row className="UserCardm ml-3 mr-3">
                        <Col xs>Roll Number</Col>
                        <Col xs>Email</Col>
                        <Col xs>Books Issued</Col>
                        <Col xs>Books Pending</Col>
                        <Col xs={1}><DeleteIcon/></Col>
                    </Row>
                    {filteredStudents.length > 0 ? (
                        <ul>
                            {filteredStudents.map((student, index) => (
                                <Link to={`/UserDesc/${student.rollNumber}`} style={{ textDecoration: 'None', color: 'Black' }}>
                                    <UserCard
                                        key={index}
                                        roll={student.rollNumber}
                                        email={student.email}
                                        issued={issuedCount[student._id] || 0}
                                        pending={pendingCount[student._id] || 0}
                                        onDelete={(event) => handleDeleteUser(event, student._id, student.rollNumber)}
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

export default UserSearch;
