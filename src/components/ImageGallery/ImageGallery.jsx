// import React, { Component } from 'react';
// import { ImageGalleryItem } from './ImageGalleryItem';
// import css from './ImageGallery.module.css';

// export default class ImageGallery extends Component {
//   state = {
//     images: null,
//     loading: false,
//     error: null,
//     page: 1,
//   };

  

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.searchName !== this.props.searchName) {
//       this.setState({ loading: true });
//       setTimeout(() => {
//         fetch(
//           `https://pixabay.com/api/?q=${this.props.searchName}&page=1&key=38912388-dfab1f4f09b0fb6a50a23584e&image_type=photo&orientation=horizontal&per_page=12`
//         )
//           .then(response => {
//             if (response.ok) {
//               return response.json();
//             }
//             return Promise.reject(
//               new Error(`Изображения с названием
//                         ${this.props.searchName} нет`)
//             );
//           })
//           .then(images => this.setState({ images }))
//           .catch(error => this.setState({ error }))
//           .finally(() => this.setState({ loading: false }));
//       }, 1000);
//     }
//   }

//   loadMoreImages = () => {
//     const nextPage = this.state.page + 1;
// console.log(nextPage)
//     // this.setState({ loading: true, error: null });
//     fetch(
//       `https://pixabay.com/api/?q=${this.props.searchName}&page=${nextPage}&key=38912388-dfab1f4f09b0fb6a50a23584e&image_type=photo&orientation=horizontal&per_page=12`
//     )
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         }
//         return Promise.reject(
//           new Error(`Изображения с названием ${this.props.searchName} нет`)
//         );
//       })
//       .then(newImages => {
//         const updatedImages = [...this.state.images, ...newImages.hits];
//         this.setState({
//           images: updatedImages,
//           page: nextPage,
//         });
//       })
//       .catch(error => this.setState({ error }))
//       .finally(() => this.setState({ loading: false }));
//   };
//   render() {
//     return (
//       <div>
//         {this.state.error && <h1>{this.state.error.message}</h1>}
//         {this.state.loading && <div>Загружаем...</div>}
//         {this.state.images && (
//           <>
//             <ul className={css.ImageGallery}>
//               {this.state.images.hits.map(
//                 ({ id, webformatURL, largeImageURL, user }) => (
//                   <ImageGalleryItem key={id} url={webformatURL} user={user} />
//                 )
//               )}
//             </ul>
//             <button onClick={this.loadMoreImages}>Load more</button>
//           </>
//         )}
//       </div>
//     );
//   }
// }
import React, { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import css from './ImageGallery.module.css';
import { fetchSerchImages } from 'services/api';
import { ColorRing } from 'react-loader-spinner';
import CustomModal from 'components/Modal/Modal';


export default class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    page: 1,
    per_page: 12,
    modal: {
      isOpen: false,
      data: null,
    }
    
  };

 componentDidUpdate(prevProps, prevState) {
      if (prevProps.searchName !== this.props.searchName) {
      this.setState({ page: 1, images: [], error: null  });
    }
    if (prevProps.searchName !== this.props.searchName || this.state.page !== prevState.page)
    {
        this.fetchImageByQuery();
  
      }
  };


  fetchImageByQuery = async () => {
    try {
      this.setState({ loading: true });
const { searchName } = this.props;
    const { page, per_page } = this.state;
      const requestImages = await fetchSerchImages(searchName, page, per_page);
console.log(requestImages)
      //

      
      
 this.setState(({ images: prevData }) => ({
   images: [...prevData, ...requestImages.hits],
  
 }));
      if (requestImages.total === 0) {
       throw new Error('No images matching your request')
        
      }

    } catch (error) {
      
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };


 

   loadMoreImages = () => {
    this.setState(( prevState ) => ({ page: prevState.page + 1 }));
  };

  onOpenModal = (modalData) => {
    this.setState({
      modal: {
        isOpen: true,
        data: modalData,
      },
    });
  };

 onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        data: null,
      },
    });
  };


  
      
      
      render() {
      
        return (
      
          <>
            {this.state.error && <h1>{this.state.error}</h1>}
        {/* {this.state.error && <h1>{this.state.error.message}</h1>} */}
        {this.state.loading && (
            <div>
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              />
            </div>
          )}
        {this.state.images && (
          <>
            <ul className={css.ImageGallery}>
              {this.state.images.map(
                ({ id, webformatURL, largeImageURL, user }) => (
                  <ImageGalleryItem onOpenModal={this.onOpenModal} key={id} url={webformatURL} largeUrl={largeImageURL} user={user} />
                )
              )}
                </ul>
                { this.state.images.length > 0  && (
          <button onClick={this.loadMoreImages}>Load more</button>
        
                )}
             {this.state.modal.isOpen && <CustomModal data={this.state.modal.data} onClose={this.onCloseModal} />}
          </>
        )}
      </>
    );
}
}
