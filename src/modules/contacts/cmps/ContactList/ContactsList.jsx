import React from 'react';
import ContactPreview from '../ContactPreview/ContactPreview'
import '../ContactList/ContactList.scss'

import {Link} from 'react-router-dom'


export default function (props){
    let {contacts} = props

    return (
        <ul className="contact-list">
            {contacts.map(contact=>{
                return (
                    <Link to={`/contact/${contact._id}`} key={contact._id}>
                        <ContactPreview contact={contact} />
                    </Link>
                )
            })}
        </ul>
    )
}