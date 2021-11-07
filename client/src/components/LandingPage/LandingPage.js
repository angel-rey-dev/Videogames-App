import "./LandingPage.scss"
import React from 'react'
import { Link } from "react-router-dom";
import logo from '../../assets/landing-page-logo.svg'
import SocialMedia from '../SocialMedia/SocialMedia';

export default function LandingPage() {
    return (
        <div className="landing-page">
            <SocialMedia />
            <div className="overlay">
                <section className="landing-page__content">
                    <img
                        alt=""
                        src={logo}
                        className="landing-page__logo"
                    />

                    <Link to="/home" className="btn-start">
                        Start
                    </Link>

                </section>
            </div>
        </div>
    )
}