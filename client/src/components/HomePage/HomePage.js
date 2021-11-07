import "./HomePage.scss"
import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, getAllGenres, filterByOrigin, filterByGenre, orderBy} from '../../redux/actions/index'
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
    const handleFilterByOrigin = e => { dispatch(filterByOrigin(e.target.value)); setCurrentPage(1) }
    const handleFilterByGenre = e => { dispatch(filterByGenre(e.target.value)); setCurrentPage(1) }
    const handleOrderBy = e => {
        dispatch(orderBy(e.target.value)); setCurrentPage(1)
    }


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
                        onChange={e => handleOrderBy(e)}
                    >
                        <option value="none">Unordered</option>
                        <optgroup label="Alphabetical ">
                            <option value="alph-asc">Ascendant</option>
                            <option value="alph-desc">Descendant</option>
                        </optgroup>
                        <optgroup label="Rating">
                            <option value="rat-asc">Ascendant</option>
                            <option value="rat-desc">Descendant</option>
                        </optgroup>
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
                        {allGenres.map(genre => <option value={genre} key={genre}>{genre}</option>)}
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
