import React from 'react'

const Header = ({ text }) => {
    const headerStyle = {
        fontFamily: 'TitilliumWeb-Bold',
        color: 'lightseagreen',
        textShadow: '2px 2px grey',
    }

    return (
        <h1 style={headerStyle}>{text}</h1>
    )
}

export default Header