import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Navigate } from 'react-router-dom';
import { store } from "../index";
import { useNavigate } from "react-router-dom";
import NavbarHomepage from "./NavbarHomepage";
import Footer from "./Footer";


function EditProfile() {
    const navigate = useNavigate();
    const { token } = useContext(store);
    const [data, setData] = useState({
        rollNumber: '',
        email: '',
        password: '',
        contact: ''
    })
    useEffect(() => {
        if (token) {
            axios.get('http://localhost:5000/myprofile', {
                headers: {
                    'x-token': token
                }
            })
                .then(res => setData({ ...data, rollNumber: res.data.rollNumber, email: res.data.email }))
                .catch(err => console.log(err));
        }
    }, [token, data]);

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/editProfile', data);
            alert(response.data);
            if (response.data === 'Contact Changed Successfully') {
                navigate('/signin');
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else if (error.request) {
                console.error('No response received from the server');
            } else {
                console.error('Error during registration:', error.message);
            }
        }
    };

    if (!token) {
        return <Navigate to="/signin" />;
    }
    return (
        <div>
            {
                data &&
                <div>
                    <NavbarHomepage email={data.email} rollNumber={data.rollNumber} id={data._id} />
                    <Container>
                        <center>
                            <div class="sign-comp">
                                <h1>Change Contact</h1>
                                <form>

                                    <table cellSpacing="5" style={{ fontSize: "20px", fontWeight: "bold", marginTop: "10%" }}>
                                        <tr>
                                            <td>Enter new phone number</td>
                                        </tr>
                                        <tr>
                                            <td><input className="input-box" type="input" onChange={changeHandler} id="contact" name="contact" /></td>
                                        </tr>
                                        <br/>
                                        <tr>
                                            <td>Enter your password</td>
                                        </tr>
                                        <tr>
                                            <td><input className="input-box" type="password" onChange={changeHandler} id="pswd" name="password" /></td>
                                        </tr>
                                        <br/>   
                                        <tr>
                                            <td><button class="login-button justify-content-center"  style={{width:"400px"}} type="submit" onClick={submitHandler} >Continue</button></td>
                                        </tr>
                                    </table>
                                </form>
                            </div>
                        </center>
                    </Container>
                    <Footer />
                </div>
            }
        </div>

    );
}
export default EditProfile;