import React from 'react'

export default function Card({name, image, genres}) {
    return (
        <div>
            <img src={image} alt="" width="250px" height="250px" />
            <h3>{name}</h3>
            <h4>{genres}</h4>
        </div>
    )
}
