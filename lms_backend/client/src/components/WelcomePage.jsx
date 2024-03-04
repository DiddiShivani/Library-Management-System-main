import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Topsection from "./Topsection";

function WelcomePage(){
    return(
        <div>
            <Navbar/>
            <Topsection/>
            <Footer/>
        </div>
    )
}

export default WelcomePage;