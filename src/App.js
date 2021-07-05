import HeadeR from './components/Header'
import createPlayer from './factories /playerFactory'
import './app.css'
import { useState } from 'react'
import BoardGenerator from './components/BoardGenerator'

function App() {
    let [showBoth, changeShow] = useState(false)
    let [turno, changeTurno] = useState('player')

    let player1 = createPlayer('Valen')
    let iaplayer = createPlayer('IA')

    let [tableroPlayer, changeTableroP] = useState(player1.board.init)
    let [tableroIA, changeTableroIA] = useState(iaplayer.board.init)

    const randomMoves = player => {
        let change = player.board.init()
        let cambioRandom
        for (let i = 5; i > 0; i--) {
            let nombre =
                i === 5
                    ? 'Carrier'
                    : i === 4
                    ? 'Battleship'
                    : i === 3
                    ? 'Submarine'
                    : i === 2
                    ? 'Patroler'
                    : 'Peque'
            let coordenadas = Math.floor(Math.random() * 100) + 1
            let direccion = Math.random() < 0.5 ? 'vertical' : 'horizontal'
            while (
                !player.board.checkPos(change, coordenadas - 1, i, direccion)
            ) {
                coordenadas = Math.floor(Math.random() * 100) + 1
            }
            cambioRandom = player.board.placeShip(
                change,
                coordenadas,
                i,
                direccion,
                nombre
            )
        }
        updateTP(player, cambioRandom)
    }

    const resetP = () => {
        changeTableroP(player1.board.init)
    }

    const updateTP = (player, valor) => {
        if (player.name === 'Valen') {
            changeTableroP(valor)
        } else {
            changeTableroIA(valor)
        }
    }

    const changeShowF = () => {
        randomMoves(iaplayer)
        changeShow(!showBoth)
    }

    const cambiarTurno = () => {
        changeTurno(prevState => (prevState === 'player' ? 'ia' : 'player'))
    }

    const sendAttack = coords => {
        if (turno === 'player') {
            iaplayer.board.receiveAttack(coords)
        }
        cambiarTurno()
    }

    const randomP = () => {
        randomMoves(player1, tableroPlayer)
    }

    return (
        <>
            <div className='container'>
                <HeadeR />
                <BoardGenerator
                    player1={tableroPlayer}
                    player2={tableroIA}
                    showAll={showBoth}
                    turno={turno}
                    mandarAtaque={sendAttack}
                    iniciar={changeShowF}
                    randomP={randomP}
                    resetear={resetP}
                />
            </div>
        </>
    )
}

export default App
