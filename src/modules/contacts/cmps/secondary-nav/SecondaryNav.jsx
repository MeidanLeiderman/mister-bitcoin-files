import React from 'react';
import { Link } from 'react-router-dom'

import './SecondaryNav.scss'
export default function SecondaryNav({history, id}) {
    return (
        <div className="secondary-nav pad20">
            <span onClick={() => history.goBack()} className="flat-btn">Back</span>
            <Link to={`/contact/edit/${id}`} className="flat-btn">Edit</Link>
        </div>
    )
}