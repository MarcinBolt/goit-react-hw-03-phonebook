import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import capitalizeEachWord from 'utils/capitalizeEachWord';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  handleSubmit = e => {
    e.preventDefault();

    const { contacts, addContactToState } = this.props;
    const formDOM = e.currentTarget;
    const newContactId = nanoid();
    const newContactName = capitalizeEachWord(formDOM.elements.name.value);
    const newContactNumber = formDOM.elements.number.value;

    const newContact = {
      id: newContactId,
      name: newContactName,
      number: newContactNumber,
    };

    contacts.find(c => c.name.toLowerCase() === newContact.name.toLowerCase())
      ? window.alert(`${newContact.name} is already in contacts.`)
      : addContactToState(newContact);
    
    formDOM.reset();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.contactForm}>
        <label className={css.contactForm__label}>
          <p className={css.contactForm__labelDescription}>Name</p>
          <input
            className={css.contactForm__input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.contactForm__label}>
          <p className={css.contactForm__labelDescription}>Number</p>
          <input
            className={css.contactForm__input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.contactForm__button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  onSubmit: PropTypes.func,
};
