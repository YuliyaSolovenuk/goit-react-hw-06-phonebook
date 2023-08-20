import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { onFiltredContacts } from 'redux/filterSlice';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { value } = e.target;

    dispatch(onFiltredContacts(value));
  };

  return (
    <label className={css.filterLabel}>
      Find contacts by name
      <input
        className={css.filterInput}
        type="text"
        name="filter"
        value={filter}
        onChange={handleChange}
        placeholder="Search contacts"
      />
    </label>
  );
};
