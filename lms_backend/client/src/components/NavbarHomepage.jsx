import React, { useContext } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Dropdownbox from './Dropdownbox';
import { Link } from 'react-router-dom';
import { store } from "../index";
import { Navigate } from 'react-router-dom';

function NavbarHomepage(props) {
    const mail = props.email;
    const username = mail.split('@')[0];
    const { token, setToken } = useContext(store);
    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    if (!token) {
        return <Navigate to="/signin" />
    }
    return (
        <div style={{ backgroundColor: "rgb(228, 228, 228)" }}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand fs-4" href="#">LMS</a>
                    <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="sidebar offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
                        <div className="offcanvas-header text-black border-bottom">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">LMS</h5>
                            <button type="button" class="btn-close btn-close-black shadow-none" data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item mx-2">
                                    <div style={{ borderRadius: "10px", paddingRight: "20px", marginTop: "10px" }}>
                                        Hello {username}
                                    </div>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to='/SearchBooks' style={{ textDecoration: "none", color: "black" }}>
                                        <div className='search_welcome' style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', paddingRight: "10px", backgroundColor: "rgba(255, 255, 255, 0.4)", borderRadius: "10px", marginTop: "10px", }}>
                                            <SearchOutlinedIcon />
                                            <span>Search for Books</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to='/aboutus' className="nav-link">AboutUs</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to='/contactus' className="nav-link">ContactUs</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        Profile
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" style={{ paddingLeft: "20px", marginRight: "10px", paddingTop: "20px", paddingBottom: "30px",
                                     maxHeight: "115px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", maxWidth: "30px", backgroundColor: "rgba(255, 255, 255, 0.4)" }}>
                                        <Link to={`/profile`} style={{ textAlign: "left", textDecoration: "none", color: "black", paddingLeft: "20px" }}>View Profile</Link>
                                        <button onClick={handleLogout} style={{ color: "black", backgroundColor: "rgba(255, 255, 255, 0.0)"}}> Logout </button>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavbarHomepage;
