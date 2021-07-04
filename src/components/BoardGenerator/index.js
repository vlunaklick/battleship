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
                        board={props.player1.board.tablero}
                    />
                    <BoardDisplay
                        enemy={true}
                        board={props.player2.board.tablero}
                    />
                </>
            ) : (
                <BoardDisplay
                    enemy={false}
                    board={props.player1.board.tablero}
                />
            )}
        </div>
    )
}
