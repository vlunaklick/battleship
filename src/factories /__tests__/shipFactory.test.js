import createShip from '../shipFactory'

test('ship one hit', () => {
    let nave1 = createShip('nave1', 4, 'vertical', 0)
    nave1.darLives(4)
    nave1.hit(30, nave1.vertical)
    expect(nave1.lives).toStrictEqual(['', '', '', 'X'])
})

test('ship sunk', () => {
    let nave1 = createShip('nave1', 4, 'vertical', 0)

    nave1.hit(1)
    nave1.hit(2)
    nave1.hit(3)
    nave1.hit(4)
    expect(nave1.isSunk()).toStrictEqual(true)
})
