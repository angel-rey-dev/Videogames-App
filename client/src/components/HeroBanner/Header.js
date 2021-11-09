import "./Header.scss"
import React from 'react'
import logo from '../../assets/general-logo.svg'
import Slider from "../Slider/Slider"

export default function Header({ imagesForSlider, isLoading }) {
    return (
        <header className="header">

            <div className="header__flex-container">
                <img
                    alt="THE GAMEROOM Logo"
                    className={
                        isLoading
                            ? "header__logo"
                            : "header__logo header__logo--animation"
                    }
                    src={logo}
                />
                <i
                    className={
                        `header__icon fas fa-angle-double-down 
                        ${isLoading ? '' : 'header__icon--animation'}`
                    }
                ></i>
            </div>

            <Slider
                imagesForSlider={imagesForSlider}
            />


        </header>
    )
}
