const createShip = (nombre, longitud, vertical) => {
    let lives = []
    let long = longitud

    for (let i = 0; i < longitud; i++) {
        lives.push('')
    }

    const hit = pos => {
        lives[pos - 1] = 'X'
        long = long - 1
    }

    const isSunk = () => {
        if (long === 0) {
            return true
        }
        return false
    }

    return { nombre, vertical, hit, isSunk, lives }
}

export default createShip
