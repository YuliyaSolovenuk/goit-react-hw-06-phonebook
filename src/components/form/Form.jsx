import Notiflix from 'notiflix';
import css from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { selectContacts } from 'redux/selectors';
import { useState } from 'react';

Notiflix.Notify.init({
  width: '320px',
  position: 'center-top',
  cssAnimationStyle: 'zoom',
});

export function Form() {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    const name = evt.currentTarget.elements.name.value.trim();
    const number = evt.currentTarget.elements.number.value.trim();

    const isIncludeName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    const isIncludeNumber = contacts.find(contact => contact.number === number);

    if (isIncludeName) {
      Notiflix.Notify.warning(`${name} is already in contacts`);
      return;
    }

    if (isIncludeNumber) {
      Notiflix.Notify.warning(`${number} is already in contacts`);
      return;
    }

    const contact = {
      name,
      number,
    };

    dispatch(addContact(contact));
    setName('');
    setNumber('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.formCover}>
        <label className={css.formLabel}>
          Name
          <input
            className={css.formInput}
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.formLabel}>
          Number
          <input
            className={css.formInput}
            type="tel"
            name="number"
            value={number}
            onChange={e => setNumber(e.target.value)}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button
          className={css.formBtn}
          type="submit"
          disabled={!name || !number}
        >
          Add contact
        </button>
      </form>
    </div>
  );
}
