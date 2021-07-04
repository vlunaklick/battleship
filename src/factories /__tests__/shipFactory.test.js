import createShip from '../shipFactory'

test('ship one hit', () => {
    let nave1 = createShip('nave1', 4, 'vertical', 0)
    nave1.darLives(4)
    nave1.hit(30, nave1.vertical)
    expect(nave1.lives).toStrictEqual(['', '', '', 'X'])
})

test('ship sunk', () => {
    let nave1 = createShip('nave1', 4, 'vertical', 0)
    nave1.hit(0, nave1.vertical)
    nave1.hit(10, nave1.vertical)
    nave1.hit(20, nave1.vertical)
    nave1.hit(30, nave1.vertical)
    expect(nave1.isSunk()).toStrictEqual(true)
})
