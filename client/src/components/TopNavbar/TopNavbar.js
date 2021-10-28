import React from 'react'
import { Link } from 'react-router-dom'
import "./TopNavbar.scss"
import logo from '../../assets/general-logo.svg'

export default function TopNavbar() {
    return (
        <nav className="top-navbar">
            <Link
                to="/home"
                className="top-navbar__logo"
            >
                <img
                    alt=""
                    src={logo}

                />
            </Link>


            <Link
                to="/create-videogame">
                Crear videojuego
            </Link>

        </nav>
    )
}
