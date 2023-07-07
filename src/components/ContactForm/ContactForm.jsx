
import React, { useState } from 'react';
import { Form, Input, Label, Button } from './ContactForm.module';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
  
    addContact({ name, number });
  
    setName('');
    setNumber('');
  };  
    
    return(
        <Form onSubmit={handleSubmit} autoComplete="off">
        <Label>
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder="Enter name"
            value={name}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="Enter number"
            value={number}
            onChange={handleChange}
          />
        </Label>
        <Button type="submit" disabled={!name || !number}>
          Add contact
        </Button>
      </Form>
    )
    }
    export default ContactForm;