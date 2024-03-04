import React, { useState, useEffect, useContext } from "react";
import Footer from "./Footer";
import NavbarHomepage from "./NavbarHomepage";
import { store } from "../index";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

function Profile() {
    const { token } = useContext(store);
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (token) {
            axios.get('http://localhost:5000/myprofile', {
                headers: {
                    'x-token': token
                }
            })
                .then(res => setUser(res.data))
                .catch(err => console.log(err));
        }
    }, [token]);

    if (!token) {
        return <Navigate to="/signin" />;
    }
    if (!user) {
        return <div>Loading the page.......</div>
    }
    return (
        <div>
            <NavbarHomepage email={user.email} />
            <div className="container" style={{ marginTop: "110px" }}>
                <div className="bg-light shadow rounded">
                        <br />
                        <h2 className="text-center">Diddi Shivani - {user.rollNumber}</h2>
                        <hr />
                        <table cellPadding={10} style={{ fontSize: "18px", marginLeft: "20px" }}>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th> : </th>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <th>Roll Number</th>
                                    <th> : </th>
                                    <td>{user.rollNumber}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <th> : </th>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <th>Password</th>
                                    <th> : </th>
                                    <td>{user.password}</td>
                                    <td>
                                        <Link to='/changePassword' className="btn btn-success">Change Password</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Contact</th>
                                    <th> : </th>
                                    <td>{user.contact}</td>
                                    <td>
                                        <Link to='/editProfile' className="btn btn-primary">Change Contact</Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    <br />
                </div>
                <br />
            </div>
            <Footer />
        </div>
    )
}

export default Profile;