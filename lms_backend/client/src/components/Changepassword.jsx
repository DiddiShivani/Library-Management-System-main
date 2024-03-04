import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Navigate } from 'react-router-dom';
import { store } from "../index";
import { useNavigate } from "react-router-dom";
import NavbarHomepage from "./NavbarHomepage";
import Footer from "./Footer";

function Changepassword() {
    const navigate = useNavigate();
    const { token } = useContext(store);
    const [data, setData] = useState({
        rollNumber: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
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
            const response = await axios.post('http://localhost:5000/changePassword', data);
            alert(response.data);
            if (response.data === 'Password Changed Successfully') {
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
                            <div className="sign-comp" >
                                <h1>Change your Password</h1>
                                <form>

                                    <table cellSpacing="10" style={{ fontSize: "20px", fontWeight: "bold", marginTop: "10%" }}>
                                        <tr>
                                            <td>Enter old password</td>
                                        </tr>
                                        <tr>
                                            <td><input className="input-box" type="password" onChange={changeHandler} id="id" name="oldPassword" /></td>
                                        </tr>
                                        <br/>
                                        <tr>
                                            <td>Enter New password</td>
                                        </tr>
                                        <tr>
                                            <td><input className="input-box" type="password" onChange={changeHandler} id="pswd" name="newPassword" /></td>
                                        </tr>
                                        <br/>
                                        <tr>
                                            <td>Confirm New password</td>
                                        </tr>
                                        <tr>
                                            <td><input className="input-box" type="password" onChange={changeHandler} id="cpswd" name="confirmPassword" /></td>
                                        </tr>
                                        <br/>
                                        <tr>
                                            <td><button className="login-button justify-content-center"  style={{width:"400px"}} type="submit" onClick={submitHandler} >Continue</button></td>
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
export default Changepassword;