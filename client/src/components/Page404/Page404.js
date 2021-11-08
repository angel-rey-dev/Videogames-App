import "./Page404.scss"
import React from 'react'
import { Link } from 'react-router-dom'
import illustration from '../../assets/404/space-404.svg'


export default function Page404() {
    return (
        <section className="page-404">
            <div className="page-404__content">
                <img src={illustration} alt="404" />
                <h2>Page <span>not</span> found</h2>
                <Link to="/home" className="page-404__btn">
                    Go to home page
                </Link>
            </div>
        </section>
    )
}
