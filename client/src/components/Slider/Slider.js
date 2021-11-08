import "./Slider.scss"
import React from 'react'
import Slide1 from '../../assets/gaming-setup.webp'
import Slide2 from '../../assets/hero-banner-hd.webp'

export default function Slider({ imagesForSlider }) {
    return (
        <div className="slider">
            <ul>
                {
                    imagesForSlider.length > 0
                        ?
                        imagesForSlider.map((game, index) => {
                            return (
                                <li key={index}>
                                    <img src={game.background_image} alt="Slide" />
                                </li>
                            )
                        })
                        : <>
                            <li><img src={Slide1} alt="logo" /></li>
                            <li><img src={Slide2} alt="logo" /></li>
                            <li><img src={Slide1} alt="logo" /></li>
                            <li><img src={Slide2} alt="logo" /></li>
                        </>
                }
            </ul>
        </div>
    )
}
