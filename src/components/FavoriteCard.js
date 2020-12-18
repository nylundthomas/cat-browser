import React from 'react'
import './FavoriteCard.css'

const FavoriteCard = ({ disabled, disableBtn, favorite, handleFavoriteClick }) => {
    const { id, url } = favorite.image
    
    const handleClick = (id, btnText) => {

        if (!disabled) {
            disableBtn(true)
            handleFavoriteClick(id, btnText)
        }
    }

    return (
    <div className="favoriteCard" >
        <img className="favoriteCardImg" src={url} alt={"image of cat with id:" + id}/>
        <div className="cardFooter">
        <p>Image ID: {id}</p>
        <button disabled={disabled} onClick={() => handleClick(id, 'Unfavorite')}>Unfavorite</button>
        </div>
    </div>
    )
}

export default FavoriteCard