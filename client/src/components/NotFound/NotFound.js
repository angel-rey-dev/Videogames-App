import "./NotFound.scss"
import React from 'react'
import NotFoundGif from '../../assets/gifs/not-found.gif'

export default function NotFound() {

    return (
        <div className="not-found">
            < img src={NotFoundGif} alt="not found" />
            <h2>Games not found</h2>
        </div >
    )
}
