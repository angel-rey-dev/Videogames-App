import "./HomePage.scss"
import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, getAllGenres, orderBy, filterBy } from '../../redux/actions/index'
import Navbar from "../Navbar/Navbar";
import Header from '../HeroBanner/Header';
import Loader from "../Loader/Loader";
import Pagination from '../Pagination/Pagination';
import Card from '../Card/Card';
import NotFound from "../NotFound/NotFound";
import Footer from '../Footer/Footer';

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

    const handleOrderBy = e => { dispatch(orderBy(e.target.value)); setCurrentPage(1) }
    const handleFilterBy = e => { dispatch(filterBy(e.target.value)); setCurrentPage(1) }

    const imagesForSlider = allVideogames.length > 0 ? [...allVideogames].slice(0, 4) : []

    useEffect(() => {
        dispatch(getAllGames())
        dispatch(getAllGenres())
    }, [dispatch])


    return (
        <div className="main">
            <Navbar
                handleFilterBy={handleFilterBy}
                handleOrderBy={handleOrderBy}
                allGenres={allGenres}
            />

            <Header
                imagesForSlider={imagesForSlider}
            />

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
