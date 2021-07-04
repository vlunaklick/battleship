const createShip = (nombre, longitud, vertical, start) => {
    let lives = []
    let long = longitud
    let inicio = start

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

        long -= 1
    }

    const isSunk = () => {
        if (long === 0) {
            return true
        }
        return false
    }

    return { nombre, vertical, hit, isSunk, lives, darLives }
}

export default createShip
