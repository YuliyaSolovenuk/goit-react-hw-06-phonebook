import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { selectContacts, selectFilter } from 'redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filters = useSelector(selectFilter);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(({name}) => 
    name.toLowerCase().includes(filters.toLowerCase())
  );

  return (
    <ul>
      {filteredContacts.map(contact => {
        return (
          <li key={contact.id} className={css.contactItem}>
            {contact.name}:&nbsp;<span>{contact.number}</span>
            <button
              className={css.deleteButton}
              type="button"
              onClick={() => dispatch(deleteContact(contact.id))}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
