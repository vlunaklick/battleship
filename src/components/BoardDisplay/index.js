import './style.css'
import BoxInBoard from '../BoxInBoard/index'
import uniqid from 'uniqid'

function BoardDisplay(props) {
    let id = 0
    let cajas = props.board.map(function (item) {
        id += 1
        return (
            <BoxInBoard
                key={uniqid()}
                id={id}
                ship={props.enemy ? '' : item.hasShip}
                hit={item.isHit}
                turno={props.turno}
                mandarAtaque={props.mandarAtaque}
            />
        )
    })
    return <div className='userBoard'>{cajas}</div>
}

export default BoardDisplay
