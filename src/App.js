import HeadeR from './components/Header'
import createPlayer from './factories /playerFactory'
import './app.css'
import { useState } from 'react'
import BoardGenerator from './components/BoardGenerator'

function App() {
    let [showBoth, changeShow] = useState(true)

    let player1 = createPlayer('Valen')
    let iaplayer = createPlayer('IA')

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
        console.log(coordenadas + ' y ' + direccion + ' y ' + i)
        while (!iaplayer.board.checkPos(coordenadas - 1, i, direccion)) {
            coordenadas = Math.floor(Math.random() * 100) + 1
        }
        iaplayer.board.placeShip(coordenadas, i, direccion, nombre)
    }

    const changeShowF = () => {
        changeShow(!showBoth)
    }

    return (
        <>
            <div className='container'>
                <HeadeR />
                <BoardGenerator
                    player1={player1}
                    player2={iaplayer}
                    showAll={showBoth}
                    changeShowF={changeShowF}
                />
            </div>
        </>
    )
}

export default App
