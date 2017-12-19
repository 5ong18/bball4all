import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="">
                <Link to="/" className="logo">
                    <span></span>
                </Link>
            </div>
        </footer>
    )
}

export default Footer;