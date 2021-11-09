import "./Page404.scss"
import React from 'react'
import { Link } from 'react-router-dom'
import illustration from '../../assets/404/space-404.svg'


export default function Page404() {
    return (
        <section className="page-404">
            <div className="page-404__content">
                <img src={illustration} alt="404" className="page-404__illustration" />
                <h2
                data-testid="page-404-title"
                >Page <span>not</span> found</h2>
                <Link to="/home" className="page-404__btn"
                    data-testid="go-to-home-page-btn">
                    Go to home page
                </Link>
            </div>
        </section>
    )
}
