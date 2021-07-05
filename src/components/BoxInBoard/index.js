import './style.css'

export default function BoxInBoard(props) {
    let especial =
        !props.ship && !props.hit
            ? 'water'
            : props.hit && props.ship
            ? 'hitS'
            : props.hit && !props.ship
            ? 'hitN'
            : 'ship'

    let clase = `boxinboard ${especial}`

    const enviarAtaque = () => {
        props.mandarAtaque(props.id)
    }

    return (
        <div
            onClick={props.turno === 'player' ? () => enviarAtaque() : null}
            className={clase}></div>
    )
}
