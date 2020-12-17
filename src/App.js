import React, { useState, useEffect } from 'react';
import ContactsList from './Components/ContactsList/ContactsList';
import Form from './Components/Form/Form';
import Filter from './Components/Filter/Filter';
import s from './App.module.css';
import Section from './Components/Section/Section';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  const deleteContact = contactId => {
    setContacts(prevContacts => [
      ...prevContacts.filter(({ id }) => id !== contactId),
    ]);
  };

  const existNameHandler = existName => {
    const nameHandler = existName.toLowerCase();
    return contacts.find(({ name }) => name.toLowerCase() === nameHandler);
  };

  const addContact = data => {
    const { name } = data;
    existNameHandler(name)
      ? alert(`${name} is already in exist`)
      : setContacts(prevContacts => [data, ...prevContacts]);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const totalContactsCount = contacts.length;

  const filterContactsByName = () => {
    const normalizedContact = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedContact),
    );
  };

  const filteredContacts = filterContactsByName();

  return (
    <div className={s.container}>
      <Section title="Phonebook">
        <Form onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        <div className={s.wrap}>
          <p className={s.number}>Number of contacts: {totalContactsCount}</p>
        </div>
        <ContactsList
          contacts={filteredContacts}
          deleteContact={deleteContact}
        />
      </Section>
    </div>
  );
}

export default App;
