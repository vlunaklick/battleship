import './style.css'
import BoxInBoard from '../BoxInBoard/index'

function BoardDisplay(props) {
    let cajas = props.board.map(function (item) {
        return (
            <BoxInBoard
                ship={props.enemy ? '' : item.hasShip}
                hit={item.isHit}
            />
        )
    })
    return <div className='userBoard'>{cajas}</div>
}

export default BoardDisplay