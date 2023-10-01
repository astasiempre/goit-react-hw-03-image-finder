import React, { Component } from 'react'
import css from './Modal.module.css'
export default class CustomModal extends Component {

  // onCloseModal = evt => {
  // console.log(evt)
  //   if (evt.currentTarget === evt.target) {
  //     this.props.onClose();
  //   }
  // };

  onOverlayClick = event => {
     console.log(event)
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {


    return (
        <div>
            <div className={css.Overlay} onClick={this.onOverlayClick}>
                <div className={css.Modal} >
                 <img src={this.props.data} alt="img" />   
                </div>
            </div>
      </div>
    )
  }
}
