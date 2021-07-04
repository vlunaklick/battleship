const createShip = (nombre, longitud, vertical, start) => {
    let lives = []
    let inicio = start
    let long = longitud

    const darLives = valor => {
        for (let i = 0; i < valor; i++) {
            lives.push('')
        }
    }

    const hit = (pos, vertical) => {
        if (vertical === 'vertical') {
            lives[(pos - inicio) / 10] = 'X'
        } else {
            lives[pos - inicio] = 'X'
        }
    }

    const isSunk = () => {
        let sunk = true
        for (let i = 0; i < long; i++) {
            if (lives[i] !== 'X') {
                sunk = false
                break
            }
        }
        return sunk
    }

    return { nombre, vertical, hit, isSunk, lives, darLives }
}

export default createShip
