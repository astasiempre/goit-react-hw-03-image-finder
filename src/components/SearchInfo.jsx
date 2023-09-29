import React, { Component } from "react";

export default class SearchInfo extends Component {
    state = {
        images: null,
        loading: false,
        error: null,
}

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.catName !== this.props.catName) {
            console.log('изменилось имя cat');
            console.log('prevProps.catName:', prevProps.catName);
            console.log('this.props.catName:', this.props.catName);
            this.setState({ loading: true, images: null})
            setTimeout(() => {
                fetch(`https://pixabay.com/api/?q=${this.props.catName}&page=1&key=38912388-dfab1f4f09b0fb6a50a23584e&image_type=photo&orientation=horizontal&per_page=12`).then(response => {
                    if (response.ok) { return response.json(); }
                    return Promise.reject(
                        new Error(`Изображения с названием 
                        ${this.props.catName} нет`),
                    );
                }).then(images => this.setState({ images }))
                .catch(error => this.setState({error}))    
                .finally(() => this.setState({ loading: false }));
            }, 1000)
    }
}
    render() {


        return <div>
            {this.state.error && <h1>{this.state.error.message}  нет</h1>}
            {this.state.loading && <div>Загружаем...</div>}
            {!this.props.catName && <div>Введите имя кота</div>}
            {this.state.images && (<div>
                {/* <p>{ this.state.images.hits[0].user}</p> */}
                {/* <img src={this.state.images.hits[0].webformatURL} alt="" width="300" /> */}
                {this.state.images.hits.map(({id, webformatURL,largeImageURL, user }) => <li key={id} class="gallery-item">
                    <img src={webformatURL} alt={user} width={300} />
</li> )}
            </div>)}
        </div>
    }
}