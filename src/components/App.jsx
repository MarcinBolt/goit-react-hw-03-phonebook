import React, { Component } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import css from './App.module.css';

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  addContactToState = newContact => {
    const { contacts } = this.state;
    this.setState({
      contacts: [...contacts, newContact],
    });
  };

  deleteContactFromState = e => {
    e.preventDefault();

    const { id } = e.target;
    const { contacts } = this.state;

    this.setState({
      contacts: contacts.filter(c => c.id !== id),
    });
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <main>
        <h1 className={css.phonebookHeader}>Phonebook</h1>
        <ContactForm
          contacts={contacts}
          addContactToState={this.addContactToState}
        />

        <h2 className={css.contactsHeader}>Contacts</h2>
        <Filter filter={filter} onChange={this.handleChange} />
        <ContactList
          contacts={contacts}
          filter={filter}
          onClick={this.deleteContactFromState}
        />
      </main>
    );
  }
}
