import './style.css'

export default function BoxInBoard(props) {
    let especial =
        !props.ship && !props.hit
            ? 'water'
            : props.hit && props.ship
            ? 'hitS'
            : props.hit && props.shipM
            ? 'hitS'
            : props.hit && !props.ship
            ? 'hitN'
            : 'ship'

    let clase = `boxinboard ${especial}`

    const enviarAtaque = () => {
        if (props.atacar === 'atacar') {
            if (props.turno === 'player') props.mandarAtaque(props.id)
        } else if (props.atacar === 'poner') {
            props.ponerShip(props.id)
        }
    }

    return <div onClick={() => enviarAtaque()} className={clase}></div>
}
