import React from 'react'
import "./Pagination.scss";

export default function Pagination({ currentPage, videogamesPerPage, allVideogames, pagination }) {
    const pageNumbers = []
    for (let pageNumber = 1; pageNumber <= Math.ceil(allVideogames / videogamesPerPage); pageNumber++) { pageNumbers.push(pageNumber) };

    return (
        <nav className="pagination">
            <ul className="pagination__items-container">
                {
                    pageNumbers.length
                        ? pageNumbers.map(number => {
                            return (
                                <li key={number} className="pagination__item">
                                    <button
                                        className={`pagination__button ${currentPage === number ? "pagination__button--active" : ""}`}
                                        onClick={() => pagination(number)}
                                    >
                                        {number}
                                    </button>
                                </li>
                            )
                        })
                        : <></>
                }
            </ul>
        </nav>
    )
}
