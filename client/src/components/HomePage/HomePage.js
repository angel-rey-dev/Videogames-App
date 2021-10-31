import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, getAllGenres, filterByOrigin, orderByName, orderByRating, filterByGenre } from '../../redux/actions/index'
// import { Route } from "react-router-dom";
import Card from '../Card/Card';
// import TopNavbar from '../TopNavbar/TopNavbar';
import Pagination from '../Pagination/Pagination';
import "./HomePage.scss"
import Footer from '../Footer/Footer';
import Header from '../HeroBanner/Header';


export default function HomePage() {
    const dispatch = useDispatch()
    const allGenres = useSelector(state => state.allGenres)
    const allVideogames = useSelector(state => state.allVideogames)
    const [order, setOrder] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const pagination = pageNumber => setCurrentPage(pageNumber)
    const videogamesPerPage = 15
    const indexOfLastVideogame = currentPage * videogamesPerPage
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage

    let currentVideogames
    if (allVideogames.every(game => game.createdInDb)) currentVideogames = allVideogames
    else currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)


    useEffect(() => {
        dispatch(getAllGames())
        dispatch(getAllGenres())
    }, [dispatch])

    // const handleButtonClick = (e) => {
    //     e.preventDefault()
    //     dispatch(getAllGames())
    // }
    const handleFilterByOrigin = e => dispatch(filterByOrigin(e.target.value))
    const handleFilterByGenre = e => dispatch(filterByGenre(e.target.value))
    const handleOrderByName = e => dispatch(orderByName(e.target.value))
    const handleOrderByRating = e => dispatch(orderByRating(e.target.value))
    const handleSort = e => {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder("Ordenado ", e.target.value)
    }

    return (
        <div className="main">

            <Header />

            {/* Filtrados */}
            <section className="filters">

                {/* Order by - Alphabetic */}
                <div>
                    <label htmlFor="name">Alphabetic:</label>
                    <select name="name" id="name" onChange={e => handleSort(e)}>
                        {/* <optgroup label="Choose an order"> */}
                        <option value="none">Choose one...</option>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                        {/* </optgroup> */}
                    </select>
                </div>

                {/* Order by - Rating */}
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <select name="rating" id="rating" onChange={e => handleOrderByRating(e)}>
                        <option value="none">Choose one...</option>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                </div>

                {/* Filter by -Origin */}
                <div>
                    <label htmlFor="origin">Origin:</label>
                    <select name="origin" id="origin" onChange={e => handleFilterByOrigin(e)}>
                        <option value="all">All</option>
                        <option value="api">API</option>
                        <option value="user">User</option>
                    </select>
                </div>

                {/* Filter by -Genre */}
                <div>
                    <label htmlFor="genres">Genres:</label>
                    <select name="genres" id="genres" onChange={e => handleFilterByGenre(e)}>
                        <option value="all">All</option>
                        {allGenres.map(genre => <option value={genre}>{genre}</option>)}
                    </select>
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
                        let { id, name, genres, background_image, rating } = game
                        genres = genres.map(genre => genre.name)
                        return <Card key={id} name={name} genres={genres} image={background_image} rating={rating} />
                    })
                    : <p>Loading....</p>
                }
            </section>


            <Footer />
        </div>
    )
}
