import axios from "axios";
import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {store} from '../index'

const Signup = () => {
    const navigate = useNavigate();
    const {token, adminToken} = useContext(store);
    const [data, setData] = useState({
        rollNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        contact: ''
    })
    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/register', data);
            alert(response.data);
            if (response.data === 'User registered successfully') {
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
    if (token) {
        return <Navigate to='/home' />;
    }
    else if(adminToken) {
        return <Navigate to='/admin' />;
    }
    return (
        <Container><center>
            <div class="sign-comp" style={{ marginTop: "7%" }}>
                <h1>Sign Up</h1>
                <form>
                <table cellSpacing={20} cellPadding={5}> 
                    <tr>
                            <td><input class="input-box" type="input" onChange={changeHandler} placeholder="Roll Number" id="roll" name="rollNumber" /></td>
                        </tr>
                        <tr>
                            <td><input class="input-box" type="email" onChange={changeHandler} placeholder="Email" id="email" name="email" /></td>
                        </tr>
                        <tr>
                            <td><input class="input-box" type="password" onChange={changeHandler} placeholder="Password" id="pswd" name="password" /></td>
                        </tr>
                        <tr>
                            <td><input class="input-box" type="password" onChange={changeHandler} placeholder="Confirm Password" id="pswd" name="confirmPassword" /></td>
                        </tr>
                        <tr>
                            <td><input class="input-box" type="text" onChange={changeHandler} placeholder="Contact" id="contact" name="contact" /></td>
                        </tr>
                        {/* <tr><td style="color: red; font-size: 22px; font-weight: 500;" align="center"></td>Result</tr> */}
                        <tr>
                            <td class="terms">By continuing, I agree to the <a href="" class="anchor">Terms of Use</a> and <br /><a href="" class="anchor">privacy policy</a></td>
                        </tr>
                        <tr>
                            <td><button class="login-button mt-4 mb-2 justify-content-center" type="submit" onClick={submitHandler}>Continue</button></td>
                        </tr>
                        <tr>
                            <td class="terms">Already have an account?<Link to="/signin">Login</Link></td>
                        </tr>
                    </table>
                </form>
            </div>
        </center></Container>
    );
}
export default Signup;