import createGameboard from '../gameboard'

test('can place a ship in a bad position horizontal', () => {
    const persona = createGameboard()
    expect(persona.checkPos(98, 3, 'horizontal')).toBe(false)
})

test('can place a ship in a good position horizontal', () => {
    const persona = createGameboard()
    expect(persona.checkPos(98, 2, 'horizontal')).toBe(true)
})

test('can place a ship in a bad position vertical', () => {
    const persona = createGameboard()
    expect(persona.checkPos(98, 3, 'vertical')).toBe(false)
})

test('can place a ship in a good position vertical', () => {
    const persona = createGameboard()
    expect(persona.checkPos(50, 5, 'vertical')).toBe(true)
})

// creating ship

const newGame = createGameboard()
newGame.placeShip(50, 5, 'vertical', 'Patrol')

test('create first ship', () => {
    expect(newGame.tablero[59]).toStrictEqual({
        hasShip: true,
        isHit: false,
        name: 'Patrol',
    })
})

test('hit the ship', () => {
    newGame.receiveAttack(70)
    expect(newGame.tablero[69]).toStrictEqual({
        hasShip: true,
        isHit: true,
        name: 'Patrol',
    })
    expect(newGame.naves['Patrol'].lives).toStrictEqual(['', '', 'X', '', ''])
})

newGame.placeShip(51, 3, 'horizontal', 'Triller')

test('horizontal ship', () => {
    expect(newGame.tablero[50]).toStrictEqual({
        hasShip: true,
        isHit: false,
        name: 'Triller',
    })
})
