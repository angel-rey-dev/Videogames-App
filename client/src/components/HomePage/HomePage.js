import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from '../../redux/actions/index'
import { Route } from "react-router-dom";
import Card from '../Card/Card';
import TopNavbar from '../TopNavbar/TopNavbar';
import Pagination from '../Pagination/Pagination';

export default function HomePage() {
    const dispatch = useDispatch()
    const allVideogames = useSelector(state => state.videogames)
    const [currentPage, setCurrentPage] = useState(1)
    const pagination = pageNumber => setCurrentPage(pageNumber)
    const videogamesPerPage = 15
    const indexOfLastVideogame = currentPage * videogamesPerPage
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

    useEffect(() => {
        dispatch(getAllGames())
    }, [dispatch])

    const handleButtonClick = (e) => {
        e.preventDefault()
        dispatch(getAllGames())
    }

    return (
        <div>
            <Route path="/" component={TopNavbar} />

            <button onClick={e => handleButtonClick(e)}>
                Volver a cargar todos los juegos
            </button>


            {/* Filtrados */}
            <div>

                <select>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
            </div>


            <div>
                <Pagination
                    allVideogames={allVideogames.length}
                    videogamesPerPage={videogamesPerPage}
                    pagination={pagination}
                />
            </div>

            <div>
                {currentVideogames.length
                    ? currentVideogames.map(game => {
                        let { id, name, genres, background_image } = game
                        if (game.id.length > 6 && typeof game.genres !== "string") genres = genres.map(genre => genre.name).join(" - ")
                        return <Card key={id} name={name} genres={genres} image={background_image} />
                    })
                    : <p>Loading....</p>
                }
            </div>

        </div>
    )
}
