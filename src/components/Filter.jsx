import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

export class Filter extends Component {
  render() {
    const { filter, onChange } = this.props;

    return (
      <label className={css.filter__label}>
            <p className={css.filter__labelDescription}>
            Find contacts by name
            </p>
        <input
          className={css.filter__input}
          type="text"
          name="filter"
          value={filter}
          onChange={onChange}
        />
      </label>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func,
};
