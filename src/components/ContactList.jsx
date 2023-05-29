import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export class ContactList extends Component {
  render() {
    const { contacts, filter } = this.props;

    return (
      <ul className={css.contactList__list}>
        {contacts.map(
          ({ id, name, number }) =>
            name.toLowerCase().includes(filter.toLowerCase()) && (
              <li className={css.contactList__item} key={id}>
                <p className={css.contactList__paragraph}>
                  {name}: {number}
                  <button
                    type="button"
                    name="delete"
                    id={id}
                    onClick={this.props.onClick}
                  >
                    Delete
                  </button>
                </p>
              </li>
            )
        )}
      </ul>
    );
  }
}

ContactList.propTypes = {
  filter: PropTypes.string,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};
