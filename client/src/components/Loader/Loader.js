import "./Loader.scss"
import React from 'react'
import loadingAnimation from "../../assets/gifs/loading.svg";

export default function Loader() {
    return (
        <div className="loader">
            <img src={loadingAnimation} className="loading__img" alt="" />
        </div>
    )
}
