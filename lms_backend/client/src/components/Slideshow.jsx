import React, { useState, useEffect } from 'react';

const Slideshow = () => {
    const images = [
        `${process.env.PUBLIC_URL}/slide1.png`,
        `${process.env.PUBLIC_URL}/slide2.png`,
        `${process.env.PUBLIC_URL}/slide1.png`,
        `${process.env.PUBLIC_URL}/slide2.png`,
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 2000);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentImage, images.length]);

    return (
        <div className="slideshow" style={{marginTop: "90px"}}>
            <img src={ images[currentImage]} alt={`Slide ${currentImage + 1}`} />
        </div>
    );
};

export default Slideshow;
