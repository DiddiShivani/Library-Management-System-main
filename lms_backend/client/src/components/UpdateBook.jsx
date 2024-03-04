import React, { useContext, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "./Footer";
import { useParams} from 'react-router-dom';
import { store } from "../index";
import { Navigate } from "react-router-dom";

function UpdateBook() {
    const { adminToken } = useContext(store)
    const { id } = useParams();
    const [data, setData] = useState({
        quantity: ''
    });

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/updatebook/${id}`, data);
            alert(response.data);
            if (response.data === 'Updated successfully') {
                setData({ ...data, quantity: '' });
            }
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
    if(!adminToken){
        return <Navigate to="/signin" />
    }
    return (
        <div>
            <NavbarAdmin />
            <Container>
                <center>
                    <div className="sign-comp" style={{ marginTop: "7%" }} >
                        <h1>Update Book Quantity</h1>
                        <form>
                            <table cellPadding="10" style={{ fontSize: "20px", fontWeight: "bold", marginTop: "5%" }}>
                                <tbody>
                                    <tr>
                                        <td>Enter Book quantity</td>
                                    </tr>
                                    <tr>
                                        <td><input className="input-box" type="input" onChange={changeHandler} id="quantity" name="quantity" value={data.quantity} /></td>
                                    </tr>
                                    <br />
                                    <tr>
                                        <td><button className="login-button" type="submit" onClick={submitHandler} style={{ textAlign: "center" }}>Update</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </center>
            </Container>
            <Footer />
        </div>
    );
}

export default UpdateBook;