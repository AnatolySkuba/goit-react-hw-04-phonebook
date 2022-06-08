import ContactItem from 'components/ContactItem/ContactItem';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';

export default function ContactList({ contacts, handleDelete }) {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li className={s.li} key={id}>
          <ContactItem
            id={id}
            name={name}
            number={number}
            handleDelete={handleDelete}
          />
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  handleDelete: PropTypes.func.isRequired,
};
