import createGameboard from './boardFactory'

const createPlayer = name => {
    let board = createGameboard()
    const fireShip = (naves, opoBoard, coords) => {
        let devuelta
        if (opoBoard[coords - 1].isHit === false) {
            devuelta = board.receiveAttack(naves, opoBoard, coords)
        }
        return devuelta
    }

    return { name, fireShip, board }
}

export default createPlayer
