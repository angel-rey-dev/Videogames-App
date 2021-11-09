import "./HandleGames.scss"
import React from 'react'


export default function HandleGames({
    handleFilterBy, handleOrderBy, allGenres
}) {
    return (
        <section className="handle-games">

            <div>
                <label htmlFor="order">Sort by:</label>
                <select
                    name="order"
                    id="order"
                    defaultValue="none"
                    onChange={e => handleOrderBy(e)}
                >
                    <option value="none">Unordered</option>
                    <optgroup label="--- Alphabetical ---">
                        <option value="alph-asc">Ascendant</option>
                        <option value="alph-desc">Descendant</option>
                    </optgroup>
                    <optgroup label="------- Rating -------">
                        <option value="rat-asc">Ascendant</option>
                        <option value="rat-desc">Descendant</option>
                    </optgroup>
                </select>
            </div>

            <div>
                <label htmlFor="filter">Filter by:</label>
                <select
                    name="filter"
                    id="filter"
                    defaultValue="all"
                    onChange={e => handleFilterBy(e)}
                >
                    <option value="all">None</option>
                    <optgroup label="------- Origin -------">
                        <option value="all">All</option>
                        <option value="api">API</option>
                        <option value="user">User</option>
                    </optgroup>
                    <optgroup label="------- Genre -------">
                        <option value="all">All</option>
                        {allGenres.map(genre => <option value={genre} key={genre}>{genre}</option>)}
                    </optgroup>
                </select>
            </div>

        </section>

    )
}
