import React from 'react'

export default function Pagination({ videogamesPerPage, allVideogames, pagination }) {
    const pageNumbers = []
    for (let pageNumber = 1; pageNumber <= Math.ceil(allVideogames / videogamesPerPage); pageNumber++) { pageNumbers.push(pageNumber) };

    return (
        <nav>
            <ul>
                {
                    pageNumbers.length && pageNumbers.map(number => {
                        return (
                            <li key={number}>
                                <button onClick={() => pagination(number)}>{number}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}
