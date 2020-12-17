import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Form.module.css';

function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const contact = { id: name, name, number };
    onSubmit(contact);
    resetForm();
    setName('');
    setNumber('');
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={s.label} htmlFor={name}>
        Name
        <input
          className={s.input}
          type="text"
          value={name}
          name={'name'}
          onChange={handleChange}
          id={name}
          placeholder="Enter contact name"
          required
        />
      </label>
      <label className={s.label} htmlFor={number}>
        Number
        <input
          className={s.input}
          type="tel"
          name={'number'}
          value={number}
          onChange={handleChange}
          id={number}
          placeholder="Enter contact number"
          required
        />
      </label>
      <button className={s.button} type="submit">
        Add the new contact
      </button>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
