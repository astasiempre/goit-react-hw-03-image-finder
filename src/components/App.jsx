import React, {Component} from "react";
import Searchbar from "./Searchbar/Searchbar";

import css from './App.module.css'
import ImageGallery from "./ImageGallery/ImageGallery";

export default class App extends Component {

  state = {
  catName: '',
}


  // state = {
  //   cat: null,
  //   loading: false,
  // };

  // componentDidMount() {
  //   this.setState({ loading: true})
  //   fetch('https://pixabay.com/api/?q=cat&page=1&key=38912388-dfab1f4f09b0fb6a50a23584e&image_type=photo&orientation=horizontal&per_page=12').then(res => res.json()).then(cat => this.setState({cat})).finally(() => this.setState({loading: false}))
  // };
  
  handleSerchbarFormSubmit = catName => {
    this.setState({ catName });
  }
  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSerchbarFormSubmit} />
        <ImageGallery catName={this.state.catName} />
      </div>
    )


  }
}

