import React from 'react'
import "./Card.scss"

export default function Card({ name, image, genres }) {
    return (
        <div className="card">
            <img
                alt=""
                className="card__image"
                src={image}
                width="250px"
                height="250px"
            />
            <h3 className="card__name">{name}</h3>
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
