import React from 'react'
import './Card.css'

const Card = ({btnText, cat, favorites, handleFavoriteClick, handleImageClick }) => {
    const name = cat.breeds[0] ? cat.breeds[0].name : 'unknown'
    const { id, url } = cat

    const handleClick = (id, btnText) => {
        handleFavoriteClick(id, btnText)
    }

    return (
        <div className="card" >
            <img src={url} alt={"image of " + name} onClick={() => handleImageClick(id)} />
            <div className="card-footer">
                <p>{name}</p>
                <button onClick={() => handleClick(id, btnText)}>{btnText}</button>
            </div>
        </div>
    )
}

export default Card