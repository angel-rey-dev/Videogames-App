import "./Card.scss"
import React from 'react'
import { Link } from 'react-router-dom'
import starIcon from "../../assets/icons/star.svg"
import defaultImage from '../../assets/default-image.webp'

export default function Card({ name, image, genres, rating, id }) {
    return (
        <div className="card">
            <Link to={`/videogame/${id}`}>
                <img
                    alt=""
                    className="card__image"
                    src={image || defaultImage}
                />
                <h3 className="card__name">
                    {name}
                </h3>
            </Link>

            <p className="card__rating">
                {rating}
                <img src={starIcon} alt="Star icon" />
            </p>
            <div className="card__genres">
                <p>Genres</p>
                {
                    genres.length
                        ? genres.map(genre => <span key={genre}>{genre}</span>)
                        : <></>
                }
            </div>
        </div>
    )
}
