import "./SocialMedia.scss"
import React from 'react'

export default function SocialMedia() {
    return (
        <nav className="social-media">
            <a href="https://github.com/Jose-Angel-Rey"
                target="_blank"
                rel="noopener noreferrer">
                <i className="fab fa-github" ></i>
            </a>

            <a href="https://www.linkedin.com/in/jose-angel-rey/"
                target="_blank"
                rel="noopener noreferrer">
                <i className="fab fa-linkedin" ></i>
            </a>
        </nav>
    )
}
