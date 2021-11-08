import './CreateGamePage.scss'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { postNewVideogame, getAllGenres, getAllPlatforms } from '../../redux/actions'
import homeIcon from '../../assets/icons/home-icon.svg'
import bannerHd from '../../assets/gaming-setup.webp'
import Loader from '../Loader/Loader'
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'
import Footer from '../Footer/Footer'

export default function CreateGamePage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const allGenres = useSelector(state => state.allGenres)
    const allPlatforms = useSelector(state => state.allPlatforms)
    const regex = {
        name: /^[a-zA-Z0-9\s]{3,50}$/,
        description: /^[a-zA-Z0-9\s]{3,400}$/,
        released: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
        rating: /^[1-5]{1}$|^[1-5]{1}[.]{1}[0-9]{1}$/,
        background_image: /^[^\s]*$/
    }
    const [input, setInput] = useState({
        name: '',
        background_image: "",
        description: '',
        released: '',
        rating: '',
        genres: [],
        platforms: []
    })
    const [inputError, setInputError] = useState({
        name: false,
        description: false,
        rating: false,
        released: false,
        background_image: false,
        genres: false,
        platforms: false
    })

    const inputValidation = (e) => {
        const { name, value } = e.target
        if (regex[name].test(value.trim())) setInputError({ ...inputError, [name]: false })
        else setInputError({ ...inputError, [name]: true })
    }

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleCheckboxChange = (e) => {
        if (allGenres.includes(e.target.name)) {
            setInput({
                ...input,
                genres: e.target.checked ? [...input.genres, e.target.value] : input.genres.filter(genre => genre !== e.target.value)
            })
        } else {
            setInput({
                ...input,
                platforms: e.target.checked ? [...input.platforms, e.target.value] : input.platforms.filter(platform => platform !== e.target.value)
            })
        }
    }

    const validateForm = () => {
        let isValid = false
        const { name, description, released, rating, genres, platforms } = input

        if (
            name === '' ||
            description === '' ||
            released === '' ||
            rating === '' ||
            genres.length === 0 ||
            platforms.length === 0
        ) {
            setInputError({
                name: name === '' ? true : false,
                description: description === '' ? true : false,
                rating: rating === '' ? true : false,
                released: released === '' ? true : false,
                genres: genres.length === 0 ? true : false,
                platforms: platforms.length === 0 ? true : false
            })
        } else isValid = true
        return isValid
    }

    const handleReset = () => {
        setInput({
            name: '',
            background_image: "",
            description: '',
            released: '',
            rating: '',
            genres: [],
            platforms: []
        })
        setInputError({
            name: false,
            description: false,
            rating: false,
            released: false,
            background_image: false,
            genres: false,
            platforms: false
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(input)

        if (validateForm()) {
            dispatch(postNewVideogame(input))
            alert('Videogame created successfully!')
            history.push('/')
        }
    }

    useEffect(() => {
        dispatch(getAllGenres())
        dispatch(getAllPlatforms())
    }, [dispatch])


    return (
        <section className="create-game-page">
            <Link
                to="/home"
                className="create-game-page__back-btn"
            >
                <img src={homeIcon} alt="" width="30px" />
            </Link>

            <div className="form-container">
                {
                    allGenres.length > 0 && allPlatforms.length > 0
                        ? <>
                            <form
                                className="form"
                                onSubmit={e => handleSubmit(e)}
                            >

                                <h2 className="form__title">Create a new videogame</h2>
                                {/* ------------------------------------------------------ */}

                                <div className="form__input-container form__name-container ">
                                    <label
                                        htmlFor="name"
                                    >
                                        Name
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter the name of the videogame"
                                        value={input.name}
                                        autoComplete="off"
                                        onChange={(e) => handleInputChange(e)}
                                        onKeyUp={(e) => inputValidation(e)}
                                        className={inputError.name ? "form__input--error" : "form__input--success"}
                                    />

                                    {
                                        inputError.name &&
                                        <p className="form__error">
                                            Must be between 3 and 50 characters
                                        </p>
                                    }
                                </div>

                                {/* ------------------------------------------------------ */}

                                <div className="form__input-container form__description-container">
                                    <label
                                        htmlFor="description"
                                    >Description
                                    </label>

                                    <textarea
                                        id="description"
                                        name="description"
                                        type="text"
                                        required
                                        placeholder="Description is required and must be between 3 and 400 characters"
                                        value={input.description}
                                        onChange={(e) => handleInputChange(e)}
                                        onKeyUp={(e) => inputValidation(e)}
                                        className={inputError.description ? "form__input--error" : "form__input--success"}
                                    >
                                    </textarea>

                                    {
                                        inputError.description &&
                                        <p className="form__error">
                                            Must be between 3 and 400 characters
                                        </p>
                                    }

                                </div>

                                {/* ------------------------------------------------------ */}

                                <div className="form__fields-container">
                                    <div className="form__rating-container">
                                        <label
                                            htmlFor="rating"
                                        >
                                            Rating
                                        </label>
                                        <input
                                            id="rating"
                                            name="rating"
                                            type="number"
                                            min="1"
                                            max="5"
                                            placeholder="1.0"
                                            required
                                            value={input.rating}
                                            onChange={(e) => handleInputChange(e)}
                                            onKeyUp={(e) => inputValidation(e)}
                                            className={inputError.rating ? "form__input--error" : "form__input--success"}
                                        />

                                        {
                                            inputError.rating &&
                                            <p className="form__error">
                                                Must be between 1.0 and 5.0
                                            </p>

                                        }
                                    </div>

                                    <div className="form__released-container">
                                        <label
                                            htmlFor="released"
                                        >Released
                                        </label>
                                        <input
                                            id="released"
                                            name="released"
                                            required
                                            type="date"
                                            value={input.released}
                                            onChange={(e) => { handleInputChange(e); inputValidation(e) }}
                                            className={inputError.released ? "form__input--error" : "form__input--success"}
                                        />
                                        {
                                            inputError.released &&
                                            <p className="form__error">
                                                Must be a valid date
                                            </p>
                                        }

                                    </div>

                                </div>

                                {/* ------------------------------------------------------ */}

                                <div className="form__input-container form__image-container">
                                    <label
                                        htmlFor="image"
                                    >URL to image (optional)
                                    </label>
                                    <input
                                        id="background_image"
                                        name="background_image"
                                        autoComplete="off"
                                        type="text"
                                        placeholder="Enter the URL of the image"
                                        value={input.background_image}
                                        onChange={(e) => handleInputChange(e)}
                                        onKeyUp={(e) => inputValidation(e)}
                                        className={inputError.background_image ? "form__input--error" : "form__input--success"}
                                    />

                                    {
                                        inputError.background_image && (
                                            <p className="form__error">
                                                No spaces allowed
                                            </p>
                                        )
                                    }
                                </div>

                                {/* ------------------------------------------------------ */}


                                <div className="form__checkbox-container">

                                    <div className="form__genres-container">
                                        <h3 className="form__checkbox-container-title" >Genres</h3>
                                        <div className="custom-checkbox-container">
                                            {allGenres.map(genre => (
                                                <CustomCheckbox
                                                    key={genre}
                                                    checkboxValue={genre}
                                                    onChangeFunction={handleCheckboxChange}
                                                    isActive={input.genres.includes(genre)}
                                                    />
                                            ))}
                                        </div>
                                        {
                                            inputError.genres &&
                                            <p className="form__error">
                                                At least one genre must be selected
                                            </p>
                                        }

                                    </div>

                                    <div className="form__platforms-container" >
                                        <h3 className="form__checkbox-container-title" >Platforms</h3>
                                        <div className="custom-checkbox-container">
                                            {allPlatforms.map(platform => (
                                                <CustomCheckbox
                                                    key={platform}
                                                    checkboxValue={platform}
                                                    onChangeFunction={handleCheckboxChange}
                                                />
                                            ))}
                                        </div>

                                        {
                                            inputError.platforms &&
                                            <p className="form__error">
                                                At least one platform must be selected
                                            </p>
                                        }
                                    </div>

                                </div>

                                {/* ------------------------------------------------------ */}


                                <div className="form__buttons-container">

                                    <button
                                        className="form__reset-button"
                                        type="reset"
                                        onClick={() => handleReset()}
                                    >
                                        Reset
                                    </button>

                                    <button
                                        className="form__submit-button"
                                        onClick={e => handleSubmit(e)}
                                        type="submit"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>

                            <div className="form-container__banner">
                                <img src={bannerHd} alt="" />
                            </div>
                        </>
                        : <Loader />
                }
            </div>

            <div className="create-game-page__fixed-background">
                <img src={bannerHd} alt="" />
            </div>

            {
                allGenres.length > 0 && allPlatforms.length > 0
                    ? <Footer />
                    : <Loader />
            }
        </section>
    )
}
