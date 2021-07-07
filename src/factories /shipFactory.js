const createShip = (name, longitud, vertical, start) => {
    let lives = []
    let inicio = start
    let nombre = name

    const darLives = valor => {
        for (let i = 0; i < valor; i++) {
            lives.push('')
        }
    }

    const hit = (pos, ori, long) => {
        let longD = [...long]
        if (ori === 'vertical') {
            longD[(pos - inicio) / 10] = 'X'
        } else {
            longD[pos - inicio] = 'X'
        }
        return longD
    }

    const isSunk = long => {
        let valC = long
        let sunk = true
        for (let i = 0; i < long.length; i++) {
            if (valC[i] !== 'X') {
                sunk = false
                break
            }
        }
        return sunk
    }

    return { nombre, vertical, hit, isSunk, lives, darLives }
}

export default createShip
