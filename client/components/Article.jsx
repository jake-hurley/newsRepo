import React from 'react'

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
                    <h3>By {articleData.author}</h3>
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