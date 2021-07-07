import React from 'react'
import './style.css'

export default function TextTopP(props) {
    let valor = props.placing !== 1 ? props.placing : 2
    let nombre =
        valor === 5
            ? 'Carrier'
            : valor === 4
            ? 'Battleship'
            : valor === 3
            ? 'Submarine'
            : valor === 2
            ? 'Patroler'
            : 'Peque'
    return (
        <div className='titlePlace'>
            <h1 className='titPlace'>
                {props.placing !== 0
                    ? `You have to place a ${nombre} (${valor} places)`
                    : 'You can start the game now'}
            </h1>
        </div>
    )
}
