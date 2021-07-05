import createShip from './shipFactory'

const createGameboard = () => {
    const init = () => {
        let tablero = []
        for (let i = 0; i < 100; i++) {
            tablero.push({ hasShip: false, isHit: false, name: '' })
        }
        return tablero
    }

    const receiveAttack = (tablero, coords) => {
        if (!tablero[coords - 1].isHit) {
            tablero[coords - 1].isHit = true
            if (tablero[coords - 1].hasShip) {
                naves[tablero[coords - 1].name].hit(
                    coords - 1,
                    naves[tablero[coords - 1].name].vertical
                )
                // naves[tablero[coords - 1].name].isSunk()
            }
        }
    }

    let naves = {}

    const placeShip = (tablero, coords, longitud, direc, nombre) => {
        let resultado = [...tablero]
        if (checkPos(resultado, coords - 1, longitud, direc)) {
            naves[nombre] = createShip(nombre, longitud, direc, coords - 1)
            naves[nombre].darLives(longitud)
            let newC = coords - 1
            if (direc === 'vertical') {
                for (let i = 0; i < longitud; i++) {
                    resultado[newC].hasShip = true
                    resultado[newC].name = naves[nombre].nombre
                    newC += 10
                }
            } else {
                for (let i = 0; i < longitud; i++) {
                    resultado[newC].hasShip = true
                    resultado[newC].name = naves[nombre].nombre
                    newC += 1
                }
            }
        }
        return resultado
    }

    const checkPos = (tablero, coords, longitud, direc) => {
        let posible = true
        let checkeo = coords
        let limiteT = Math.floor((coords + 10) / 10) * 10 - 1
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
                if (
                    checkeo <= 99 &&
                    tablero[checkeo].hasShip === false &&
                    checkeo <= limiteT
                ) {
                    checkeo += 1
                } else {
                    posible = false
                    break
                }
            }
        }
        return posible
    }

    return { init, checkPos, placeShip, receiveAttack, naves }
}

export default createGameboard
