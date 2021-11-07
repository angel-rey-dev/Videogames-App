import "./HomePage.scss"
import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, getAllGenres, orderBy, filterBy } from '../../redux/actions/index'
import { Link } from "react-router-dom";
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import Footer from '../Footer/Footer';
import Header from '../HeroBanner/Header';
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";

export default function HomePage() {
    const dispatch = useDispatch()
    const allGenres = useSelector(state => state.allGenres)
    const allVideogames = useSelector(state => state.allVideogames)
    const [currentPage, setCurrentPage] = useState(1)
    const pagination = pageNumber => setCurrentPage(pageNumber)
    const videogamesPerPage = 15
    const indexOfLastVideogame = currentPage * videogamesPerPage
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage

    let currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)


    useEffect(() => {
        dispatch(getAllGames())
        dispatch(getAllGenres())
    }, [dispatch])

    // const handleButtonClick = (e) => {
    //     e.preventDefault()
    //     dispatch(getAllGames())
    // }

    const handleOrderBy = e => { dispatch(orderBy(e.target.value)); setCurrentPage(1) }
    const handleFilterBy = e => { dispatch(filterBy(e.target.value)); setCurrentPage(1) }


    return (
        <div className="main">

            <Header />

            <Link to="/create-videogame"> <button className="btn btn-primary">Create a new videogame</button></Link>

            {/* Filtrados */}
            <section className="filters">

                <div>
                    <label htmlFor="order">Order by:</label>
                    <select
                        name="order"
                        id="order"
                        defaultValue="none"
                        onChange={e => handleOrderBy(e)}
                    >
                        <option value="none">Unordered</option>
                        <optgroup label="--- Alphabetical ---">
                            <option value="alph-asc">Ascendant</option>
                            <option value="alph-desc">Descendant</option>
                        </optgroup>
                        <optgroup label="------- Rating -------">
                            <option value="rat-asc">Ascendant</option>
                            <option value="rat-desc">Descendant</option>
                        </optgroup>
                    </select>
                </div>

                <div>
                    <label htmlFor="filter">Filter by:</label>
                    <select
                        name="filter"
                        id="filter"
                        defaultValue="all"
                        onChange={e => handleFilterBy(e)}
                    >
                        <option value="all">None</option>
                        <optgroup label="------- Origin -------">
                            <option value="all">All</option>
                            <option value="api">API</option>
                            <option value="user">User</option>
                        </optgroup>
                        <optgroup label="------- Genre -------">
                            <option value="all">All</option>
                            {allGenres.map(genre => <option value={genre} key={genre}>{genre}</option>)}
                        </optgroup>
                    </select>
                </div>

            </section>

            <Pagination
                className="paginationTop"
                allVideogames={allVideogames.length}
                videogamesPerPage={videogamesPerPage}
                pagination={pagination}
                currentPage={currentPage}
            />

            <section className="videogames">
                {currentVideogames.length
                    ? currentVideogames === "Not Found"
                        ? <NotFound />
                        : currentVideogames.map(game => {
                            let { id, name, genres, background_image, rating } = game
                            genres = genres.map(genre => genre.name)
                            return <Card key={id} name={name} genres={genres} image={background_image} rating={rating} id={id} />

                        })
                    : <Loader />
                }
            </section>

            <Pagination
                className="paginationBottom"
                allVideogames={allVideogames.length}
                videogamesPerPage={videogamesPerPage}
                pagination={pagination}
                currentPage={currentPage}
            />

            <Footer />
        </div>
    )
}
