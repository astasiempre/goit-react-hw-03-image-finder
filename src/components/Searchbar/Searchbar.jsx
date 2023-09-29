import { Component } from 'react';
import css from './Searchbar.module.css'

export default class Searchbar extends Component {
  state = {
    catName: '',
  };

  handleNameChange = event => {
    this.setState({ catName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
      if (this.state.catName.trim() === '') {
          alert('Введите имя кота')
          return;
}
    this.props.onSubmit(this.state.catName);
    this.setState({ catName: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm }>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            name="catName"
            type="text"
            value={this.state.catName}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
