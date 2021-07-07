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
                enemy={props.enemy}
                ship={item.hasShip}
                hit={item.isHit}
                turno={props.turno}
                atacar={props.atacar}
                mandarAtaque={props.mandarAtaque}
                ponerShip={props.ponerShip}
            />
        )
    })
    return (
        <div className='agruparBoard'>
            <div className='userBoard'>{cajas}</div>
            {props.select === 'IA' || props.select === 'Your' ? (
                <div className='textB'>
                    <h3 className='tB'>{props.select} Board</h3>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export default BoardDisplay
