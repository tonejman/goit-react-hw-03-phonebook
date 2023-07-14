import React, { Component } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.state.contacts.some(
      el =>
        el.name.toLowerCase().trim() === newContact.name.toLowerCase().trim() ||
        el.number.trim() === newContact.number.trim()
    )
      ? alert(`${name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  addFilter = event => {
    this.setState({ filter: event.target.value });
  };

  filterOfContacts = () => {
    const { filter, contacts } = this.state;
    const inputContact = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(inputContact)
    );
  };

  render() {
    const { filter } = this.state;
    return (
      <div className="wrapper">
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} addFilter={this.addFilter} />
        <ContactList
          contacts={this.filterOfContacts()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
