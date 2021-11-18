import "./DetailPage.scss"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getVideogameDetail } from '../../redux/actions'
import { useEffect } from 'react'
import banner from '../../assets/hero-banner-background.webp'
import starIcon from '../../assets/icons/star.svg'
import homeIcon from '../../assets/icons/home-icon.svg'
import defaultImage from '../../assets/default-image.webp'
import Loader from "../Loader/Loader"


export default function DetailPage(props) {
    const dispatch = useDispatch()
    let videogame = useSelector(state => state.videogameDetails)
    const id = props.match.params.id

    useEffect(() => {
        dispatch(getVideogameDetail(id))
    }, [dispatch, id])


    return (
        <div className="detail-page">

            <Link
                to="/home"
                className="detail-page__back-btn"
            >
                <img src={homeIcon} alt="" width="30px" />
            </Link>


            <div className="game-container">
                {
                    videogame.length > 0
                        ? <section className="game">
                            <div
                                className="game__banner"
                            >
                                <img
                                    src={videogame[0].background_image || defaultImage}
                                    alt={videogame[0].name}
                                />
                            </div>

                            <div className="game__info">

                                <h1 className="game__name">{videogame[0].name}</h1>

                                <div className="game__basic-info">
                                    <p>
                                        Rating:
                                        <span>{videogame[0].rating}</span>
                                        <img src={starIcon} alt="star-icon" width="20px" />
                                    </p>
                                    <p>
                                        Released:
                                        <span>{videogame[0].released}</span>
                                    </p>

                                </div>

                                <p className="game__description">
                                    {
                                        id.toString().length > 6
                                            ? videogame[0].description
                                            : videogame[0].description.replace(/<[^>]*>?/g, "") || videogame[0].description}
                                </p>


                                <div className="game__multiple-info">
                                    <h3>Genres:</h3>
                                    <ul>
                                        {
                                            videogame[0].genres.map(genre => {
                                                return <li key={genre.name || genre}>{genre.name || genre}</li>
                                            })
                                        }
                                    </ul>
                                </div>

                                <div className="game__multiple-info">
                                    <h3>Platforms:</h3>
                                    <ul>
                                        {
                                            videogame[0].platforms.map(platform => {
                                                return <li key={platform}>{platform}</li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>

                        </section>
                        : <Loader />
                }
            </div>

            <div className="detail-page__fixed-background">
                {
                    videogame.length > 0
                        ? <img src={videogame[0].background_image || defaultImage} alt={videogame[0].name} />
                        : <img src={banner} alt="" />
                }

            </div>

        </div>
    )
}
