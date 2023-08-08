import React from 'react';
import css from './Contact-list.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from 'redux/contactsSlice';
import Notification from 'components/Notification/Notification';
const Contactslist = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filterValue = useSelector(state => state.contacts.filterValue);
  const dispatch = useDispatch();
  const onContactRemoving = id => {
    dispatch(removeContact(id));
  };
  const getFilteredContacts = () => {
    const normalizedFilter = filterValue.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filteredContacts = getFilteredContacts();
  return contacts.length > 0 ? (
    <ul className={css.list}>
      {filteredContacts.map(contact => (
        <li className={css.list_item} key={contact.id}>
          {contact.name}: {contact.number}
          <button
            className={css.button}
            onClick={() => onContactRemoving(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <Notification message="There is no contacts jet!"></Notification>
  );
};
export default Contactslist;
