import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { Section } from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (data) => {
    const newContact = {
      id: nanoid(),
      ...data,
    };

    const isContactExists = contacts.some((contact) => contact.name === data.name);

    if (isContactExists) {
      alert(`${data.name} is already in contacts`);
    } else {
      setContacts((prevState) => [...prevState, newContact]);
    }
  };

  const deleteContact = (userId) => {
    setContacts((prevState) => prevState.filter((contact) => contact.id !== userId));
  };

  const handleChangeFilter = ({ target }) => {
    const { value } = target;
    setFilter(value);
  };

  const getFilterContacts = () => {
    const lowerCaseFilter = filter.toLowerCase();
    return contacts.filter(({ name }) => name.toLowerCase().includes(lowerCaseFilter));
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm addContact={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} handleChangeFilter={handleChangeFilter} />
        <ContactList contacts={getFilterContacts()} deleteContact={deleteContact} />
      </Section>
    </>
  );
};

export default App;