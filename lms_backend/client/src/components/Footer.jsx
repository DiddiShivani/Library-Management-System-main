import React from 'react';

function Footer(){
    const year = new Date().getFullYear();
    return <footer className='footer'>copyright © {year}</footer>
}

export default Footer;