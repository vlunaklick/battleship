import BoardDisplay from './components/BoardDisplay'
import createPlayer from './factories /playerFactory'

function App() {
    let player1 = createPlayer('Valen')

    player1.board.placeShip(50, 4, 'vertical', 'Patrol')
    return <BoardDisplay enemy={false} board={player1.board.tablero} />
}

export default App
