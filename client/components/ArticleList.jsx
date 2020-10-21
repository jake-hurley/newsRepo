import React from 'react'
import { Link } from 'react-router-dom'


import { getAllNews } from '../api'

import Article from './Article'


class ArticleList extends React.Component {

    state = {
        articles: [],
        isLoaded: false,
        articleIsSelected: false,
        selectedArticle: []
      }

    componentDidMount () {
        this.loadNewData()
    }

    loadNewData = () => {
        getAllNews()
        .then(articleData => {
          this.setState({
            articles: articleData.articles,
            isLoaded: true
          })
      })
      console.log(this.state)
    }

    articleSelector = (article) => {
        this.setState({
            articleIsSelected: true,
            selectedArticle: article
        })
    }

    render () {
        if((this.state.isLoaded) && (!this.state.articleIsSelected)){
        // if(this.state.isLoaded){
            return (
                <div>
                    <h1>Articles</h1>
                    {this.state.articles.map(article => {
                        return (
                            <Link to={`/article/${this.state.articles.indexOf(article)}`}>
                                {/*<div key={article.title} onClick={() => this.articleSelector(article)}> */}
                                <div key={article.title}>
                                    <h1>{article.title}</h1>
                                    <p>{article.description}</p>
                                    <h4>{article.author}</h4>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )
        } else if ((this.state.isLoaded) && (this.state.articleIsSelected)) {
            return (
                <>
                    <Article data={this.state.selectedArticle}/>
                </>
            )
        } else {
            return(
                <h1>loading</h1>
            )
        }
    }

}

export default ArticleList