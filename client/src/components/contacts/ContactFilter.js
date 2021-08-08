import React, { useContext, useState } from 'react';
import ContactContext from '../../context/contact/ContactContext';

export default function ContactFilter() {
  const { filteredContact, contacts } = useContext(ContactContext);

  const [filter, setFilter] = useState('');

  const handleChange = (e) => {
    setFilter(e.target.value);
    filteredContact(e.target.value);
  };

  return (
    <form>
      {contacts.length !== 0 ? (
        <input
          placeholder='Filter Contacts ...'
          onChange={handleChange}
          type='text'
        />
      ) : (
        ''
      )}
    </form>
  );
}
