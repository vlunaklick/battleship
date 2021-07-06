import './style.css'
import BoxInBoard from '../BoxInBoard/index'
import uniqid from 'uniqid'

function BoardDisplay(props) {
    let accion = props.atacar ? props.mandarAtaque : props.ponerShip
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
                accion={accion}
                atacar={props.atacar}
            />
        )
    })
    return <div className='userBoard'>{cajas}</div>
}

export default BoardDisplay
