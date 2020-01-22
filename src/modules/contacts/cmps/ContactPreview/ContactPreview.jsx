import React from 'react';
import './ContactPreview.scss'
export default function ContactPreview({ contact }) {
  return (
    <li className="contact-prev pad20">
      <img src={`https://robohash.org/${contact._id}.png?set=set3`} alt="" />
      <div className="contact-info">
        <h5>{contact.name}</h5>
        <h5>{contact.phone}</h5>
      </div>
    </li>
  );
}
