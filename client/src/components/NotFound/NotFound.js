import "./NotFound.scss"
import React from 'react'
import NotFoundGif from '../../assets/gifs/not-found.gif'
import { useDispatch } from "react-redux"
import { getAllGames } from "../../redux/actions"

export default function NotFound() {
    const dispatch = useDispatch()

    return (
        <div className="not-found">
            < img src={NotFoundGif} alt="not found" />
            <button onClick={() => dispatch(getAllGames())}>
                <i className="fas fa-sync-alt"></i>
            </button>
            <h2>Games not found</h2>
        </div >
    )
}
