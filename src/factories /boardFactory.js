import createShip from './shipFactory'

const createGameboard = () => {
    const init = () => {
        let tablero = []
        for (let i = 0; i < 100; i++) {
            tablero.push({ hasShip: false, isHit: false, name: '' })
        }
        return tablero
    }

    const receiveAttack = (naves, tablero, coords) => {
        let valor = { ...naves }
        if (tablero[coords - 1].isHit === false) {
            tablero[coords - 1].isHit = true
            if (tablero[coords - 1].hasShip === true) {
                valor[tablero[coords - 1].name].lives = valor[
                    tablero[coords - 1].name
                ].hit(
                    coords - 1,
                    valor[tablero[coords - 1].name].vertical,
                    valor[tablero[coords - 1].name].lives
                )
            }
        }
        return valor
    }

    const placeShip = (tablero, coords, longitud, direc, nombre, naves) => {
        let resultado = [...tablero]
        let navesRes = { ...naves }
        if (checkPos(resultado, coords - 1, longitud, direc)) {
            navesRes[`${nombre}`] = createShip(
                nombre,
                longitud,
                direc,
                coords - 1
            )
            navesRes[`${nombre}`].darLives(longitud)
            let newC = coords - 1
            if (direc === 'vertical') {
                for (let i = 0; i < longitud; i++) {
                    resultado[newC].hasShip = true
                    resultado[newC].name = nombre
                    newC += 10
                }
            } else {
                for (let i = 0; i < longitud; i++) {
                    resultado[newC].hasShip = true
                    resultado[newC].name = nombre
                    newC += 1
                }
            }
        }
        return [resultado, navesRes]
    }

    const checkPos = (tablero, coords, longitud, direc) => {
        let testeo = [...tablero]
        let posible = true
        let checkeo = coords
        let limiteT = Math.floor((coords + 10) / 10) * 10 - 1
        if (direc === 'vertical') {
            for (let i = 0; i < longitud; i++) {
                if (checkeo <= 99 && testeo[checkeo].hasShip === false) {
                    checkeo += 10
                } else {
                    posible = false
                }
            }
        } else {
            for (let i = 0; i < longitud; i++) {
                if (
                    checkeo <= 99 &&
                    testeo[checkeo].hasShip === false &&
                    checkeo <= limiteT
                ) {
                    checkeo += 1
                } else {
                    posible = false
                }
            }
        }
        return posible
    }

    return { init, checkPos, placeShip, receiveAttack }
}

export default createGameboard
