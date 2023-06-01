import React, { Component } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import css from './App.module.css';
import localStore from '../utils/localStore';

const INITIAL_STATE_OF_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

if (!localStore.load('contacts')) {
  localStore.save('contacts', [...INITIAL_STATE_OF_CONTACTS]);
}

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    this.setState({
      contacts: localStore.load('contacts'),
    });
  }

  componentDidUpdate() {
    const { contacts } = this.state;
    localStore.save('contacts', contacts);
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  addContactToLocalStorage = newContact => {
    const { contacts } = this.state;

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));

    localStore.save('contacts', contacts);
  };

  deleteContactFromLocalStorage = e => {
    e.preventDefault();

    const { id } = e.target;
    const { contacts } = this.state;

    this.setState(prevState => ({
      contacts: prevState.contacts.filter(c => c.id !== id),
    }));

    localStore.save('contacts', contacts);
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <main>
        <h1 className={css.phonebookHeader}>Phonebook</h1>
        <ContactForm
          contacts={contacts}
          addContactToState={this.addContactToLocalStorage}
        />

        <h2 className={css.contactsHeader}>Contacts</h2>
        <Filter filter={filter} onChange={this.handleChange} />
        <ContactList
          contacts={contacts}
          filter={filter}
          onClick={this.deleteContactFromLocalStorage}
        />
      </main>
    );
  }
}
