import "./Header.scss"
import React from 'react'
import logo from '../../assets/general-logo.svg'
import SearchBar from '../SearchBar/SearchBar'

export default function Header() {
    return (
        <header className="header">
            <div className="header__flex-container">

                <img
                    alt="THE GAMEROOM Logo"
                    className="header__logo"
                    src={logo}
                /> 

                <SearchBar/>
            </div>
        </header>
    )
}
