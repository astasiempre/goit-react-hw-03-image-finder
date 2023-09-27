import { Component } from 'react';

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
      <header className="searchbar">
        <form onSubmit={this.handleSubmit} className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
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
