import "./Navbar.scss"
import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import HandleGames from "../HandleGames/HandleGames";
import logo from "../../assets/small-logo.svg";

export default function Navbar({
    handleFilterBy, handleOrderBy, allGenres, allPlatforms
}) {

    const [isOpen, setIsOpen] = React.useState(false)
    const handleClick = () => setIsOpen(!isOpen)

    return (
        <div
            className={
                isOpen
                    ? "navbar__container navbar__open--active"
                    : "navbar__container"
            }
        >

            <nav className="navbar__social-media">
                <a href="https://github.com/Jose-Angel-Rey"
                    target="_blank"
                    rel="noopener noreferrer">
                    <i className="fab fa-github" ></i>
                </a>

                <a href="https://www.linkedin.com/in/jose-angel-rey/"
                    target="_blank"
                    rel="noopener noreferrer">
                    <i className="fab fa-linkedin" ></i>
                </a>
            </nav>

            <button
                onClick={handleClick}
                className="navbar__open"

            >
                {
                    isOpen
                        ? <i className="fas fa-times"></i>
                        : <i className="far fa-circle"></i>
                }
            </button>



            <nav className="navbar__content">
                <img className="navbar__logo" src={logo} alt="logo" />

                <SearchBar />

                <Link
                    className="navbar__btn"
                    to="/create-videogame">
                    <i className="fas fa-plus"></i>
                    Create Game
                </Link>

                <HandleGames
                    allPlatforms={allPlatforms}
                    handleFilterBy={handleFilterBy}
                    handleOrderBy={handleOrderBy}
                    allGenres={allGenres}
                />
            </nav>
        </div>
    )
}
