import "./FormModal.scss"
import React from 'react'
import { Link } from "react-router-dom"

export default function FormModal() {
    return (
        <section className="form-modal">
            <div className="form-modal__container">

                <div className="form-modal__content" >
                    <i className="far fa-check-circle"></i>
                    <h2>Videogame created successfully!</h2>
                    <p>You can now go back to the homepage and add more videogames.</p>
                    <Link to="/home"
                        className="form-modal__button">
                        Go back to homepage
                    </Link>
                </div>

            </div>
        </section>
    )
}
