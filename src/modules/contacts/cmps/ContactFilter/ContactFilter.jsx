import React from 'react';
import './ContactFilter.scss'
export default function ContactFilter({ handleFilter }) {
    return (
        <section className="filter-container container2 pad20">
            <input type="text" onChange={(ev) => handleFilter(ev.target.value)} placeholder="search by keyword"></input>
        </section>
    )
}


