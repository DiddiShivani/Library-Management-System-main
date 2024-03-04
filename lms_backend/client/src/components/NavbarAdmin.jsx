import React, { useContext } from "react";
import {store} from "../index";
import { Navigate } from 'react-router-dom';


function NavbarAdmin() {
    const {adminToken,setAdminToken} = useContext(store);
    const handleLogout = () => {
        setAdminToken(null);  
        localStorage.removeItem('adminToken') 
      };

    if(!adminToken){
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
                            <button onClick ={handleLogout} style={{borderRadius:"10px",color:"black",backgroundColor:"white"}}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    )
}

export default NavbarAdmin;