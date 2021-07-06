import HeadeR from './components/Header'
import createPlayer from './factories /playerFactory'
import './app.css'
import { useState } from 'react'
import BoardGenerator from './components/BoardGenerator'

function App() {
    let [showBoth, changeShow] = useState(false)
    let [turno, changeTurno] = useState('player')
    let [orientacion, changeOrientacion] = useState('vertical')
    let [espacios, changeEspacios] = useState('5')

    let player1 = createPlayer('Valen')
    let iaplayer = createPlayer('IA')

    let [tableroPlayer, changeTableroP] = useState(player1.board.init)
    let [tableroIA, changeTableroIA] = useState(iaplayer.board.init)

    let [navesPlayer, changeNavesP] = useState({
        Carrier: {},
        Battleship: {},
        Submarine: {},
        Patroler: {},
        Peque: {},
    })
    let [navesIA, changeNavesIA] = useState({
        Carrier: {},
        Battleship: {},
        Submarine: {},
        Patroler: {},
        Peque: {},
    })

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
            let navesS = player.name === 'Valen' ? navesPlayer : navesIA
            cambioRandom = player.board.placeShip(
                change,
                coordenadas,
                i,
                direccion,
                nombre,
                navesS
            )
            navesS = cambioRandom[1]
        }
        updateTP(player, cambioRandom[0], cambioRandom[1])
        changeEspacios(0)
    }

    const resetP = () => {
        changeTableroP(player1.board.init)
        changeNavesP({
            Carrier: {},
            Battleship: {},
            Submarine: {},
            Peque: {},
        })
        changeEspacios(5)
    }

    const updateTP = (player, valor, naves) => {
        if (player.name === 'Valen') {
            changeTableroP(valor)
            changeNavesP(naves)
        } else {
            changeTableroIA(valor)
            changeNavesIA(naves)
        }
    }

    const changeShowF = () => {
        if (espacios === 0) {
            randomMoves(iaplayer)
            changeShow(!showBoth)
        }
    }

    const cambiarTurno = () => {
        changeTurno(prevState => (prevState === 'player' ? 'ia' : 'player'))
    }

    const sendAttack = coords => {
        if (turno === 'player') {
            iaplayer.board.receiveAttack(navesIA, tableroIA, coords)
        }
        cambiarTurno()
        let coordenadas = Math.floor(Math.random() * 100) + 1
        while (tableroPlayer[coordenadas].isHit === true) {
            coordenadas = Math.floor(Math.random() * 100) + 1
        }
        iaplayer.board.receiveAttack(navesPlayer, tableroPlayer, coordenadas)
        cambiarTurno()
    }

    const ponerShip = coord => {
        let nombre =
            espacios === 5
                ? 'Carrier'
                : espacios === 4
                ? 'Battleship'
                : espacios === 3
                ? 'Submarine'
                : espacios === 2
                ? 'Patroler'
                : 'Peque'
        let cambioRandom
        if (
            player1.board.checkPos(
                tableroPlayer,
                coord - 1,
                espacios,
                orientacion
            )
        ) {
            changeEspacios(prevState => prevState - 1)
        }
        cambioRandom = player1.board.placeShip(
            tableroPlayer,
            coord,
            espacios,
            orientacion,
            nombre,
            navesPlayer
        )
        updateTP(player1, cambioRandom[0], cambioRandom[1])
    }

    const randomP = () => {
        randomMoves(player1, tableroPlayer)
    }

    const cambiarOrientacion = () => {
        changeOrientacion(prevState =>
            prevState === 'vertical' ? 'horizontal' : 'vertical'
        )
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
                    orientacion={orientacion}
                    cambiarOri={cambiarOrientacion}
                    ponerShip={ponerShip}
                />
            </div>
        </>
    )
}

export default App
