import React, { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
      error: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.catName !== this.props.catName) {
    
        this.setState({ loading: true, images:null });
      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${this.props.catName}&page=1&key=38912388-dfab1f4f09b0fb6a50a23584e&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(
              new Error(`Изображения с названием 
                        ${this.props.catName} нет`)
            );
          })
            .then(images => this.setState({ images }))
           
          .catch(error => this.setState({ error }))
          .finally(() => this.setState({ loading: false }));
      }, 1000);
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <h1>{this.state.error.message}</h1>}
        {this.state.loading && <div>Загружаем...</div>}
        {this.state.images && (
          <div>
            <ul className={css.ImageGallery}>
              {this.state.images.hits.map(
                  ({ id, webformatURL, largeImageURL, user }) => (
                      <ImageGalleryItem
                          key={id}
                          url={webformatURL}
                          user={user}
                      />
                //   <li key={id} className={css.ImageGalleryItem}>
                //     <img
                //       src={webformatURL}
                //       alt={user}
                //       className={css.ImageGalleryItemImage}
                //     />
                //   </li>
                )
              )}
                    </ul>
                    <button type="button">load more</button>
          </div>
        )}
      </div>
    );
  }
}
