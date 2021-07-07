import './style.css'

export default function BoxInBoard(props) {
    let especial =
        !props.ship && !props.hit
            ? 'water'
            : props.ship && props.hit
            ? 'hitS'
            : props.ship && props.enemy && !props.hit
            ? 'water'
            : props.ship && !props.enemy && !props.hit
            ? 'ship'
            : 'hitN'

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
