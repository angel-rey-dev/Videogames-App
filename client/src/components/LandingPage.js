import React from 'react'
import { Link } from "react-router-dom";
import "./landing-page.scss"
export default function LandingPage() {
    return (
        <div className="container">
            <h1>Bienvenido</h1>
            <Link to="/home">
                <button>Start</button>
            </Link>
        </div>
    )
}
