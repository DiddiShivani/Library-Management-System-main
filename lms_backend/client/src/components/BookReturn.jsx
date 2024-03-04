import React, { useState, useContext } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { store } from "../index";
import { Navigate } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "./Footer";

function BookReturn() {
    const { adminToken } = useContext(store);
    const [data, setData] = useState({
        rollNumber: '',
        ISBN: ''
    })

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value })

    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/bookreturn', data);
            alert(response.data);
            if (response.data === 'Updated successfully')
                setData({ ...data, ISBN: '' })
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else if (error.request) {
                console.error('No response received from the server');
            } else {
                console.error('Error during updation:', error.message);
            }
        }
    };
    if (!adminToken) {
        return <Navigate to="/signin" />;
      }
    return (
        <div>
            <NavbarAdmin />
            <Container>
                <center>
                    <div class="sign-comp" >
                        <h1>Book Return</h1>
                        <form>

                            <table cellspacing="10" style={{ fontSize: "20px", fontWeight: "bold", marginTop: "5%" }}>
                                <tr>
                                    <td>Enter Roll Number</td>
                                </tr>
                                <tr>
                                    <td><input class="input-box" type="input" onChange={changeHandler} id="rollNumber" name="rollNumber" /></td>
                                </tr>
                                <br />
                                <tr>
                                    <td>Enter Book ISBN Value</td>
                                </tr>
                                <tr>
                                    <td><input class="input-box" type="input" onChange={changeHandler} id="ISBN" name="ISBN" /></td>
                                </tr>
                                <br />
                                <tr>
                                    <td><button class="login-button justify-content-center" style={{width:"400px"}} type="submit" onClick={submitHandler}>Update</button></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                </center>
            </Container>
            <Footer />
        </div>
    );
}
export default BookReturn;