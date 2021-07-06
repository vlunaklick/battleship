import createGameboard from './boardFactory'

const createPlayer = name => {
    let board = createGameboard()
    const fireShip = (coords, opoBoard) => {
        if (opoBoard[coords - 1].isHit === false) {
            opoBoard.receiveAttack(coords)
        }
    }

    return { name, fireShip, board }
}

export default createPlayer
