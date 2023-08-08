import React, { useEffect } from 'react';
import css from './Contact-list.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsThunk, removeContactThunk } from 'redux/contactsSlice';
import Notification from 'components/Notification/Notification';
const Contactslist = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filterValue = useSelector(state => state.contacts.filterValue);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);
  const onContactRemoving = id => {
    dispatch(removeContactThunk(id));
  };
  const getFilteredContacts = () => {
    const normalizedFilter = filterValue.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filteredContacts = getFilteredContacts();
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && contacts.length === 0 && (
        <Notification message="Oops! Something went wrong!">
          <p>Error message: {error}</p>
        </Notification>
      )}
      {!isLoading && contacts.length > 0 && (
        <ul className={css.list}>
          {filteredContacts.map(contact => (
            <li className={css.list_item} key={contact.id}>
              <p className={css.contact_wrap}>
                <span>{contact.name}:</span>
                <span>{contact.phone}</span>
              </p>
              <button
                className={css.button}
                onClick={() => onContactRemoving(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && contacts.length === 0 && (
        <Notification message="There is no contacts jet!"></Notification>
      )}
    </div>
  );
};
export default Contactslist;
