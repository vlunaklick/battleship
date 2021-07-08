import React from 'react'
import BoardDisplay from '../BoardDisplay'
import TextTopP from '../TextTopP/TextTopP'
import './style.css'

export default function BoardGenerator(props) {
    return (
        <div className='boardsCont'>
            {props.showAll ? (
                <div className='containerALL'>
                    <div className='textingGame'>
                        {props.turnoMostrar === 0 ? (
                            <div>
                                <h2 className='textW'>Your turn</h2>
                            </div>
                        ) : (
                            <div>
                                <h2 className='textW'>
                                    {props.turno === 'player' ? 'IA ' : 'You '}
                                    shot and hit {props.hiten}.
                                </h2>
                            </div>
                        )}
                    </div>
                    <div className='containerWP'>
                        <BoardDisplay
                            enemy={false}
                            board={props.player1}
                            atacar={'nada'}
                            mandarAtaque={props.mandarAtaque}
                            ponerShip={props.ponerShip}
                            select='Your'
                        />
                        <BoardDisplay
                            enemy={true}
                            board={props.player2}
                            turno={props.turno}
                            atacar={'atacar'}
                            mandarAtaque={props.mandarAtaque}
                            ponerShip={props.ponerShip}
                            select='IA'
                        />
                    </div>
                    <button className='botonP' onClick={() => props.resetear()}>
                        Play Again
                    </button>
                </div>
            ) : (
                <div className='containerWP'>
                    <div className='placed'>
                        <TextTopP placing={props.espacios} />
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
                            <button
                                className='botonP'
                                onClick={() => props.iniciar()}>
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
