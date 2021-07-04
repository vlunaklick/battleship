import createShip from './shipFactory'

const createGameboard = () => {
    let tablero = []

    for (let i = 0; i < 100; i++) {
        tablero.push({ hasShip: false, isHit: false, name: '' })
    }

    let naves = {}

    const receiveAttack = coords => {
        if (!tablero[coords - 1].isHit) {
            tablero[coords - 1].isHit = true
            if (tablero[coords - 1].hasShip) {
                naves[tablero[coords - 1].name].hit(
                    coords - 1,
                    naves[tablero[coords - 1].name].vertical
                )
            }
        }
    }

    const placeShip = (coords, longitud, direc, nombre) => {
        if (checkPos(coords - 1, longitud, direc)) {
            naves[nombre] = createShip(nombre, longitud, direc, coords - 1)
            naves[nombre].darLives(longitud)
            let newC = coords - 1
            if (direc === 'vertical') {
                for (let i = 0; i < longitud; i++) {
                    tablero[newC].hasShip = true
                    tablero[newC].name = naves[nombre].nombre
                    newC += 10
                }
            } else {
                for (let i = 0; i < longitud; i++) {
                    tablero[newC].hasShip = true
                    tablero[newC].name = naves[nombre].nombre
                    newC += 1
                }
            }
        }
    }

    const checkPos = (coords, longitud, direc) => {
        let posible = true
        let checkeo = coords
        if (direc === 'vertical') {
            for (let i = 0; i < longitud; i++) {
                if (checkeo <= 99 && tablero[checkeo].hasShip === false) {
                    checkeo += 10
                } else {
                    posible = false
                    break
                }
            }
        } else {
            for (let i = 0; i < longitud; i++) {
                if (checkeo <= 99 && tablero[checkeo].hasShip === false) {
                    checkeo += 1
                } else {
                    posible = false
                    break
                }
            }
        }
        return posible
    }

    return { tablero, checkPos, placeShip, receiveAttack, naves }
}

export default createGameboard
