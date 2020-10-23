import React, { useState, useEffect } from 'react'
import './PopUp.css'

const PopUp = ({ favorites, popUp, handleCloseClick, handleFavoriteClick }) => {
    const { id, url, name, life_span, description, origin, intelligence, affection_level, child_friendly, dog_friendly } = popUp
    const [btnText, setText] = useState('')

    useEffect(() => {
        favorites.find(f => f.image_id === id ? setText('Unfavorite') : setText('Favorite'))
    }, [favorites, id])

    const handleClick = (id, btnText) => {
        handleFavoriteClick(id, btnText)
        btnText === 'Favorite' ? setText('Unfavorite') : setText('Favorite')
    }


    return (
        <div className="modal">
            <div className="modal_content">
                <div className="close">
                    <span onClick={handleCloseClick}>X</span>
                </div>
                <div>
                    <img className="popUp_img" src={url} alt={"large image of" + name} />
                </div>
                <div className="info">
                    <button onClick={() => handleClick(id, btnText)}>{btnText}</button>
                    <h4>Breed Information</h4>
                    <p><span className="bolder">ID:</span> {id}</p>
                    <p><span className="bolder">Name:</span> {name}</p>
                    <p><span className="bolder">Origin:</span> {origin}</p>
                    <p><span className="bolder">Life span:</span> {life_span}</p>
                    <p><span className="bolder">Intelligence:</span> {intelligence}</p>
                    <p><span className="bolder">Affection level:</span> {affection_level}</p>
                    <p><span className="bolder">Child friendliness:</span> {child_friendly}</p>
                    <p><span className="bolder">Dog friendliness:</span> {dog_friendly}</p>
                    <p><span className="bolder">Description:</span> {description}</p>
                </div>
            </div>
        </div>
    )
}

export default PopUp