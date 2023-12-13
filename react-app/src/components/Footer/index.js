import React from 'react';
import './Footer.css'
import { Link } from "react-router-dom";

function Footer(){


    return (
        <>
        
        <div className="footer-container">

            <div style={{paddingBottom: "8px"}}>
                Dayze
            Created by Peang Ngo
                </div>

<div>
<Link to="https://www.linkedin.com/in/peang-ngo-840860112/" className="footer-link">
             <i className="fa-brands fa-linkedin"></i>
             Linkedin
            </Link>
            
             <Link to="https://github.com/pingno" className="footer-link" style={{paddingLeft: "25px"}}>
             <i className="fa-brands fa-github"></i>
                Github
             </Link>
</div>
            
        </div>
        
        </>
    )

}

export default Footer