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
                        atacar={true}
                        mandarAtaque={props.mandarAtaque}
                        ponerShip={props.ponerShip}
                    />
                </>
            ) : (
                <div className='boardP'>
                    <BoardDisplay
                        enemy={false}
                        board={props.player1}
                        atacar={false}
                        ponerShip={props.ponerShip}
                        mandarAtaque={props.mandarAtaque}
                    />
                    <div className='botonesT'>
                        <button
                            className='botonP'
                            onClick={() => props.randomP()}>
                            Random
                        </button>
                        <button
                            className='botonP'
                            onClick={() => props.cambiarOri()}>
                            {props.orientacion}
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
