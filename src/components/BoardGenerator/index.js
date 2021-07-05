import React from 'react'
import BoardDisplay from '../BoardDisplay'
import './style.css'

export default function BoardGenerator(props) {
    return (
        <div className='boardsCont'>
            {props.showAll ? (
                <>
                    <BoardDisplay enemy={false} board={props.player1} />
                    <BoardDisplay
                        enemy={false}
                        board={props.player2}
                        turno={props.turno}
                        mandarAtaque={props.mandarAtaque}
                    />
                </>
            ) : (
                <div className='boardP'>
                    <BoardDisplay enemy={false} board={props.player1} />
                    <div className='botonesT'>
                        <button
                            className='botonP'
                            onClick={() => props.randomP()}>
                            Random
                        </button>
                        <button
                            className='botonP'
                            onClick={() => props.resetear()}>
                            Reset
                        </button>
                    </div>
                    <button className='botonP' onClick={() => props.iniciar()}>
                        Accept
                    </button>
                </div>
            )}
        </div>
    )
}
