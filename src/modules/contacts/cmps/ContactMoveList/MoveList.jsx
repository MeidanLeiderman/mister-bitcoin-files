import React from 'react'
import './MoveList.scss'

function timeConvertor(timeStamp) {
    let dateObject = new Date(timeStamp)
    let seconds = '0' + dateObject.getSeconds()
    let minutes = '0' + dateObject.getMinutes() + ''
    let hours = dateObject.getHours()
    let day = dateObject.getDate()
    let month = dateObject.getMonth() + 1
    let year = dateObject.getFullYear()
    let time = day + '.' + month + '.' + year + ' | ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return time
}

export default function MoveList({ moves, title, showMoveBy, currentRate }) {
    return (
        <section className="move-list-container">
            <h1>{title}</h1>
            <ul>
                {moves.map(move => {
                    let time = timeConvertor(move.at)
                    let value = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(1 / currentRate * move.amount)
                    return (
                        <li key={move._id} className="move-preview flex column">
                            {showMoveBy && <span>To: {move.to}</span>}
                            <span>Coins: {move.amount} | USD: {value}</span>
                            <span>When: {time}</span>
                        </li>
                    )
                })}
            </ul>
        </section>

    )
}