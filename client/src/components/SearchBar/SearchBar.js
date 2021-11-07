import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchByName } from '../../redux/actions'
import "./SearchBar.scss";
import searchIcon from '../../assets/icons/search-icon.svg'

export default function SearchBar() {
    const [name, setName] = useState('')

    const dispatch = useDispatch()

    const handleChange = (e) => {
        console.log(e.target.value)
        setName(e.target.value)
    }

    // let error 
    const handleSubmit = (e) => {
        // error = name === '' ? true : false
        e.preventDefault()
        dispatch(searchByName(name))
        setName('')
    }

    return (
        <form className="search-bar" onSubmit={e => handleSubmit(e)}>
            <input
                className={`search-bar__input `}
                onChange={e => handleChange(e)}
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

            {/* {
                error && <p className="search-bar__error">Please enter a valid name</p>
            } */}
        </form>
    )
}
