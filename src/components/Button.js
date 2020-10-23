import React from 'react'

const Button = ({ text, handleClick }) => {
    const buttonStyle = {
        width: '200px',
        height: '30px',
        margin: 'auto',
        fontFamily: 'TitilliumWeb-Regular'
      }
    
    return (
    <button style={buttonStyle} onClick={handleClick}>{text}</button>
    )
}

export default Button