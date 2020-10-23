import React from 'react'
import './FavoriteCard.css'

const FavoriteCard = ({ favorite, handleFavoriteClick }) => {
    const { id, url } = favorite.image
    
    return (
    <div className="favoriteCard" >
        <img className="favoriteCardImg" src={url} alt={"image of cat with id:" + id}/>
        <div className="cardFooter">
        <p>Image ID: {id}</p>
        <button onClick={() => handleFavoriteClick(id, 'Unfavorite')}>Unfavorite</button>
        </div>
    </div>
    )
}

export default FavoriteCard