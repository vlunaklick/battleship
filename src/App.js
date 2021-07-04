import HeadeR from './components/Header'
import createPlayer from './factories /playerFactory'
import './app.css'
import { useState } from 'react'
import BoardGenerator from './components/BoardGenerator'

function App() {
    let [showBoth, changeShow] = useState(false)

    let player1 = createPlayer('Valen')
    let iaplayer = createPlayer('IA')

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
