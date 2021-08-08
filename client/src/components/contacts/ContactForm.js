import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

export default function ContactForm() {
  const { addContact, current, clearCurrentContact, updateContact } =
    useContext(ContactContext);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({ name: '', email: '', phone: '', type: 'personal' });
    }
  }, [current]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      addContact(contact);
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    } else {
      updateContact(contact);
    }
  };

  const clearAll = () => {
    clearCurrentContact();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='text-primary'>
        {current === null ? 'Add Contact' : 'Edit Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={handleChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={handleChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        placeholder='Type'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={handleChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        placeholder='Type'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={handleChange}
      />{' '}
      Professinal{' '}
      <div>
        <input
          type='submit'
          value={current === null ? 'Add Contact' : 'Update Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current !== null ? (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      ) : (
        ''
      )}
    </form>
  );
}
