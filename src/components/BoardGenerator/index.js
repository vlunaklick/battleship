import React from 'react'
import BoardDisplay from '../BoardDisplay'
import './style.css'

export default function BoardGenerator(props) {
    return (
        <div className='boardsCont'>
            {props.showAll ? (
                <>
                    <BoardDisplay
                        enemy={false}
                        board={props.player1}
                        atacar={'nada'}
                        mandarAtaque={props.mandarAtaque}
                        ponerShip={props.ponerShip}
                    />
                    <BoardDisplay
                        enemy={false}
                        board={props.player2}
                        turno={props.turno}
                        atacar={'atacar'}
                        mandarAtaque={props.mandarAtaque}
                        ponerShip={props.ponerShip}
                    />
                </>
            ) : (
                <div className='boardP'>
                    <BoardDisplay
                        enemy={false}
                        board={props.player1}
                        atacar={'poner'}
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
