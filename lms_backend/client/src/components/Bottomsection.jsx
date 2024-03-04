import React from "react";

function Bottomsection() {
    return (
        <div className="bottomsection">
            <div className="leftsection">
                <img src={process.env.PUBLIC_URL + '/bookstack.png'} alt="not found" height={200}/>
                <h1>Library</h1>
            </div>
            <div className="section">
                <div className="subsection">
                    <img src={process.env.PUBLIC_URL + '/book1.png'} alt="not found" height={100}/>
                    <p>1000+ books</p>
                </div>
                <div className="subsection">
                    <img src={process.env.PUBLIC_URL + '/author.png'} alt="not found" height={100}/>
                    <p>300+ authors</p>
                </div>
                <div className="subsection">
                    <img src={process.env.PUBLIC_URL + '/genre.png'} alt="not found" height={100}/>
                    <p>50+ genres</p>
                </div>
                <div className="subsection">
                    <img src={process.env.PUBLIC_URL + '/reader.png'} alt="not found" height={100}/>
                    <p>500+ readers</p>
                </div>
            </div>
        </div>
    )
}

export default Bottomsection;