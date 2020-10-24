import React from 'react'
import { Link } from 'react-router-dom'

import { getNewsById } from '../api'


class Article extends React.Component {

    state = {
        articleData: {},
        isLoaded: false
    }

    componentDidMount() {
        const articleId = this.props.match.params.id
        console.log(this.props)
        this.getArticleData(articleId)
    }

    getArticleData = (articleId) => {
        // If data is not passed through props (refresh button was clicked) grab it from the API.
        if(this.props.location.state === undefined) {
            console.log('props missing')
            getNewsById(articleId)
            .then(articleData => {
                this.setState({
                    articleData,
                    isLoaded: true
                })
            })
        } else {
            this.setState({
                articleData: this.props.location.state,
                isLoaded: true
            })
        }
    }

    render () {
        const articleData = this.state.articleData
        if(this.state.isLoaded){
            return (
                <>
                    <h1>{articleData.title}</h1>
                    <h3>Source: {articleData.author}</h3>
                    <p>
                        CONVERT ME! {articleData.publishedAt}
                    </p>
                    <img src={articleData.urlToImage}></img>
                    <p>
                        {articleData.content}
                    </p>
                    <a href={articleData.url} target='_blank'>Read More</a>
                </> 
            )
    } else {
        return(
            <h1>loading</h1>
        )
    }
    }
}

export default Article