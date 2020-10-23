import React, { useState, useEffect } from 'react'
import './Card.css'

const Card = ({ cat, favorites, handleFavoriteClick, handleImageClick }) => {
    const [btnText, setText] = useState('')
    const name = cat.breeds[0] ? cat.breeds[0].name : 'unknown'
    const { id, url } = cat

    useEffect(() => {
        favorites.find(f => f.image_id === id ? setText('Unfavorite') : setText('Favorite'))
    }, [favorites, id])

    const handleClick = (id, btnText) => {
        handleFavoriteClick(id, btnText)
        btnText === 'Favorite' ? setText('Unfavorite') : setText('Favorite')
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