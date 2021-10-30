import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from '../../redux/actions/index'
// import { Route } from "react-router-dom";
import Card from '../Card/Card';
// import TopNavbar from '../TopNavbar/TopNavbar';
import Pagination from '../Pagination/Pagination';
import "./HomePage.scss"
import Footer from '../Footer/Footer';
import Header from '../HeroBanner/Header';


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

    // const handleButtonClick = (e) => {
    //     e.preventDefault()
    //     dispatch(getAllGames())
    // }

    return (
        <div className="main">

            <Header />

            {/* Filtrados */}
            <section className="filters">

                {/* Order by - Alphabetic */}
                <div>
                    <label htmlFor="name">Alphabetic:</label>
                    <select name="name" id="name">
                        {/* <optgroup label="Choose an order"> */}
                            <option value="asc">Ascendente</option>
                            <option value="desc">Descendente</option>
                        {/* </optgroup> */}
                    </select>
                </div>

                {/* Order by - Rating */}
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <select name="rating" id="rating">
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                </div>

                {/* Filter by -Origin */}
                <div>
                    <label htmlFor="origin">Origin:</label>
                    <select name="origin" id="origin">
                        <option value="all">All</option>
                        <option value="api">API</option>
                        <option value="user">User</option>
                    </select>
                </div>

                {/* Filter by -Genre */}
                <div>
                    <input type="checkbox" id="Action" name="Action" />
                    <label htmlFor="Action">Action</label>
                </div>
            </section>

            <Pagination
                allVideogames={allVideogames.length}
                videogamesPerPage={videogamesPerPage}
                pagination={pagination}
                currentPage={currentPage}
            />

            <section className="videogames">
                {currentVideogames.length
                    ? currentVideogames.map(game => {
                        let { id, name, genres, background_image } = game
                        if (game.id.length > 6 && typeof game.genres !== "string") genres = genres.map(genre => genre.name)
                        return <Card key={id} name={name} genres={genres} image={background_image} />
                    })
                    : <p>Loading....</p>
                }
            </section>


            <Footer />
        </div>
    )
}
