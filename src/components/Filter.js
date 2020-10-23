import React from 'react'
import Select from 'react-select'

const Filter = ({ breeds, handleClick }) => {
    const filterStyle = {
        border: '3px solid lightseagreen', 
        width: '25%',
        margin: '5px 0px',
    }

    return (
        <div style={filterStyle}>
            <Select placeholder={'Filter by breeds...'} options={breeds} onChange={handleClick} />
        </div>
    )
}

export default Filter