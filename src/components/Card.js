import React from 'react'
import './Card.css'

const Card = ({ disabled, disableBtn, btnText, cat, handleFavoriteClick, handleImageClick }) => {
    const name = cat.breeds[0].name
    const { id, url } = cat

    const handleClick = (id, btnText) => {
        if (!disabled) {
            disableBtn(true)
            handleFavoriteClick(id, btnText)
        }
    }

    return (
        <div className="card" >
            <img src={url} alt={"image of " + name} onClick={() => handleImageClick(id)} />
            <div className="card-footer">
                <p>{name}</p>
                <button disabled={disabled} onClick={() => handleClick(id, btnText)}>{btnText}</button>
            </div>
        </div>
    )
}

export default Card