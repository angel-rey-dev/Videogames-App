import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from '../redux/actions/index'
import { Link } from "react-router-dom";
import Card from './Card';

export default function HomePage() {
    const dispatch = useDispatch()
    const allVideogames = useSelector(state => state.videogames)

    useEffect(() => {
        dispatch(getAllGames())
    }, [dispatch])

    const handleButtonClick = (e) => {
        e.preventDefault()
        dispatch(getAllGames())
    }

    return (
        <div>
            <Link to="/create-videogame">Crear videojuego</Link>

            <h1>Home Page</h1>

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
                {allVideogames
                    ? allVideogames.map(game => {
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
