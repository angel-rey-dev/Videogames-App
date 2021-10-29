import React from 'react'
// import { use } from 'react-router-dom';
import "./Pagination.scss";

export default function Pagination({ currentPage, videogamesPerPage, allVideogames, pagination }) {
    const pageNumbers = []
    for (let pageNumber = 1; pageNumber <= Math.ceil(allVideogames / videogamesPerPage); pageNumber++) { pageNumbers.push(pageNumber) };

    return (
        <nav className="pagination">
            <ul className="pagination__items-container">
                {
                    pageNumbers.length && pageNumbers.map(number => {
                        return (
                            <li key={number} className="pagination__item">
                                <button
                                    className="pagination__button"
                                    onClick={(e) => {
                                        pagination(number)
                                        if(currentPage === number){
                                            e.target.classList.add("pagination__active-button")
                                        }
                                    }}
                                >
                                    {number}
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}
