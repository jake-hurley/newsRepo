import React from 'react'
import { Link } from 'react-router-dom'

import { getAllNews } from '../api'

class ArticleList extends React.Component {

    state = {
        articles: [],
        isLoaded: false
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
    }

    render () {
        if(this.state.isLoaded){
            return (
                <div>
                    <h1>Articles</h1>
                    {this.state.articles.map(article => {
                        return (
                            <Link to={{pathname:`/article/${article.id}`, state: article}} key={article.id}>
                                <div>
                                    <h1>{article.title}</h1>
                                    <p>{article.description}</p>
                                    <h4>{article.author}</h4>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )
        } else {
            return(
                <h1>loading</h1>
            )
        }
    }

}

export default ArticleList