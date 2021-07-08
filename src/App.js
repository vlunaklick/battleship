import HeadeR from './components/Header'
import createPlayer from './factories /playerFactory'
import './app.css'
import { useState } from 'react'
import BoardGenerator from './components/BoardGenerator'

function App() {
    let [showBoth, changeShow] = useState(false)
    let [turno, changeTurno] = useState('player')
    let [orientacion, changeOrientacion] = useState('vertical')
    let [espacios, changeEspacios] = useState(5)
    let [shipsLP, changeShipsLP] = useState(5)
    let [shipsLIA, changeShipsLIA] = useState(5)
    let [ganador, changeGanador] = useState(false)
    let [turnoParaMostrar, changeTurnoPaMos] = useState(0)
    let [hited, changeHited] = useState('water')

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
        let navesS = player.name === 'Valen' ? navesPlayer : navesIA
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
            let numero = i !== 1 ? i : 2
            let coordenadas = Math.floor(Math.random() * 100) + 1
            let direccion = Math.random() < 0.5 ? 'vertical' : 'horizontal'
            while (
                !player.board.checkPos(
                    change,
                    coordenadas - 1,
                    numero,
                    direccion
                )
            ) {
                coordenadas = Math.floor(Math.random() * 100) + 1
            }
            cambioRandom = player.board.placeShip(
                change,
                coordenadas,
                numero,
                direccion,
                nombre,
                navesS
            )
            navesS = cambioRandom[1]
        }
        updateTP(player, cambioRandom[0], navesS)
        changeEspacios(0)
    }

    const resetP = () => {
        changeTableroP(player1.board.init)
        changeNavesP({
            Carrier: {},
            Battleship: {},
            Submarine: {},
            Patroler: {},
            Peque: {},
        })
        changeEspacios(5)
        changeShipsLP(5)
        changeShipsLIA(5)
        changeShow(false)
        changeGanador(false)
        changeTurno('player')
    }

    const updateTP = (player, valor, naves) => {
        if (player.name === 'Valen') {
            changeNavesP(naves)
            changeTableroP(valor)
        } else {
            changeNavesIA(naves)
            changeTableroIA(valor)
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
        ataqueHumano(coords)
        cambiarTurno()
        setTimeout(() => {
            ataqueIA()
            cambiarTurno()
        }, 700)
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
        let numero = espacios !== 1 ? espacios : 2
        let cambioRandom
        if (
            player1.board.checkPos(
                tableroPlayer,
                coord - 1,
                numero,
                orientacion
            ) &&
            espacios !== 0
        ) {
            changeEspacios(prevState => prevState - 1)
        }
        cambioRandom = player1.board.placeShip(
            tableroPlayer,
            coord,
            numero,
            orientacion,
            nombre,
            navesPlayer
        )
        updateTP(player1, cambioRandom[0], cambioRandom[1])
    }

    const randomP = () => {
        randomMoves(player1)
    }

    const cambiarOrientacion = () => {
        changeOrientacion(prevState =>
            prevState === 'vertical' ? 'horizontal' : 'vertical'
        )
    }

    const ataqueHumano = coords => {
        let ataque1 = player1.fireShip(navesIA, tableroIA, coords)
        changeNavesIA(ataque1[0])
        if (ataque1[1]) {
            changeShipsLIA(prevState => {
                if (prevState === 1) {
                    changeTurno('Nada')
                    changeGanador(true)
                }
                return prevState - 1
            })
        }
        if (turnoParaMostrar === 0) {
            changeTurnoPaMos(prevState => prevState + 1)
        }
        if (ataque1[2] === true) {
            changeHited('ship')
        } else {
            changeHited('water')
        }
    }

    const ataqueIA = () => {
        let coordenadas = Math.floor(Math.random() * 100) + 1
        while (tableroPlayer[coordenadas - 1].isHit !== false) {
            coordenadas = Math.floor(Math.random() * 100) + 1
        }
        let ataque2 = iaplayer.fireShip(navesPlayer, tableroPlayer, coordenadas)
        changeNavesP(ataque2[0])
        if (ataque2[1]) {
            changeShipsLP(prevState => {
                if (prevState === 1) {
                    changeTurno('Nada')
                    changeGanador(true)
                }
                return prevState - 1
            })
        }
        if (ataque2[2] === true) {
            changeHited('ship')
        } else {
            changeHited('water')
        }
    }

    return (
        <>
            <div className='container'>
                {ganador ? (
                    <div className='winnerAnnouncement'>
                        <h2 className='textWinner'>
                            {shipsLP === 0 ? 'The IA wins' : 'You won!'}
                        </h2>
                        <button className='botonP' onClick={() => resetP()}>
                            Play Again
                        </button>
                    </div>
                ) : (
                    ''
                )}
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
                    espacios={espacios}
                    hayGanador={ganador}
                    puntosP={shipsLP}
                    puntosIA={shipsLIA}
                    turnoMostrar={turnoParaMostrar}
                    hiten={hited}
                />
            </div>
        </>
    )
}

export default App
