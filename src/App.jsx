import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import ContactForm from 'components/ContactForm/ContactForm';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = (name, number) => {
    contacts.some(contact => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : setContacts([
          ...contacts,
          {
            id: nanoid(),
            name: name,
            number: number,
          },
        ]);
  };

  const handleChange = evt => {
    setFilter(evt.target.value);
  };

  const handleDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const contactsFiltered = [];
  contacts.forEach(contact => {
    contact.name.toLowerCase().includes(filter.toLowerCase()) &&
      contactsFiltered.push(contact);
  });

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm formSubmitHandler={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter filter={filter} handleChange={handleChange} />
      {contactsFiltered.length !== 0 && (
        <ContactList contacts={contactsFiltered} handleDelete={handleDelete} />
      )}
    </div>
  );
}
