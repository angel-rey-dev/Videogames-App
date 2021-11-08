import "./SearchBar.scss";
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchByName } from '../../redux/actions'
import searchIcon from '../../assets/icons/search-icon.svg'

export default function SearchBar() {
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)
    const dispatch = useDispatch()
    const regex = /^[a-zA-Z0-9\s]{3,40}$/
    const handleChange = (e) => setName(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(searchByName(name.trim()))
        setName('')
        setNameError(false)
    }
    const inputValidation = (e) => {
        if (!regex.test(e.target.value)) setNameError(true)
        else setNameError(false)
    }

    return (
        <form className="search-bar" onSubmit={e => handleSubmit(e)}>
            <input
                className={`
                search-bar__input
                ${nameError ? 'search-bar__input--error' : ''}
                `}
                onChange={e => handleChange(e)}
                onKeyUp={e => inputValidation(e)}
                onBlur={e => setNameError(false)}
                placeholder="Search Videogame..."
                type="text"
                required
                value={name}
            />

            <button
                className="search-bar__button"
                onClick={e => handleSubmit(e)}
                type="submit">
                <img src={searchIcon} alt="search icon" />
            </button>

            {nameError &&
                <p className="search-bar__error">
                    Must be at least 3 characters long and max 40 characters
                </p>
            }
        </form>
    )
}
