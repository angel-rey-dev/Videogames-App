import "./Header.scss"
import React from 'react'
import logo from '../../assets/general-logo.svg'
import Slider from "../Slider/Slider"

export default function Header({ imagesForSlider }) {
    return (
        <header className="header">

            <div className="header__flex-container">
                <img
                    alt="THE GAMEROOM Logo"
                    className="header__logo"
                    src={logo}
                />
                <i
                    className="fas fa-angle-double-down header__icon "
                ></i>
            </div>

            <Slider
                imagesForSlider={imagesForSlider}
            />


        </header>
    )
}
