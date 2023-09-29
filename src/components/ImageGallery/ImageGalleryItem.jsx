import css from './ImageGalleryItem.module.css'

export  const ImageGalleryItem = ({ url, user }) => {
    return (
        <li className={css.ImageGalleryItem}>
                    <img
                      src={url}
                      alt={user}
                      className={css.ImageGalleryItemImage}
                    />
                  </li>
    );
}