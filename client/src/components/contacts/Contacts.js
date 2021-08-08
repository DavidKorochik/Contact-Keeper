import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';

export default function Contacts() {
  const { contacts, filtered, getContact } = useContext(ContactContext);

  useEffect(() => {
    getContact();

    // eslint-disable-next-line
  }, []);

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
          ))
        : contacts.map((contact) => (
            <TransitionGroup>
              <CSSTransition timeout={500} classNames='item' key={contact._id}>
                <ContactItem contact={contact} />
              </CSSTransition>
            </TransitionGroup>
          ))}
    </Fragment>
  );
}
