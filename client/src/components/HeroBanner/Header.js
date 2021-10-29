import React from 'react'
import logo from '../../assets/general-logo.svg'
import "./Header.scss"

export default function Header() {
    return (
        <header className="header">
            <div className="header__flex-container">

                <img
                    alt="THE GAMEROOM Logo"
                    className="header__logo"
                    src={logo}
                />

                <input type="text" placeholder="Search Videogame..." className="header__search-bar" />

            </div>
        </header>
    )
}
