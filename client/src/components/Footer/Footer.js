import React from 'react'
import "./Footer.scss"
import logo from "../../assets/general-logo.svg"

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__flex-container">
                <p className="footer__copy">
                    &copy; Copyright - All rights reserved
                </p>

                <img
                    alt="THE GAMEROOM Logo"
                    className="footer__logo"
                    src={logo}
                />

                <p className="footer__credits">
                    Developed by 
                    <a href="https://github.com/Jose-Angel-Rey" target="_blank" rel="noopener noreferrer">
                         Jose Angel Rey
                    </a>
                </p>
            </div>
        </footer>
    )
}

