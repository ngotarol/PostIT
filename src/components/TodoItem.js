import React from 'react'

export function TodoItem(props) {
    const onButtonPress = () => {
        props.eliminarCallback(props.id)
    }

    return (
        <li className={props.important?'bg-danger text-white':'bg-secondary'}>
            <h4>{props.titulo}</h4>    
            <h5 className='text-justify'>{props.detalle}</h5>
            <button className="offset-10 btn btn-warning btn-sm" onClick={onButtonPress}>Eliminar</button>
        </li>)
}
