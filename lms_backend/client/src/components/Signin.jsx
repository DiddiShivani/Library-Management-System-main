import React,{useState,useContext} from "react";
import { Container } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import {store} from "../index";

const Signin = () => {
    const {token,setToken, adminToken, setAdminToken} = useContext(store);
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/login', data);
            const Token = res.data.token;
            
            if (data.email === 'admin@gmail.com'){
                setAdminToken(Token)
                localStorage.setItem('adminToken', Token);
            }
            else{
                setToken(Token);
                localStorage.setItem('token', Token);
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
    <Container>
        <center>
        <div class="sign-comp" style={{marginTop: "10%"}} >
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                    <table cellSpacing={20} cellPadding={5}> 
                    <tr>
                        <td><input class="input-box" type="input" onChange = {changeHandler} placeholder="Username" id="id" name="email"/></td>
                    </tr>
                    <tr>
                        <td><input class="input-box" type="password" onChange = {changeHandler} placeholder="Password" id="pswd" name="password"/></td>
                    </tr>
                    <tr>
                        <td class="terms">By continuing, I agree to the <a href="" class="anchor">Terms of Use</a> and <br/><a href="" class="anchor">privacy policy</a></td>
                    </tr>
                    <tr>
                        <td><button class="login-button justify-content-center" type="submit" >Continue</button></td>
                    </tr>
                    <tr>
                        <td class="terms">Don't have an account? <Link to="/signup">Sign up</Link></td>
                    </tr>
                    </table>
            </form>    
        </div>
        </center>
    </Container>
    );
}
export default Signin;