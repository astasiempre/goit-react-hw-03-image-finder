import React, { Component } from 'react'
import css from './Modal.module.css'
export default class Modal extends Component {
  render() {
    return (
        <div>
            <div className={css.Overlay}>
                <div className={css.Modal}>
                 <img src={this.props.data} alt="img" />   
                </div>
            </div>
      </div>
    )
  }
}
